import prisma from "../app/prisma/client.js";

async function main() {
  const nuevaCategoria = await prisma.categorias.create({
    data: {
      nombre: 'Gastronomía',
    },
  });

  console.log('Categoría creada:', nuevaCategoria);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
