import prisma from "../prisma/client.js";

/**
 * Crea un nuevo emprendimiento vinculado al usuario autenticado.
 * @param {Object} data - Datos del emprendimiento.
 * @param {string} data.nombre
 * @param {string} data.descripcion
 * @param {number} data.categoriaId
 * @param {number} usuarioId - ID del usuario autenticado (extraído del token).
 */

export async function CrearEmprendimiento({ nombre, descripcion, imagen, categoriaId, redes }, usuarioId) {
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
      imagen,
      Usuarios: {
        connect: { id: usuarioId },
      },
      Categorias: {
        connect: { id: categoriaId },
      redes
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


//put
export async function ActualizarEmprendimiento(id, datos, usuarioId) {
  const emprendimiento = await prisma.emprendimientos.findUnique({
    where: { id },
  });

  if (!emprendimiento) {
    throw new Error('El emprendimiento no existe');
  }

  if (emprendimiento.usuariosId !== usuarioId) {
    throw new Error('No tienes permiso para editar este emprendimiento');
  }

  if (datos.categoriaId) {
    const categoriaExiste = await prisma.categorias.findUnique({
      where: { id: datos.categoriaId },
    });
    if (!categoriaExiste) {
      throw new Error('La categoría especificada no existe');
    }
  }

  const dataActualizada = {};

  if (datos.nombre) dataActualizada.nombre = datos.nombre;
  if (datos.descripcion) dataActualizada.descripcion = datos.descripcion;
  if (datos.visibilidad !== undefined) dataActualizada.visibilidad = datos.visibilidad;
  if (datos.ubicacion) dataActualizada.ubicacion = datos.ubicacion;
  if (datos.contacto) dataActualizada.contacto = datos.contacto;
  if (datos.imagen) dataActualizada.imagen = datos.imagen;
  if (datos.redes) dataActualizada.redes = datos.redes;

  if (datos.categoriaId) {
    dataActualizada.Categorias = {
      connect: { id: datos.categoriaId },
    };
  }

  const actualizado = await prisma.emprendimientos.update({
    where: { id },
    data: dataActualizada,
  });

  return actualizado;
}
