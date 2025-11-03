import prisma from "../prisma/client.js";

export const listarRecienVistos = async (usuarioId) => {
  return await prisma.historiales.findMany({
    where: { usuarioId },
    include: {
      emprendimiento: {
        include: { Categorias: true },
      },
    },
    orderBy: { fecha: "desc" }, 
  });
};

export const recienVisto = async (usuarioId, emprendimientoId) => {
  try {
    await prisma.historiales.upsert({
      where: {
        usuarioId_emprendimientoId: {
          usuarioId,
          emprendimientoId,
        },
      },
      update: {
        fecha: new Date(),
      },
      create: {
        usuario: { connect: { id: usuarioId } },
        emprendimiento: { connect: { id: emprendimientoId } },
      },
    });
  } catch (err) {
    console.error("Error en recienVisto:", err);
    throw err;
  }
};

export const limpiarHistorial = async (usuarioId) => {
  return await prisma.historiales.deleteMany({
    where: { usuarioId },
  });
};
