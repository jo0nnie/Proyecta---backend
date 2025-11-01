import {
    crearPago,
    listarTodosLosPagos,
    listarPagoPorId,
} from "../services/pagosService.js";

export const procesarPago = async (req, res) => {
    try {
        const usuarioId = req.usuarioId;
        const { metodoPagoId, tarjetaTemporal } = req.body;

        if (!usuarioId) {
            return res.status(401).json({ msg: "Usuario no autenticado" });
        }

        const idNumerico = metodoPagoId ? parseInt(metodoPagoId, 10) : null;
        if (metodoPagoId && isNaN(idNumerico)) {
            return res.status(400).json({ msg: "ID de método de pago inválido" });
        }

        const pago = await crearPago(usuarioId, {
            metodoPagoId: idNumerico,
            tarjetaTemporal,
        });

        res.status(201).json(pago);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const obtenerTodosLosPagos = async (req, res) => {
    try {
        const usuarioId = req.usuarioId;
        if (!usuarioId) return res.status(401).json({ msg: "No autenticado" });

        const pagos = await listarTodosLosPagos(usuarioId);
        res.status(200).json(pagos);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener los pagos" });
    }
};

export const obtenerPagoPorId = async (req, res) => {
    try {
        const usuarioId = req.usuarioId;
        const { id } = req.params;
        const pagoId = parseInt(id, 10);

        if (!usuarioId) return res.status(401).json({ msg: "No autenticado" });
        if (isNaN(pagoId)) return res.status(400).json({ msg: "ID de pago inválido" });

        const pago = await listarPagoPorId(pagoId, usuarioId);
        res.status(200).json(pago);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};