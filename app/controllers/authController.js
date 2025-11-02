import {
  LoguearUsuario,
  RegistrarUsuario,
  LogoutUsuario,
  verificarEmail,
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

export const logoutUsuario = async (req, res) => {
  try {
    const id = req.usuarioId;
    const resultado = await LogoutUsuario({ id });
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const VerificarEmail = async (req, res) => {
  try {
    const resultado = await verificarEmail(req.query.token);
    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error al verificar token:", error);
    res.status(400).json({ error: error.message || "Token inválido o expirado" });
  }
};

