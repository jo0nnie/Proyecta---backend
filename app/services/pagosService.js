import prisma from "../prisma/client.js";


function parseVencimiento(mmYy) {
    const [mm, yy] = mmYy.split("/");
    if (!mm || !yy || mm.length !== 2 || yy.length !== 2) return null;
    return new Date(`20${yy}-${mm}-01`);
}

const estaVencida = (fechaVencimiento) => {
    const hoy = new Date();
    const fechaActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const fechaVenc = new Date(fechaVencimiento.getFullYear(), fechaVencimiento.getMonth(), 1);
    return fechaVenc < fechaActual;
};

const verificarFondos = (numeroTarjeta) => {
    const limpio = numeroTarjeta.replace(/\s|-/g, '');
    if (!/^\d+$/.test(limpio) || limpio.length === 0) {
        throw new Error("Número de tarjeta inválido");
    }
    const ultimo = parseInt(limpio[limpio.length - 1], 10);
    return ultimo % 2 === 0;
};

const validarNumeroTarjeta = (numero) => {
    if (typeof numero !== 'string') throw new Error("El número debe ser un string");
    const limpio = numero.replace(/\s|-/g, '');
    if (!/^\d{16}$/.test(limpio)) throw new Error("El número de tarjeta debe tener 16 dígitos numéricos");
    return limpio;
};

const validarCVC = (cvc) => {
    if (typeof cvc !== 'string') throw new Error("El CVC debe ser una cadena");
    if (!/^\d{3}$/.test(cvc)) throw new Error("El CVC debe tener exactamente 3 dígitos numéricos");
    return cvc;
};

export const crearPago = async (usuarioId, { metodoPagoId, tarjetaTemporal }) => {
  let numero, vencimiento;

  if (tarjetaTemporal) {
    const { numero: num, cvc, vencimiento: ven, nombreDelTitular, tipoTarjeta } = tarjetaTemporal;

    if (!num || !cvc || !ven || !nombreDelTitular || !tipoTarjeta) {
      throw new Error("Faltan datos obligatorios en la tarjeta temporal");
    }

    numero = validarNumeroTarjeta(num);
    validarCVC(cvc);

    vencimiento = ven instanceof Date ? ven : parseVencimiento(ven);
    if (!vencimiento || isNaN(vencimiento.getTime())) {
      throw new Error("Formato de fecha de vencimiento inválido");
    }
  } else {
    const metodo = await prisma.metodoPago.findFirst({
      where: { id: metodoPagoId, usuarioId },
    });
    if (!metodo) {
      throw new Error("Método de pago no válido o no autorizado");
    }
    numero = metodo.numero;
    vencimiento = metodo.vencimiento;
  }

  if (estaVencida(vencimiento)) {
    throw new Error("La tarjeta ha expirado");
  }
  if (!verificarFondos(numero)) {
    throw new Error("La tarjeta no tiene fondos suficientes para realizar el pago");
  }

  const carrito = await prisma.carritos.findFirst({
    where: { usuarioId },
    include: {
      idCarritosItems: {
        include: {
          plan: true,
          emprendimientos: true, // ✅ necesario para boostear
        },
      },
    },
  });

  if (!carrito) {
    throw new Error("El usuario no tiene un carrito");
  }
  if (carrito.idCarritosItems.length === 0) {
    throw new Error("El carrito está vacío");
  }

  const montoTotal = carrito.idCarritosItems.reduce(
    (total, item) => total + (item.plan?.precio || 0),
    0
  );

  if (montoTotal <= 0) {
    throw new Error("El monto total del carrito no es válido");
  }

  const dataPago = {
    monto: montoTotal,
    usuario: { connect: { id: usuarioId } },
    carrito: { connect: { id: carrito.id } },
  };

  if (metodoPagoId) {
    dataPago.metodoPago = { connect: { id: metodoPagoId } };
  }

  const pagoExistente = await prisma.pagos.findFirst({
    where: { carritoId: carrito.id },
    orderBy: { fecha: "desc" },
  });

  if (pagoExistente && Date.now() - new Date(pagoExistente.fecha).getTime() < 3000) {
    throw new Error("Ya se procesó un pago recientemente.");
  }

  const nuevoPago = await prisma.pagos.create({ data: dataPago });
//boost
  for (const item of carrito.idCarritosItems) {
    const fechaInicio = new Date();
    const fechaFin = new Date();
    fechaFin.setDate(fechaInicio.getDate() + item.plan.duracionDias);

    for (const emprendimiento of item.emprendimientos) {
      await prisma.boosteos.create({
        data: {
          emprendimientoId: emprendimiento.id,
          planId: item.plan.id,
          fechaInicio,
          fechaFin,
          activo: true,
        },
      });
    }
  }

  await prisma.carritosItems.deleteMany({
    where: { carritosId: carrito.id },
  });

  return nuevoPago;
};

export const listarTodosLosPagos = async (usuarioId) => {
    return await prisma.pagos.findMany({
        where: { usuarioId },
        include: {
            carrito: {
                include: { idCarritosItems: { include: { planes: true } } },
            },
            metodoPago: true,
        },
        orderBy: { fecha: "desc" },
    });
};

export const listarPagoPorId = async (pagoId, usuarioId) => {
    const pago = await prisma.pagos.findUnique({
        where: { id: pagoId },
        include: {
            carrito: {
                include: { idCarritosItems: { include: { planes: true } } },
            },
            metodoPago: true,
        },
    });

    if (!pago) throw new Error("Pago no encontrado");
    if (pago.usuarioId !== usuarioId) throw new Error("No tienes permiso para ver este pago");

    return pago;
};