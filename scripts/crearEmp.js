import prisma from "../app/prisma/client.js";

'Tecnología'   // id 1
'Arte'         // id 2
'Moda'         // id 3
'Gastronomía'  // id 4

async function main() {
  const emprendimientos = [
    {
      nombre: "Benicio",
      descripcion: "Conocida por sus chipitas",
      ubicacion: "Posadas, Misiones",
      contacto: "contactoA@empresa.com",
      imagen: "https://i.imgur.com/3jQWWEN.jpeg",
      redes: "https://instagram.com/empresaA",
      visibilidad: 1,
      Usuarios: { connect: { id: 1 } },
      Categorias: { connect: { id: 4 } },
    },
    {
      nombre: "Showroom Guapas",
      descripcion: "Guapas✨ Indumentaria para toda la familia !",
      ubicacion: "Posadas, Misiones",
      contacto: "contactoB@empresa.com",
      imagen: "https://i.imgur.com/dar5Ixq.jpeg",
      redes: "https://instagram.com/empresaB",
      visibilidad: 1,
      Usuarios: { connect: { id: 1 } },
      Categorias: { connect: { id: 3 } },
    },
    {
      nombre: "Malu Memorias del sabor",
      descripcion: "MaLú | Comida casera",
      ubicacion: "Posadas, Misiones",
      contacto: "contactoC@empresa.com",
      imagen: "https://i.imgur.com/rnzmL28.jpeg",
      redes: "https://instagram.com/empresaC",
      visibilidad: 1,
      Usuarios: { connect: { id: 1 } },
      Categorias: { connect: { id: 4 } },
    },
    {
      nombre: "Telefonía Pou Co.",
      descripcion: "Celulares, Smart TVs, Jbl Notebooks y +",
      ubicacion: "Posadas, Misiones",
      contacto: "contactoC@empresa.com",
      imagen: "https://i.imgur.com/OTgkxtE.jpeg",
      redes: "https://instagram.com/empresaC",
      visibilidad: 1,
      Usuarios: { connect: { id: 1 } },
      Categorias: { connect: { id: 1 } },
    },
    {
      nombre: "Boo Bakery",
      descripcion: "Cositas dulces en version saludable",
      ubicacion: "Posadas, Misiones",
      contacto: "contactoC@empresa.com",
      imagen: "https://i.imgur.com/MCKoYKL.jpeg",
      redes: "https://instagram.com/empresaC",
      visibilidad: 1,
      Usuarios: { connect: { id: 1 } },
      Categorias: { connect: { id: 4 } },
    },
    {
      nombre: "Italo Indumentaria",
      descripcion: "Ropa sin genero. Calidad y diseño a tu alcance",
      ubicacion: "Posadas, Misiones",
      contacto: "contactoC@empresa.com",
      imagen: "https://i.imgur.com/pdrnqx8.jpeg",
      redes: "https://instagram.com/empresaC",
      visibilidad: 1,
      Usuarios: { connect: { id: 1 } },
      Categorias: { connect: { id: 3 } },
    },
    {
      nombre: "Aguamia",
      descripcion: "Las mejores decoraciones artesanales para tu hogar",
      ubicacion: "Posadas, Misiones",
      contacto: "contactoC@empresa.com",
      imagen: "https://m.media-amazon.com/images/I/81KJQX3ZooL._UF894,1000_QL80_.jpg",
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
