import express from "express";
const router = express.Router();
import {
    crearNuevoMetodoDePago,
    actualizarMetodoDePago,
    obtenerMetodoDePagoPorId,
    obtenerTodosLosMetodosDePago,
    borrarMetodoDePago
} from "../controllers/metodosDePagoController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

//crear nuevo metodo
router.post('/', authMiddleware, crearNuevoMetodoDePago);

//actualizar metodo
router.put('/:id', authMiddleware, actualizarMetodoDePago);

//obtener un metodo
router.get('/:id', authMiddleware, obtenerMetodoDePagoPorId);

//obtener todos los metodos
router.get('/', authMiddleware, obtenerTodosLosMetodosDePago);

//eliminar metodo
router.delete('/:id', authMiddleware, borrarMetodoDePago);

export default router;