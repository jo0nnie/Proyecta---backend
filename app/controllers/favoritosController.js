import {
  listarFavoritos,
  agregarAFavoritos,
  quitarFavorito,
} from "../services/favoritosService.js";

export const obtenerFavoritos = async (req, res, next) => {
  try {
    const usuarioId = req.usuarioId;
    const favoritos = await listarFavoritos(usuarioId);
    res.status(200).json(favoritos);
  } catch (err) {
    next(err);
  }
};

export const crearFavoritos = async (req, res, next) => {
  try {
    const usuarioId = req.usuarioId;
    const { emprendimientoId } = req.body;
    const resultado = await agregarAFavoritos(usuarioId, emprendimientoId);
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
};

export const eliminarFavorito = async (req, res, next) => {
  try {
    const favoritoId = parseInt(req.params.id);
    const resultado = await quitarFavorito(favoritoId);
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
};
