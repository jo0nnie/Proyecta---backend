import express from 'express';
import {
  createCarrito,
  obtenerCarritoPorId,
  agregarItem
} from '../controllers/carritoController.js';
import { obtenerItemsDelCarrito } from '../controllers/carritoItemController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { eliminarItemsDelCarrito } from '../controllers/carritoItemController.js';
const router = express.Router();

router.post('/', authMiddleware, createCarrito);
router.get('/:id', authMiddleware, obtenerCarritoPorId);
//post carrito item

//IMPORTANTE
router.get("/:id/items", obtenerItemsDelCarrito);

//delete eliminar todos
router.delete("/:id/items", eliminarItemsDelCarrito);
router.post("/agregar-item", agregarItem);
export default router;
