import prisma from '../prisma/client.js';


export const crearItem = async (carritosId, planesId, emprendimientosIds) => {
    const carrito = await prisma.carritos.findUnique({ where: { id: carritosId } });
    if (!carrito) throw new Error("Carrito no encontrado");

    const plan = await prisma.planes.findUnique({ where: { id: planesId } });
    if (!plan) throw new Error("Plan no encontrado");

    const emprendimientosExistentes = await prisma.emprendimientos.findMany({
        where: { id: { in: emprendimientosIds } }
    });

    if (emprendimientosExistentes.length !== emprendimientosIds.length) {
        throw new Error("Uno o más emprendimientos no existen");
    }

    const itemsCreados = [];

    for (const id of emprendimientosIds) {
        const yaExiste = await prisma.carritosItems.findFirst({
            where: {
                carritosId,
                planesId,
                emprendimientos: {
                    some: { id }
                }
            }
        });

        if (!yaExiste) {
            const nuevoItem = await prisma.carritosItems.create({
                data: {
                    carrito: { connect: { id: carritosId } },
                    plan: { connect: { id: planesId } },
                    emprendimientos: { connect: [{ id }] }
                },
                include: {
                    plan: true,
                    emprendimientos: true
                }
            });

            itemsCreados.push(nuevoItem);
        }
    }

    if (itemsCreados.length === 0) {
        throw new Error("Todos los ítems ya estaban en el carrito");
    }

    return itemsCreados;
};

export const obtenerItemsPorCarrito = async (carritosId) => {
    const items = await prisma.carritosItems.findMany({
        where: { carritosId },
        include: {
            planes: true,
            emprendimientos: true
        }
    });
    return items;
};


export const obtenerItemPorId = async (id) => {
    const item = await prisma.carritosItems.findUnique({
        where: { id },
        include: {
            planes: true,
            emprendimientos: true
        }
    });
    if (!item) throw new Error('Item no encontrado');
    return item;
};


export const actualizarItem = async (id, planesId, emprendimientosIds) => {
    const itemExistente = await prisma.carritosItems.findUnique({
        where: { id }
    });
    if (!itemExistente) throw new Error('Item no encontrado');

    const updateData = {};

    if (planesId !== undefined) {
        const plan = await prisma.planes.findUnique({ where: { id: planesId } });
        if (!plan) throw new Error('Plan no válido');
        updateData.planesId = planesId;
    }

    if (emprendimientosIds !== undefined) {
        if (emprendimientosIds.length > 0) {
            const emprendimientos = await prisma.emprendimientos.findMany({
                where: { id: { in: emprendimientosIds } }
            });
            if (emprendimientos.length !== emprendimientosIds.length) {
                throw new Error('Algunos emprendimientos no existen');
            }
            updateData.emprendimientos = {
                set: emprendimientosIds.map(id => ({ id }))
            };
        } else {
            updateData.emprendimientos = {
                set: []
            };
        }
    }

    const itemActualizado = await prisma.carritosItems.update({
        where: { id },
        data: updateData,
        include: {
            planes: true,
            emprendimientos: true
        }
    });

    return itemActualizado;
};

// Eliminar un item
export const eliminarItem = async (id) => {
    const item = await prisma.carritosItems.findUnique({ where: { id } });
    if (!item) throw new Error('Item no encontrado');

    await prisma.carritosItems.delete({
        where: { id }
    });
};


// get items
export const obtenerItemsDelCarrito = async (carritosId) => {
  const items = await prisma.carritosItems.findMany({
    where: { carritosId },
    include: {
      plan: true,
      emprendimientos: true
    }
  });

  return items;
};