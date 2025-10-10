import express from "express";
const router = express.Router();    
import { crearEmprendimiento } from "../controllers/emprendimientoController.js";

router.post("/", crearEmprendimiento);

export default router;