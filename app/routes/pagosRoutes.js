import express from 'express';
const router = express.Router();
import {
    procesarPago,
    obtenerPagoPorId,
    obtenerTodosLosPagos
} from "../controllers/pagosController.js";
import { authMiddleware } from '../middlewares/authMiddleware.js'


//crear o generar pago
router.post('/', authMiddleware, procesarPago)

//obtener uno de los pagos
router.get('/:id', authMiddleware, obtenerPagoPorId)

//obtener todos los pagos
router.get('/', authMiddleware, obtenerTodosLosPagos)

export default router;