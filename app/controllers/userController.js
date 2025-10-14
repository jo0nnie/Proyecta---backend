import { LoguearUsuario, RegistrarUsuario } from "../services/userService.js";

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
