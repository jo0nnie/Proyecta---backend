import express from "express";
import { ListarCategorias } from "../controllers/categoriaController.js";

const router = express.Router();

router.get("/", ListarCategorias);

export default router;
