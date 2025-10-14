import express from "express";
import { registrarUsuario } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/registro", registrarUsuario);

export default userRoutes;
