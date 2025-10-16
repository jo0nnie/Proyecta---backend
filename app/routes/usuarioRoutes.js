import express from "express";
import {ListarUsuarios, ListarUsuarioPorId, EditarUsuario, EliminarUsuario
} from "../controllers/usuarioController.js";
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

export default router;
