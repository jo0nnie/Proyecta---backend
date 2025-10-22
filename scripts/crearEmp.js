import prisma from "../app/prisma/client.js";

async function main() {
  const emprendimientos = [
    {
      nombre: "Empresa A",
      descripcion: "Descripción A",
      ubicacion: "Posadas, Misiones",
      contacto: "contactoA@empresa.com",
      imagen: null,
      redes: "https://instagram.com/empresaA",
      visibilidad: 1,
      Usuarios: { connect: { id: 1 } },
      Categorias: { connect: { id: 2 } },
    },
    {
      nombre: "Empresa B",
      descripcion: "Descripción B",
      ubicacion: "Posadas, Misiones",
      contacto: "contactoB@empresa.com",
      imagen: null,
      redes: "https://instagram.com/empresaB",
      visibilidad: 1,
      Usuarios: { connect: { id: 1 } },
      Categorias: { connect: { id: 2 } },
    },
    {
      nombre: "Empresa C",
      descripcion: "Descripción C",
      ubicacion: "Posadas, Misiones",
      contacto: "contactoC@empresa.com",
      imagen: null,
      redes: "https://instagram.com/empresaC",
      visibilidad: 1,
      Usuarios: { connect: { id: 1 } },
      Categorias: { connect: { id: 2 } },
    },
    {
      nombre: "Empresa C",
      descripcion: "Descripción C",
      ubicacion: "Posadas, Misiones",
      contacto: "contactoC@empresa.com",
      imagen: null,
      redes: "https://instagram.com/empresaC",
      visibilidad: 1,
      Usuarios: { connect: { id: 1 } },
      Categorias: { connect: { id: 2 } },
    },
    {
      nombre: "Empresa C",
      descripcion: "Descripción C",
      ubicacion: "Posadas, Misiones",
      contacto: "contactoC@empresa.com",
      imagen: null,
      redes: "https://instagram.com/empresaC",
      visibilidad: 1,
      Usuarios: { connect: { id: 1 } },
      Categorias: { connect: { id: 2 } },
    },
    {
      nombre: "Empresa C",
      descripcion: "Descripción C",
      ubicacion: "Posadas, Misiones",
      contacto: "contactoC@empresa.com",
      imagen: null,
      redes: "https://instagram.com/empresaC",
      visibilidad: 1,
      Usuarios: { connect: { id: 1 } },
      Categorias: { connect: { id: 2 } },
    },
    {
      nombre: "Empresa C",
      descripcion: "Descripción C",
      ubicacion: "Posadas, Misiones",
      contacto: "contactoC@empresa.com",
      imagen: null,
      redes: "https://instagram.com/empresaC",
      visibilidad: 1,
      Usuarios: { connect: { id: 1 } },
      Categorias: { connect: { id: 2 } },
    },
    {
      nombre: "Empresa C",
      descripcion: "Descripción C",
      ubicacion: "Posadas, Misiones",
      contacto: "contactoC@empresa.com",
      imagen: null,
      redes: "https://instagram.com/empresaC",
      visibilidad: 1,
      Usuarios: { connect: { id: 1 } },
      Categorias: { connect: { id: 2 } },
    },
    {
      nombre: "Empresa C",
      descripcion: "Descripción C",
      ubicacion: "Posadas, Misiones",
      contacto: "contactoC@empresa.com",
      imagen: null,
      redes: "https://instagram.com/empresaC",
      visibilidad: 1,
      Usuarios: { connect: { id: 1 } },
      Categorias: { connect: { id: 2 } },
    },
  ];

  const creaciones = emprendimientos.map((data) =>
    prisma.emprendimientos.create({ data })
  );

  const resultados = await Promise.all(creaciones);

  console.log("emprendimiento creada:", resultados);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
