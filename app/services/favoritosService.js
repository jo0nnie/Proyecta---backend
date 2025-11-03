import prisma from "../prisma/client.js";

export const listarFavoritos = async (usuarioId) => {
  const favoritos = await prisma.favoritos.findMany({
    where: { usuarioId },
    include: { emprendimiento: { include: { Categorias: true } } },
  });
  return favoritos;
};

export const agregarAFavoritos = async (usuarioId, emprendimientoId) => {
  return await prisma.favoritos.create({
    data: {
      usuario: { connect: { id: usuarioId } },
      emprendimiento: { connect: { id: emprendimientoId } },
    },
  });
};

export const quitarFavorito = async (favoritoId) => {
  return await prisma.favoritos.delete({
    where: { id: favoritoId },
  });
};
export const toggleFavorito = async (usuarioId, emprendimientoId) => {
  const existente = await prisma.favoritos.findFirst({
    where: { usuarioId, emprendimientoId },
  });

  if (existente) {
    await prisma.favoritos.delete({
      where: { id: existente.id },
    });
    return { eliminado: true };
  } else {
    const nuevo = await prisma.favoritos.create({
      data: {
        usuario: { connect: { id: usuarioId } },
        emprendimiento: { connect: { id: emprendimientoId } },
      },
      include: {
        emprendimiento: {
          include: { Categorias: true },
        },
      },
    });
    return { agregado: true, favorito: nuevo };
  }
};


