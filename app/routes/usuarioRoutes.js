import express from "express";
import {
  ListarUsuarios,
  ListarUsuarioPorId,
  EditarUsuario,
  EliminarUsuario,
  ObtenerUsuarioLogueado,
  EditarUsuarioLogueado,
  EliminarUsuarioLogueado
} from "../controllers/usuarioController.js";
import {
  registrarUsuario,
  loguearUsuario,
  logoutUsuario, 
} from '../controllers/authController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router();
// {
//   "nombre": "TestUser",
//   "apellido": "testUser",
//   "email": "admin@ejemplo.com",
//   "contrasena": "admin123",
//   "fechaNacimiento": "1996-12-12",
//   "rolesId": 2 si es que ese es el adminId
// }
//post register
router.post('/registro', registrarUsuario)
//post login
router.post('/login', loguearUsuario)
//post logout
router.post('/logout', logoutUsuario)




//rutas para el usuario
//get usuario
router.get("/me", authMiddleware, ObtenerUsuarioLogueado);
//put usuario
router.put("/me", authMiddleware, EditarUsuarioLogueado);
//delete usuario
router.delete("/me", authMiddleware, EliminarUsuarioLogueado);

//rutas para admin
router.get("/", ListarUsuarios);
router.get("/:id", authMiddleware, ListarUsuarioPorId);
router.put("/:id", authMiddleware, EditarUsuario);
router.delete("/:id", authMiddleware, EliminarUsuario);

export default router;