import prisma from '../prisma/client.js';

export const crear = async (usuarioId) => {
  const usuario = await prisma.usuarios.findUnique({
    where: { id: usuarioId }
  });
  if (!usuario) throw new Error("Usuario no existe");

  const carritoExistente = await prisma.carritos.findUnique({
    where: { usuarioId }
  });
  if (carritoExistente) throw new Error("El usuario ya tiene un carrito");

  const nuevoCarrito = await prisma.carritos.create({
    data: {
      usuario: { connect: { id: usuarioId } }
    },
    include: { usuario: true }
  });
  return nuevoCarrito;
};


export const agregarItemAlCarrito = async (usuarioId, emprendimientoId, planId) => {
  return await prisma.$transaction(async (tx) => {
    const usuario = await tx.usuarios.findUnique({ where: { id: usuarioId } });
    if (!usuario) throw new Error("Usuario no existe");

    let carrito = await tx.carritos.findUnique({ where: { usuarioId } });
    if (!carrito) {
      carrito = await tx.carritos.create({
        data: { usuario: { connect: { id: usuarioId } } },
      });
    }

    const item = await tx.carritosItems.create({
      data: {
        carritosId: carrito.id,
        emprendimientoId,
        planesId: planId,
      },
      include: {
        plan: true,
        emprendimiento: true,
      },
    });

    return { carrito, item };
  });
};