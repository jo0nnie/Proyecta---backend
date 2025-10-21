// routes/usuarioRoutes.js
import express from "express";
import {
  ListarUsuarios,
  ListarUsuarioPorId, // Asegúrate de importarlo
  EditarUsuario,
  EliminarUsuario
} from "../controllers/usuarioController.js";
import {
    registrarUsuario,
    loguearUsuario
} from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router();

// 👇 Ruta pública: perfil de usuario
router.get('/:id', ListarUsuarioPorId);
//DELETE by id
router.delete('/:id', EliminarUsuario);
// put editar usuario
router.put('/:id', EditarUsuario);
//post register
router.post('/registro', registrarUsuario)
//post login
router.post('/login', loguearUsuario)

router.use(authMiddleware);

router.get('/', ListarUsuarios);
router.put('/:id', EditarUsuario);
router.delete('/:id', EliminarUsuario);

export default router;