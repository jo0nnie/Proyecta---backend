import { RegistrarUsuario } from "../services/userService.js";

export const registrarUsuario = async (req, res, next) => {
  try {
    const usuario = await RegistrarUsuario(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    next(err);
  }
};
