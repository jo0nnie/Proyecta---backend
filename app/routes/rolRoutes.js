import express from 'express';
const router = express.Router();
import {CrearRol, ObtenerRol, ObtenerRolPorId} from '../controllers/rolController.js'


//post roles (creación de roles)
router.post('/crear-rol', CrearRol)
//GET todos los roles
router.get('/', ObtenerRol)
//get rol por id
router.get('/:id', ObtenerRolPorId)


export default router;