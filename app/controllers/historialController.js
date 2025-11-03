import {
  limpiarHistorial,
  listarRecienVistos,
  recienVisto,
} from "../services/historialService.js";

export const obtenerRecienVistos = async (req, res, next) => {
  try {
    const usuarioId = req.usuarioId;
    const historial = await listarRecienVistos(usuarioId);
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};

export const EmprendimientoRecienVisto = async (req, res, next) => {
  try {
    const usuarioId = req.usuarioId;
    const { emprendimientoId } = req.body;
    console.log("Controller recibe:", { usuarioId, emprendimientoId });
    const resultado = await recienVisto(usuarioId, emprendimientoId);
    res.status(200).json(resultado);
  } catch (err) {
    console.error("Error en controller:", err);
    next(err);
  }
};
//listo
export const HistorialLimpio = async (req, res, next) => {
  try {
    const usuarioId = req.usuarioId;
    const resultado = await limpiarHistorial(usuarioId);
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
};
