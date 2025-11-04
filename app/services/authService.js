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
  rolesId
}) => {
  const emailExistente = await prisma.usuarios.findUnique({
    where: { email },
  });

  if (emailExistente) {
    throw new Error("El correo ya está asociado a otra cuenta");
  }

  const hashedContrasena = await bcrypt.hash(contrasena, 10);

  // buscar rol de usuario si no se especifica rolesId
  const rolUsuario = rolesId
    ? { id: rolesId }
    : await prisma.roles.findFirst({ where: { nombre: "Usuario" } });

  if (!rolUsuario) {
    throw new Error("No se encontró el rol 'Usuario'");
  }

  const nuevoUsuario = await prisma.usuarios.create({
    data: {
      nombre,
      apellido,
      contrasena: hashedContrasena,
      email,
      fechaNacimiento: new Date(fechaNacimiento || null),
      estado: true,
      verificado: false,
      rolesId: rolUsuario.id
    },
  });
  //
  const token = jwt.sign({ id: nuevoUsuario.id, rol: rolUsuario.nombre }, SECRET, { expiresIn: "1d" });
  const url = `${process.env.FRONTEND_URL}/auth/verificar-email?token=${token}`;
  console.log("URL generada para verificación:", url);


  await enviarCorreoVerificacion(email, url);

  return { usuario: nuevoUsuario, token };
};

export const LoguearUsuario = async ({ email, contrasena }) => {
  const usuario = await prisma.usuarios.findUnique({
    where: { email },
    include: {
      rol: true,
      carrito: true,
    },
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

  const token = jwt.sign({ id: usuario.id, email: usuario.email, rol: usuario.rol.nombre }, SECRET, {
    expiresIn: "1h",
  });
  return {
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.email,
      estado: true,
      rol: usuario.rol.nombre,
      carrito: usuario.carrito ? { id: usuario.carrito.id } : null
    },
    token,
  };
};
export const LogoutUsuario = async ({ id }) => {
  const usuario = await prisma.usuarios.findUnique({
    where: { id },
  });

  if (!usuario) {
    throw new Error("Usuario no logueado");
  }

  await prisma.usuarios.update({
    where: { id },
    data: { estado: false },
  });

  return { mensaje: "Usuario desconectado", email: usuario.email };
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


export async function obtenerUsuariosConectados() {
  try {
    const usuarios = await prisma.usuarios.findMany({
      where: { estado: true },
      select: {
        id: true,
        nombre: true,
        email: true,
        estado: true,
        _count: {
          select: { emprendimiento: true },
        },
      },
    });

    return usuarios.map((u) => ({
      id: u.id,
      nombre: u.nombre,
      email: u.email,
      conectado: u.estado,
      cantidadEmprendimientos: u._count.emprendimiento,
    }));
  } catch (error) {
    console.error("Error en usuarioService:", error);
    throw new Error("No se pudo obtener la lista de usuarios conectados.");
  }
}

