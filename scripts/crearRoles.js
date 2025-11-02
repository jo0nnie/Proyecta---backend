import prisma from "../app/prisma/client.js";

async function main() {
  const roles = [
    {nombre: 'Usuario'},
    {nombre: 'Admin'},

  ];

  try {
    await prisma.roles.createMany({
      data: roles,
      skipDuplicates: true, // evitar insertar si ya existe
    });

    console.log('Roles creados:', roles);
  } catch (error) {
    console.error('Error con el intert roles:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();