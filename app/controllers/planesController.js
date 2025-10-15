import { CrearPlan, ObtenerPlanes } from '../services/planesService.js';
// post: crear planes
export const crearPlanes = async (req, res) => {
    try {
        const { nombre, descripcion, duracion, precio } = req.body;
        const nuevoPlan = await CrearPlan({ nombre, descripcion, duracion, precio });
        res.status(201).json(nuevoPlan);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el plan' });
    }
};

export const obtenerPlanes = async (req, res) => {
    try {
        const planes = await ObtenerPlanes();
        res.status(200).json(planes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los planes' });
    }
};