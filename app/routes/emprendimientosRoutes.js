import express from "express";
const router = express.Router();    
import { crearEmprendimiento, eliminarEmprendimiento } from "../controllers/emprendimientoController.js";


// body post: 
// {
//   "nombre": "Tienda Natural",
//   "descripcion": "Productos orgánicos",
//   "categoriaId": 1
// }

router.post("/", crearEmprendimiento);
router.delete('/:id', eliminarEmprendimiento);
export default router;