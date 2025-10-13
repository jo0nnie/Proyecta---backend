import express from "express";
const router = express.Router();    
import { crearEmprendimiento, eliminarEmprendimiento, obtenerEmprendimientos, obtenerEmprendimientoPorId } from "../controllers/emprendimientoController.js";


// body post: 
// {
//   "nombre": "Tienda Natural",
//   "descripcion": "Productos orgánicos",
//   "categoriaId": 1
// }
router.post("/", crearEmprendimiento);
// delete
router.delete('/:id', eliminarEmprendimiento);
// get
router.get('/', obtenerEmprendimientos);
router.get('/:id', obtenerEmprendimientoPorId);
export default router;