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
      categoriaId,
      usuariosId: usuarioId,
      visibilidad: 1 //aca seria la visibilidad standar para que se pueda ver el emprendimiento
    },
  });

  return nuevoEmprendimiento;
}