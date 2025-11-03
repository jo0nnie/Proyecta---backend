import express from "express";
import {
  crearFavoritos,
  eliminarFavorito,
  obtenerFavoritos,
  toggleFavoritoController
} from "../controllers/favoritosController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, obtenerFavoritos);
router.post("/", authMiddleware, crearFavoritos);
router.delete("/:id", authMiddleware, eliminarFavorito);
router.post("/toggle", authMiddleware, toggleFavoritoController);

export default router;
