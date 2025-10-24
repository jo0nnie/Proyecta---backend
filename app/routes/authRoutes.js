import express from "express";
import { VerificarEmail } from "../controllers/authController.js";
const router = express.Router();

router.get("/verificar-email", VerificarEmail);



export default router;