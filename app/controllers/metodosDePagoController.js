import {
    crearMetodoDePago,
    editarMetodoDePago,
    listarMetodoDePagoPorId,
    listarTodosLosMetodosDePago,
    eliminarMetodoDePago
} from "../services/metodosDePagoService.js";

export const crearNuevoMetodoDePago = async (req, res) => {
    try {
        const usuarioId = req.usuarioId;
        const datosTarjeta = req.body;

        if (!usuarioId) {
            return res.status(401).json({ msg: "Usuario no autenticado" });
        }

        const { nombreDelTitular, numero, tipoTarjeta, vencimiento } = datosTarjeta;
        if (!nombreDelTitular || !numero || !tipoTarjeta || !vencimiento) {
            return res.status(400).json({ msg: "Faltan campos obligatorios en los datos de la tarjeta" });
        }

        const nuevoMetodo = await crearMetodoDePago(usuarioId, datosTarjeta);
        res.status(201).json({ msg: "Método de pago creado exitosamente", nuevoMetodo });
    } catch (error) {

        res.status(400).json({ msg: error.message });
    }
};

export const actualizarMetodoDePago = async (req, res) => {
    try {
        const usuarioId = req.usuarioId;
        const metodoPagoId = parseInt(req.params.id, 10);
        const datosActualizados = req.body;

        if (!usuarioId) {
            return res.status(401).json({ msg: "Usuario no autenticado" });
        }

        if (isNaN(metodoPagoId)) {
            return res.status(400).json({ msg: "ID de método de pago inválido" });
        }

        const metodoActualizado = await editarMetodoDePago(usuarioId, datosActualizados, metodoPagoId);
        res.status(200).json({ msg: "Método de pago actualizado", metodoActualizado });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const obtenerMetodoDePagoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const metodoId = parseInt(id, 10);

        if (isNaN(metodoId)) {
            return res.status(400).json({ msg: "ID inválido" });
        }

        const metodoPorId = await listarMetodoDePagoPorId(metodoId);
        res.status(200).json(metodoPorId);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export const obtenerTodosLosMetodosDePago = async (req, res) => {
    try {
        const usuarioId = req.usuarioId;

        if (!usuarioId) {
            return res.status(401).json({ msg: "Usuario no autenticado" });
        }

        const todosLosMetodos = await listarTodosLosMetodosDePago(usuarioId);
        res.status(200).json(todosLosMetodos);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener los métodos de pago" });
    }
};
export const borrarMetodoDePago = async (req, res) => {
    try {
        const usuarioId = req.usuarioId;
        const { id } = req.params;

        if (!usuarioId) return res.status(401).json({ msg: "No autenticado" });

        const metodoPagoId = parseInt(id, 10);
        if (isNaN(metodoPagoId)) {
            return res.status(400).json({ msg: "ID de método de pago inválido" });
        }
        await eliminarMetodoDePago(metodoPagoId, usuarioId);

        res.status(200).json({ msg: "Método de pago eliminado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};