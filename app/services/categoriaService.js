import prisma from "../prisma/client.js";

export const listarTodasLasCategorias = async () => {
  const ahora = new Date();

  const listaCategorias = await prisma.categorias.findMany({
    include: {
      emprendimiento: {
        include: {
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
    orderBy: {
      id: 'asc',
    },
  });

  const conBoostFlag = listaCategorias.map((cat) => ({
    ...cat,
    emprendimiento: cat.emprendimiento
      .map((e) => {
        const fechaFin = e.boosteos[0]?.fechaFin || null;
        const diasRestantes = fechaFin
          ? Math.ceil((new Date(fechaFin) - ahora) / (1000 * 60 * 60 * 24))
          : 0;

        return {
          ...e,
          estaBoosted: e.boosteos.length > 0,
          diasBoosteoRestantes: diasRestantes,
        };
      })
      .sort((a, b) => b.diasBoosteoRestantes - a.diasBoosteoRestantes), // boosteados con más días arriba
  }));

  return conBoostFlag;
};