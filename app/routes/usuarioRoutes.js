import express from "express";
import {ListarUsuarios, ListarUsuarioPorId, EditarUsuario, EliminarUsuario
} from "../controllers/usuarioController.js";
import {
    registrarUsuario, loguearUsuario
} from '../controllers/userController.js'
import { authMiddleware } from "../middlewares/authMiddleware.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";

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
//registrar
router.post('/registro', registrarUsuario);
//loguear
router.post('/login', loguearUsuario);
// router.use(authMiddleware)
export default router;
