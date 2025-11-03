import {crearRol, obtenerRoles, obtenerRolPorId} from '../services/rolService.js'

export const CrearRol = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevoRol = await crearRol(nombre);
    res.status(201).json(nuevoRol);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const ObtenerRol = async (req, res) => {
  try {
    const roles = await obtenerRoles();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los roles.' });
  }
};

export const ObtenerRolPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await obtenerRolPorId(Number(id));
    res.status(200).json(rol);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

