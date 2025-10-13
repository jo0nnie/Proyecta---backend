import { CrearEmprendimiento, EliminarEmprendimiento, ObtenerEmprendimientos, ObtenerEmprendimientoPorId } from '../services/emprendimientoService.js';

// post: crear emprendimientos
export const crearEmprendimiento = async (req, res) => {
  try {
    const usuarioId = 1; // extraído del token req.usuarioId;
    const { nombre, descripcion, categoriaId } = req.body;

    const emprendimiento = await CrearEmprendimiento({ nombre, descripcion, categoriaId }, usuarioId);

    res.status(201).json({
      msg: "Emprendimiento creado correctamente",
      emprendimiento,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
// delete
export const eliminarEmprendimiento = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new Error('ID inválido');

    const eliminado = await EliminarEmprendimiento(id);

    res.status(200).json({
      msg: 'Emprendimiento eliminado correctamente',
      eliminado,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// get
export const obtenerEmprendimientos = async (req, res) => {
  try {
    const emprendimientos = await ObtenerEmprendimientos();

    res.status(200).json({
      msg: 'Lista de emprendimientos',
      emprendimientos,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// get:id
export const obtenerEmprendimientoPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new Error('ID inválido');

    const emprendimiento = await ObtenerEmprendimientoPorId(id);

    if (!emprendimiento) {
      return res.status(404).json({ msg: 'Emprendimiento no encontrado' });
    }

    res.status(200).json({
      msg: 'Emprendimiento encontrado',
      emprendimiento,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
