import express from "express";
import {
  crearFavoritos,
  eliminarFavorito,
  obtenerFavoritos,
} from "../controllers/favoritosController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, obtenerFavoritos);
router.post("/", authMiddleware, crearFavoritos);
router.delete("/:id", authMiddleware, eliminarFavorito);

export default router;
