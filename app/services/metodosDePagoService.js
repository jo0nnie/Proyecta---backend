import prisma from "../prisma/client.js";

const validarNumeroTarjeta = (numero) => {
  if (typeof numero !== 'string') {
    throw new Error("Este campo debe ser un string");
  }
  const numeroLimpio = numero.replace(/\s|-/g, '');
  if (!/^\d{16}$/.test(numeroLimpio)) {
    throw new Error("El número de tarjeta debe contener exactamente 16 dígitos numéricos");
  }
  return numeroLimpio;
};

const validarCVC = (cvc) => {
  if (typeof cvc !== 'string') {
    throw new Error("Este campo debe ser un string");
  }
  if (!/^\d{4}$/.test(cvc)) {
    throw new Error("El CVC debe contener exactamente 4 dígitos numéricos");
  }
  return cvc;
};

export const crearMetodoDePago = async (usuarioId, datosTarjeta) => {
  const { nombreDelTitular, numero, tipoTarjeta, vencimiento, cvc } = datosTarjeta;

  const numeroValidado = validarNumeroTarjeta(numero);
  const cvcValidado = validarCVC(cvc);

  const usuario = await prisma.usuarios.findUnique({
    where: { id: usuarioId },
  });

  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  const tarjetaExistente = await prisma.metodoPago.findFirst({
    where: {
      numero: numeroValidado,
      usuarioId,
    },
  });

  if (tarjetaExistente) {
    throw new Error("Ya has guardado este método de pago");
  }

  const nuevoMetodoDePago = await prisma.metodoPago.create({
    data: {
      nombreDelTitular,
      numero: numeroValidado,
      tipoTarjeta,
      vencimiento: new Date(vencimiento),
      cvc: cvcValidado,
      guardado: true,
      usuario: {
        connect: { id: usuarioId },
      },
    },
  });

  const { cvc: _, ...metodoSinCVC } = nuevoMetodoDePago;
  return metodoSinCVC;
};

export const editarMetodoDePago = async (usuarioId, datosTarjeta, metodoPagoId) => {
  const { nombreDelTitular, numero, tipoTarjeta, vencimiento, cvc } = datosTarjeta;

  const metodoExistente = await prisma.metodoPago.findFirst({
    where: {
      id: metodoPagoId,
      usuarioId,
    },
  });

  if (!metodoExistente) {
    throw new Error("Método de pago no encontrado o no autorizado");
  }

  let numeroValidado = metodoExistente.numero;
  if (numero !== undefined) {
    numeroValidado = validarNumeroTarjeta(numero);
  }

  let cvcValidado = metodoExistente.cvc;
  if (cvc !== undefined) {
    cvcValidado = validarCVC(cvc);
  }

  if (numero !== undefined && numeroValidado !== metodoExistente.numero) {
    const tarjetaDuplicada = await prisma.metodoPago.findFirst({
      where: {
        numero: numeroValidado,
        usuarioId,
        NOT: { id: metodoPagoId },
      },
    });

    if (tarjetaDuplicada) {
      throw new Error("Ya existe otro método de pago con ese número para este usuario");
    }
  }

  const metodoActualizado = await prisma.metodoPago.update({
    where: { id: metodoPagoId },
    data: {
      nombreDelTitular: nombreDelTitular ?? metodoExistente.nombreDelTitular,
      numero: numeroValidado,
      tipoTarjeta: tipoTarjeta ?? metodoExistente.tipoTarjeta,
      vencimiento: vencimiento ? new Date(vencimiento) : metodoExistente.vencimiento,
      cvc: cvcValidado,
    },
  });

  const { cvc: _, ...metodoSinCVC } = metodoActualizado;
  return metodoSinCVC;
};

export const listarMetodoDePagoPorId = async (id) => {
  const metodo = await prisma.metodoPago.findUnique({
    where: { id },
    select: {
      id: true,
      nombreDelTitular: true,
      numero: true,
      tipoTarjeta: true,
      vencimiento: true,
      guardado: true,
      usuario: true,
    },
  });

  if (!metodo) {
    throw new Error("Método de pago no encontrado");
  }

  return metodo;
};

export const listarTodosLosMetodosDePago = async (usuarioId) => {
  const metodos = await prisma.metodoPago.findMany({
    where: {
      usuarioId,
      guardado: true,
    },
    select: {
      id: true,
      nombreDelTitular: true,
      numero: true,
      tipoTarjeta: true,
      vencimiento: true,
      guardado: true,
      usuario: true,
    },
  });

  return metodos;
};

export const eliminarMetodoDePago = async (metodoPagoId, usuarioId) => {
  const existeElMetodo = await prisma.metodoPago.findFirst({
    where: {
      id: metodoPagoId,
      usuarioId,
    },
  });

  if (!existeElMetodo) {
    throw new Error("No existe el método de pago o no tienes permisos para eliminarlo");
  }

  const eliminado = await prisma.metodoPago.delete({
    where: { id: metodoPagoId },
  });

  return eliminado;
};