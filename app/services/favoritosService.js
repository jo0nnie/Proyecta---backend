import prisma from "../prisma/client.js";

export const listarFavoritos = async (usuarioId) => {
  const ahora = new Date();

  const favoritos = await prisma.favoritos.findMany({
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
  });

  const conBoostFlag = favoritos.map((fav) => {
    const boosteos = fav.emprendimiento.boosteos || [];
    const fechaFin = boosteos[0]?.fechaFin || null;
    const diasRestantes = fechaFin
      ? Math.ceil((new Date(fechaFin) - ahora) / (1000 * 60 * 60 * 24))
      : 0;

    return {
      ...fav,
      emprendimiento: {
        ...fav.emprendimiento,
        estaBoosted: boosteos.length > 0,
        diasBoosteoRestantes: diasRestantes,
      },
    };
  });

  return conBoostFlag;
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

    return {
      eliminado: true,
      favorito: {
        id: existente.id,
        emprendimiento: { id: emprendimientoId }, // ✅ estructura mínima
      },
    };
  } else {
    const nuevo = await prisma.favoritos.create({
      data: {
        usuario: { connect: { id: usuarioId } },
        emprendimiento: { connect: { id: emprendimientoId } },
      },
      include: {
        emprendimiento: {
          include: {
            Categorias: true,
            boosteos: {
              where: {
                activo: true,
                fechaFin: { gt: new Date() },
              },
              select: { fechaFin: true },
            },
          },
        },
      },
    });

    const boosteos = nuevo.emprendimiento.boosteos || [];
    const fechaFin = boosteos[0]?.fechaFin || null;
    const diasRestantes = fechaFin
      ? Math.ceil((new Date(fechaFin) - new Date()) / (1000 * 60 * 60 * 24))
      : 0;

    return {
      agregado: true,
      favorito: {
        ...nuevo,
        emprendimiento: {
          ...nuevo.emprendimiento,
          estaBoosted: boosteos.length > 0,
          diasBoosteoRestantes: diasRestantes,
        },
      },
    };
  }
};


