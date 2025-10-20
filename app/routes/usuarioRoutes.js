import express from "express";
import {ListarUsuarios, ListarUsuarioPorId, EditarUsuario, EliminarUsuario
} from "../controllers/usuarioController.js";
import {
    registrarUsuario,
    loguearUsuario
} from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router();
//body post:


// router.post('/', crearUsuario);
//get all
router.get('/', ListarUsuarios);
//get BY ID
router.get('/:id', ListarUsuarioPorId);
//DELETE by id
router.delete('/:id', EliminarUsuario);
// put editar usuario
router.put('/:id', EditarUsuario);
//post register
router.post('/api/registro', registrarUsuario)
//post login
router.post('/api/login', loguearUsuario)

router.use(authMiddleware)
export default router;
