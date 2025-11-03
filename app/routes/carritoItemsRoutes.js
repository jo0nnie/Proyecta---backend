import express from "express";
import {
  crearCarritoItem,
  eliminarCarritoItem,
  actualizarCarritoItem,
  obtenerCarritoItemPorId,
  obtenerItemsDeCarrito,
  getCarritoItems
} from "../controllers/carritoItemController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//endpoints de carrito item
//crear items de carrito
router.post("/", authMiddleware, crearCarritoItem);

//obtener un item
router.get("/:id", authMiddleware, obtenerCarritoItemPorId);

//obtener todos
router.get("/carrito/:carritosId", authMiddleware, obtenerItemsDeCarrito);
router.get("/carrito/:carritosId/items", authMiddleware, getCarritoItems);
//eliminar item
router.delete("/:id", authMiddleware, eliminarCarritoItem);

//editar item
router.put("/:id", authMiddleware, actualizarCarritoItem);

export default router;
