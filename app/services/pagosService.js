import prisma from "../prisma/client.js";

export const crearPago = async (usuarioId) => {

    const carritoDelUsuario = await prisma.carritos.findUnique({
        where: {
            usuariosId: usuarioId
        },
        include: {
            idCarritosItems: {
                include: {
                    planes: true,
                },
            },
        },
    });

    if (!carritoDelUsuario) {
        throw new Error("El usuario no tiene un carrito");
    }

    if (carritoDelUsuario.idCarritosItems.length === 0) {
        throw new Error("El carrito está vacío");
    }

    const montoTotal = carritoDelUsuario.idCarritosItems.reduce((total, item) => {
        return total + (item.planes?.precio || 0);
    }, 0);

    if (montoTotal <= 0) {
        throw new Error("El monto total del carrito no es válido");
    }

    const nuevoPago = await prisma.pagos.create({
        data: {
            monto: montoTotal,
            usuario: { connect: { id: usuarioId } },
            carrito: { connect: { id: carritoDelUsuario.id } },
        },
    });

    //para vaciar carrito
    await prisma.carritosItems.deleteMany({
        where: {
            carritosId: carritoDelUsuario.id
        },
    });

    return nuevoPago;
};

export const listarTodosLosPagos = async (usuarioId) => {

    const pagos = await prisma.pagos.findMany({

        where: {
            usuarioId
        },
        include: {
            carrito: {
                include: {
                    idCarritosItems: {
                        include: { planes: true },
                    },
                },
            },
        },
        orderBy: { fecha: "desc" },
    });

    return pagos;
};

export const listarPagoPorId = async (pagoId, usuarioId) => {

    const pago = await prisma.pagos.findUnique({

        where: {
            id: pagoId
        },
        include: {
            carrito: {
                include: {
                    idCarritosItems: {
                        include: { planes: true },
                    },
                },
            },
        },
    });

    if (!pago) {
        throw new Error("Pago no encontrado");
    }

    if (pago.usuarioId !== usuarioId) {
        throw new Error("No tienes permiso para ver este pago");
    }

    return pago;
};
