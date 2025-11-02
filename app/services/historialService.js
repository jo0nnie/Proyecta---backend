import prisma from "../prisma/client.js";

export const listarRecienVistos = async (usuarioId) => {
  const recientes = await prisma.historiales.findMany({
    where: { usuarioId },
    include: { emprendimientos: { include: { Categorias: true } } },
    orderBy: {
      id: "desc",
    },
  });

  return recientes;
};

export const recienVisto = async (usuarioId, emprendimientoId) => {
  return await prisma.historiales.create({
    data: {
      usuario: { connect: { id: usuarioId } },
      emprendimientos: { connect: { id: emprendimientoId } },
    },
  });
};

export const limpiarHistorial = async (usuarioId) => {
  return await prisma.historiales.deleteMany({
    where: { usuarioId },
  });
};
