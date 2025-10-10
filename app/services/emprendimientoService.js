import { SECRET } from "../constants/constants.js";
import prisma from "../prisma/client.js";
async function CrearEmprendimiento({
  nombre,
  descripcion,
  categoriaId,
  usuarioId,
}) {
  if (!nombre || !descripcion || !categoriaId || !usuarioId) {
    throw new Error("Faltan datos obligatorios");
  }
  const nuevoEmprendimiento = await prisma.emprendimientos.create({
    data: {
      nombre,
      descripcion,
      categoriaId,
      usuarioId,
    },
  });
  return nuevoEmprendimiento;
}
