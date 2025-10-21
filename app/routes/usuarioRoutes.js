// routes/usuarioRoutes.js
import express from "express";
import {
  ListarUsuarios,
  ListarUsuarioPorId, // Asegúrate de importarlo
  EditarUsuario,
  EliminarUsuario
} from "../controllers/usuarioController.js";
<<<<<<< HEAD
import {
    registrarUsuario,
    loguearUsuario
} from '../controllers/userController.js'
// import { authMiddleware } from '../middlewares/authMiddleware.js'
=======
import { authMiddleware } from "../middlewares/authMiddleware.js";
>>>>>>> 4bb50d6 (se modificaron los endpoints de usuario y se cambio el lugar de las rutas a server.js)

const router = express.Router();

// 👇 Ruta pública: perfil de usuario
router.get('/:id', ListarUsuarioPorId);
<<<<<<< HEAD
//DELETE by id
router.delete('/:id', EliminarUsuario);
// put editar usuario
router.put('/:id', EditarUsuario);
//post register
router.post('/registro', registrarUsuario)
//post login
router.post('/login', loguearUsuario)
=======
>>>>>>> 4bb50d6 (se modificaron los endpoints de usuario y se cambio el lugar de las rutas a server.js)

// 👇 A partir de aquí, todo requiere autenticación
router.use(authMiddleware);

router.get('/', ListarUsuarios);
router.put('/:id', EditarUsuario);
router.delete('/:id', EliminarUsuario);

export default router;