import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET } from "../constants/constants.js";
import prisma from "../prisma/client.js";

export const RegistrarUsuario = async ({
  nombre,
  apellido,
  contrasena,
  email,
  fechaNacimiento,
}) => {
  const emailExistente = await prisma.usuarios.findUnique({
    where: { email },
  });

  if (emailExistente) {
    throw new Error("El correo ya esta asociado a otra cuenta");
  }

  const hashedContrasena = await bcrypt.hash(contrasena, 10);

  const nuevoUsuario = await prisma.usuarios.create({
    data: {
      nombre,
      apellido,
      contrasena: hashedContrasena,
      email,
      fechaNacimiento: new Date(fechaNacimiento || null),
      estado: true,
    },
  });

  return { usuario: nuevoUsuario };
};

export const LoguearUsuario = async ({ email, contrasena }) => {
  const usuario = await prisma.usuarios.findUnique({
    where: { email },
  });
  if (!usuario) {
    throw new Error("Usuario no Encontrado");
  }

  const isMatch = bcrypt.compare(contrasena, usuario.contrasena);
  if (!isMatch) throw new Error("Usuario y/o Contraseña incorrectos");

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET, {
    expiresIn: "1h",
  });

  return {
    usuario: {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.email,
    },
    token,
  };
};
