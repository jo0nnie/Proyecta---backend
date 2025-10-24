import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET } from "../constants/constants.js";
import prisma from "../prisma/client.js";
import { enviarCorreoVerificacion } from "../utils/resend/enviarCorreoVerificacion.js";
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
      verificado: false,
    },
  });
  const PORT = process.env.PORT || 3000;
  const token = jwt.sign({ id: nuevoUsuario.id }, SECRET, { expiresIn: "1h" });
  const url = `http://localhost:${PORT}/auth/verificar-email?token=${token}`;
  await enviarCorreoVerificacion(email, url);


  return { usuario: nuevoUsuario };
};

export const LoguearUsuario = async ({ email, contrasena }) => {
  const usuario = await prisma.usuarios.findUnique({
    where: { email },
  });
  if (!usuario) {
    throw new Error("Usuario no Encontrado");
  }

  const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!isMatch) throw new Error("Usuario y/o Contraseña incorrectos");

  await prisma.usuarios.update({
    where: { email },
    data: { estado: true },
  });

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET, {
    expiresIn: "1h",
  });
  return {
    usuario: {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.email,
      estado: true,
    },
    token,
  };
};

export const LogoutUsuario = async ({ email }) => {
  const usuario = await prisma.usuarios.findUnique({
    where: { email },
  });
  if (!usuario) {
    throw new Error("Usuario no logueado");
  }
  await prisma.usuarios.update({
    where: { email },
    data: { estado: false },
  });
  return { mensaje: "Usuario desconectado", email };
};


export const verificarEmail = async (token) => {
  if (!token) throw new Error("Token no proporcionado");

  const decoded = jwt.verify(token, SECRET);
  const userId = decoded.id;

  const usuario = await prisma.usuarios.findUnique({ where: { id: userId } });
  if (!usuario) throw new Error("Usuario no encontrado");

  if (usuario.verificado) {
    return { mensaje: "El correo ya estaba verificado" };
  }

  await prisma.usuarios.update({
    where: { id: userId },
    data: { verificado: true },
  });
  //msg de service de usuario verificado
  return { mensaje: `Su correo ${usuario.email} fue verificado` };
};
