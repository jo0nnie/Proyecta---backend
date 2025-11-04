import express from "express";
import {
  crearCarritoItem,
  eliminarCarritoItem,
  actualizarCarritoItem,
  obtenerCarritoItemPorId,
  // obtenerItemsDelCarrito,
} from "../controllers/carritoItemController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getCarritoItems } from "../services/carritoItemService.js";

const router = express.Router();

//endpoints de carrito item
//crear items de carrito
router.post("/", authMiddleware, crearCarritoItem);

//obtener un item
router.get("/:id", authMiddleware, obtenerCarritoItemPorId);

//obtener todos
// router.get("/carrito/:carritosId", authMiddleware, obtenerItemsDelCarrito);

router.get("/:carritosId/items",  getCarritoItems);
//eliminar item
router.delete("/:id", authMiddleware, eliminarCarritoItem);

//editar item
router.put("/:id", authMiddleware, actualizarCarritoItem);

export default router;
