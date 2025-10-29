import express from 'express';
const router = express.Router();
import {
    procesarPago,
    obtenerPagoPorId,
    obtenerPagos
} from "../controllers/pagosController";


//crear o generar pago
router.post('/', procesarPago)

//obtener uno de los pagos
router.get('/:id', obtenerPagoPorId)

//obtener todos los pagos
router.get('/', obtenerPagos)

export default router;