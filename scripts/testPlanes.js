import prisma from "../app/prisma/client";
const testPlanes = async () => {
  try {
    const planes = await prisma.planes.findMany();
    console.log("Planes encontrados:", planes);
  } catch (error) {
    console.error("Error al obtener planes:", error);
  } finally {
    await prisma.$disconnect();
  }
};

testPlanes();