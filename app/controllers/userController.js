import {
  buscarUsuarioPorId,
  listar,
  login,
  registrar,
  vaciarListaUsuarios,
} from "../services/userService.js";

export const registrarUsuario = async (req, res) => {
  try {
    const user = await registrar(req.body);
    res.status(201).json({ msg: "Usuario registrado correctamente", user });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const loguearUsuario = async (req, res) => {
  try {
    const { user, token } = await login(req.body);
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const listarUsuarios = (req, res) => {
  const listaDeUsuarios = listar();

  res.json(listaDeUsuarios);
};

export const usuarioPorId = (req, res) => {
  const userId = req.params.id;
  const usuario = buscarUsuarioPorId(userId);
  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json(usuario);
};

export const vaciarUsuarios = (req, res) => {
  vaciarListaUsuarios()
};
