import { CrearEmprendimiento } from '../services/emprendimientoService';

export const crearEmprendimiento = async (req, res) => {
    try {
        const emprendimiento   = await CrearEmprendimiento(req.body);   
        res.status(201).json({ msg: "Emprendimiento creado correctamente", emprendimiento });
    } catch (error) {   
        res.status(400).json({ msg: error.message });
    }
};

