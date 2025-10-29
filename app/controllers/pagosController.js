import { crearPago, listarTodosLosPagos, listarPagoPorId } from "../services/pagosService";

export const procesarPago = async (req, res) => {
    try {
        const usuarioId = req.usuarioId;
        if (!usuarioId) return res.status(401).json({ msg: "Usuario no autenticado" });

        const pago = await crearPago(usuarioId);
        res.status(201).json({ msg: "Pago procesado correctamente", pago });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const obtenerPagos = async (req, res) => {
    try {
        const usuarioId = req.usuarioId;
        if (!usuarioId) return res.status(401).json({ msg: "Usuario no autenticado" });

        const pagos = await listarTodosLosPagos(usuarioId);
        res.status(200).json({ msg: "Pagos obtenidos", pagos });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const obtenerPagoPorId = async (req, res) => {
    try {
        const usuarioId = req.usuarioId;
        const pagoId = parseInt(req.params.id);
        if (!usuarioId) return res.status(401).json({ msg: "Usuario no autenticado" });
        if (isNaN(pagoId)) return res.status(400).json({ msg: "ID de pago inválido" });

        const pago = await listarPagoPorId(pagoId, usuarioId);
        res.status(200).json({ msg: "Pago encontrado", pago });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};