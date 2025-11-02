import { CrearPlan, ObtenerPlanes, ObtenerPlanPorId, EliminarPlan, ActualizarPlan } from '../services/planesService.js';
// post: crear planes
export const crearPlanes = async (req, res) => {
    try {
        const { nombre, descripcion, duracionDias, precio } = req.body;
        const nuevoPlan = await CrearPlan({ nombre, descripcion, duracionDias, precio });
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
//get:id

export const obtenerPlanPorId = async (req, res) => {

    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new Error('ID inválido');
        const plan = await ObtenerPlanPorId(id);
        if (!plan) throw new Error('Plan no encontrado');
        res.status(200).json(plan);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el plan por ID' });
    }
};

//delete:id
export const eliminarPlan = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new Error('ID inválido');

        const eliminado = await EliminarPlan(id);
        if (!eliminado) throw new Error('Plan no encontrado');
        res.status(200).send({ msg: 'Plan eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el plan' });   
    }   
};

//put:id
export const actualizarPlan = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new Error('ID inválido');

        const actualizado = await ActualizarPlan(id, req.body);
        if (!actualizado) throw new Error('Plan no encontrado');
        res.status(200).json(actualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el plan' });
    }
};