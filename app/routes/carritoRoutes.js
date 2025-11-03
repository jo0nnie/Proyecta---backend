import express from 'express';
import {
  createCarrito,
  obtenerCarritoPorId,
  agregarItem
} from '../controllers/carritoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/', authMiddleware, createCarrito);
router.get('/:id',authMiddleware, obtenerCarritoPorId);
//post carrito item
router.post("/agregar-item", agregarItem);
export default router;
