import {
  LoguearUsuario,
  RegistrarUsuario,
  LogoutUsuario,
} from "../services/authService.js";

export const registrarUsuario = async (req, res, next) => {
  try {
    const usuario = await RegistrarUsuario(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    next(err);
  }
};

export const loguearUsuario = async (req, res, next) => {
  try {
    const { usuario, token } = await LoguearUsuario(req.body);
    res.status(201).json({ usuario, token });
  } catch (err) {
    next(err);
  }
};

export const logoutUsuario = async (req, res, next) => {
  try {
    const { email } = req.body;
    const resultado = await LogoutUsuario({ email });
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
