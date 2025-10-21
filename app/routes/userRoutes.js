import express from "express";
import { loguearUsuario, registrarUsuario } from "../controllers/userController.js";

const router = express.Router();

router.post("/registro", registrarUsuario);
router.post("/login", loguearUsuario);



export default router;