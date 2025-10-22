import prisma from "../app/prisma/client.js";

async function main() {
  const categorias = [
    { nombre: 'Tecnología' },   // id 1
    { nombre: 'Arte' },         // id 2
    { nombre: 'Moda' },         // id 3
    { nombre: 'Gastronomía' },  // id 4
  ];

  try {
    await prisma.categorias.createMany({
      data: categorias,
      skipDuplicates: true, // evitar insertar si ya existe
    });

    console.log('Categoríascreadas:', categorias);
  } catch (error) {
    console.error('Error con el insertcategorías:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();