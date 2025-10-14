import bcrypt from "bcryptjs";
import prisma from "../prisma.js";

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
      fechaNacimiento: new Date("1997-05-28"),
      estado: true,
    },
  });

  return { usuario: nuevoUsuario };
};
