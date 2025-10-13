import express from "express";
const router = express.Router();    
import { crearEmprendimiento } from "../controllers/emprendimientoController.js";


// body post: 
// {
//   "nombre": "Tienda Natural",
//   "descripcion": "Productos orgánicos",
//   "categoriaId": 1
// }

router.post("/", crearEmprendimiento);

export default router;