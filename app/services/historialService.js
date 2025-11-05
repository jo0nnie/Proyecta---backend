import prisma from "../prisma/client.js";

export const listarRecienVistos = async (usuarioId) => {
  const ahora = new Date();

  const vistos = await prisma.historiales.findMany({
    where: { usuarioId },
    include: {
      emprendimiento: {
        include: {
          Categorias: true,
          boosteos: {
            where: {
              activo: true,
              fechaFin: { gt: ahora },
            },
            select: { fechaFin: true },
          },
        },
      },
    },
    orderBy: { fecha: "desc" },
  });

  const conBoostFlag = vistos.map((v) => {
    const boosteos = v.emprendimiento.boosteos || [];
    const fechaFin = boosteos[0]?.fechaFin || null;
    const diasRestantes = fechaFin
      ? Math.ceil((new Date(fechaFin) - ahora) / (1000 * 60 * 60 * 24))
      : 0;

    return {
      ...v,
      emprendimiento: {
        ...v.emprendimiento,
        estaBoosted: boosteos.length > 0,
        diasBoosteoRestantes: diasRestantes,
      },
    };
  });

  return conBoostFlag;
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
