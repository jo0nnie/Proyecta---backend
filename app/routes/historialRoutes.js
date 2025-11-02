import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  EmprendimientoRecienVisto,
  HistorialLimpio,
  obtenerRecienVistos,
} from "../controllers/historialController.js";

const router = express.Router();

router.get("/", authMiddleware, obtenerRecienVistos);
router.post("/", authMiddleware, EmprendimientoRecienVisto);
router.delete("/", authMiddleware, HistorialLimpio);

export default router;
