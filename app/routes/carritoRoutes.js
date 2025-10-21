import express from 'express';
import {
  createCarrito,
  obtenerCarritoPorId,
} from '../controllers/carritoController.js';

const router = express.Router();

router.post('/', createCarrito);
router.get('/:id', obtenerCarritoPorId);

export default router;
