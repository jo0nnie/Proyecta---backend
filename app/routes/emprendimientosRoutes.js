import express from "express";
const router = express.Router();    
import { crearEmprendimiento, eliminarEmprendimiento, obtenerEmprendimientos, obtenerEmprendimientoPorId, actualizarEmprendimiento } from "../controllers/emprendimientoController.js";


// body post: 
// {
//   "nombre": "Tienda Natural",
//   "descripcion": "Productos orgánicos",
//   "imagen": "url_de_la_imagen",
//   "categoriaId": 1
// }
router.post("/", crearEmprendimiento);
// delete
router.delete('/:id', eliminarEmprendimiento);
// get
router.get('/', obtenerEmprendimientos);
router.get('/:id', obtenerEmprendimientoPorId);
//put/update
// {
//   "nombre": "Tienda Naturales",
//   "descripcion": "Productos veganos",
//   "visibilidad": 1,
//   "categoriaId": 2,
//   "ubicacion": "Posadas, Misiones",
//   "contacto": "tienda@natural.com",
//   "imagen": "https://img.com/logo.png",
//   "redes": "IG: @tiendanatural"
// }

router.put('/:id', actualizarEmprendimiento);
export default router;