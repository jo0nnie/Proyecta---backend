import express from "express";
import {
  loguearUsuario,
  registrarUsuario,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/registro", registrarUsuario);
userRoutes.post("/login", loguearUsuario);

userRoutes.use(authMiddleware);

export default userRoutes;
