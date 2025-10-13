import prisma from "../prisma/client.js";

/**
 * Crea un nuevo emprendimiento vinculado al usuario autenticado.
 * @param {Object} data - Datos del emprendimiento.
 * @param {string} data.nombre
 * @param {string} data.descripcion
 * @param {number} data.categoriaId
 * @param {number} usuarioId - ID del usuario autenticado (extraído del token).
 */
export async function CrearEmprendimiento({ nombre, descripcion, categoriaId }, usuarioId) {
  //validar campos
  if (!nombre || !descripcion || !categoriaId) {
    throw new Error("Faltan datos obligatorios");
  }
  //si existe categoria
  const categoriaExiste = await prisma.categorias.findUnique({
    where: { id: categoriaId },
  });
  if (!categoriaExiste) {
    throw new Error("La categoría especificada no existe");
  }
  //si existe user
  const usuarioExiste = await prisma.usuarios.findUnique({
    where: { id: usuarioId },
  });
  if (!usuarioExiste) {
    throw new Error("El usuario autenticado no existe");
  }

  const nuevoEmprendimiento = await prisma.emprendimientos.create({
    data: {
      nombre,
      descripcion,
      visibilidad: 1, // visibilidad que adquieren todos los emprendimientops recien creados
      Usuarios: {
        connect: { id: usuarioId },
      },
      Categorias: {
        connect: { id: categoriaId },
      },
    },
  });



  return nuevoEmprendimiento;
}


// delete http://localhost:3000/emprendimientos/:id

export async function EliminarEmprendimiento(id) {
  const existe = await prisma.emprendimientos.findUnique({ where: { id } });
  if (!existe) {
    throw new Error('El emprendimiento no existe');
  }

  const eliminado = await prisma.emprendimientos.delete({ where: { id } });
  return eliminado;
}
// get todos

export async function ObtenerEmprendimientos() {
  const emprendimientos = await prisma.emprendimientos.findMany({
    include: {
      Categorias: true,
      Usuarios: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  return emprendimientos;
}
// get:id

export async function ObtenerEmprendimientoPorId(id) {
  const emprendimiento = await prisma.emprendimientos.findUnique({
    where: { id },
    include: {
      Categorias: true,
      Usuarios: true,
    },
  });

  return emprendimiento;
}