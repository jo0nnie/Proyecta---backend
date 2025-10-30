import prisma from "../prisma/client.js";
import bcrypt from "bcryptjs";

export const crearMetodoDePago = async (usuarioId) => {
  const encontrarUsuario = await prisma.metodoPago.findUnique({
    where: { id: usuarioId },
  });

  if (!encontrarUsuario) {
    throw new Error("No se encontro el usuario");
  }

  const tarjetaExistente = await prisma.metodoPago.findUnique({
    where: { numero },
  });

  if (!tarjetaExistente) {
    throw new Error("Ya se guardo esta tarjeta");
  }

  const hashedTarjeta = await bcrypt.hash(numero, 10);

  const nuevoMetodoDePago = await prisma.metodoPago.create({
    data: {
      nombreDelTitular,
      numero: hashedTarjeta,
      tipoTarjeta,
      vencimiento: new Date(vencimiento || null),
      guardado: true,
      Usuarios: {
        connect: { id: usuarioId },
      },
    },
  });

  return nuevoMetodoDePago;
};

export const listarMetodoDePagoPorId = async (id) => {
  const encontrarMetodoDePago = await prisma.metodoPago.findUnique({
    where: { id },
    include: {
      usuarios: true,
    },
  });
  return encontrarMetodoDePago;
};

export const listarTodosLosMetodosDePago = async () => {
  const mostrarMetodosDePago = await prisma.metodoPago.findMany({
    where: {
      id,
    },
    include: {
      usuarios: true,
    },
  });

  return mostrarMetodosDePago;
};
