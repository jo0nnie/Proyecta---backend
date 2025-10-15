import express from 'express';

const router = express.Router();
import { crearPlanes, obtenerPlanes } from '../controllers/planesController.js';

// body post:
// {
//     "nombre": "Impulso Inicial",
//     "descripcion": [
//             "Prioridad en tu categoría durante 7 días",
//             "Recomendación destacada en la página principal",
//             "Ideal para lanzamientos o promociones relámpago",
//             "Visibilidad inmediata sin compromiso a largo plazo"
//         ],
//     "duracion": "Una Semana",
//     "precio": "100"
// }
router.post('/', crearPlanes);
// get todos los planes
router.get('/', obtenerPlanes);
export default router;

