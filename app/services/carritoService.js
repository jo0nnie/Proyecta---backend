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
