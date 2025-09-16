import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET } from "../constants/constants.js";

const users = [];

export const registrar = async ({ name, username, password }) => {
  const usuarioExistente = users.find((user) => user.username === username);
  if (usuarioExistente) throw new Error("El usuario ya existe");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { id: username, username, name, password: hashedPassword };
  users.push(newUser);

  const newUserResponse = { username: newUser.username, name: newUser.name };

  return newUserResponse;
};

export const login = async ({ username, password }) => {
  const user = users.find((u) => u.username === username);
  if (!user) throw new Error("Usuario no encontrado");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Usuario y/o Contraseña incorrectos");

  const token = jwt.sign({ username: user.username }, SECRET, {
    expiresIn: "1h",
  });

  return { user: { username: user.username }, token };
};

export const listar = () => {
  return users.map((usuario) => ({
    id: usuario.id,
    name: usuario.name,
    username: usuario.username,
  }));
};

export const buscarUsuarioPorId = (usuarioId) => {
  const usuario = users.find((user) => user.id === usuarioId);

  const usuarioResponse = {
    name: usuario.name,
    username: usuario.username,
  };

  return usuarioResponse;
};

export const vaciarListaUsuarios = () => {
  users = [];
};
