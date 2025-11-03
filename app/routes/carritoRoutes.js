import express from 'express';
import {
  createCarrito,
  obtenerCarritoPorId,
} from '../controllers/carritoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/', authMiddleware, createCarrito);
router.get('/:id',authMiddleware, obtenerCarritoPorId);

export default router;
