import { CrearEmprendimiento } from '../services/emprendimientoService.js';

export const crearEmprendimiento = async (req, res) => {
  try {
    const usuarioId = 1; // extraído del token
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