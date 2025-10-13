import { CrearEmprendimiento, EliminarEmprendimiento } from '../services/emprendimientoService.js';

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