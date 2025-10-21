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
  loguearUsuario
} from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router();

//post register
router.post('/registro', registrarUsuario)
//post login
router.post('/login', loguearUsuario)

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