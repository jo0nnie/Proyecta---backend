import prisma from "../prisma/client.js";

export const listarTodasLasCategorias = async () => {
  const listaCategorias = await prisma.categorias.findMany({
    include: {
      emprendimiento: true,
    },
    orderBy: {
      id: "desc",
    },
  });
  return listaCategorias;
};
