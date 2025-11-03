import { SECRET } from "../constants/constants.js";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client.js";

export const authMiddleware = async (req, res, next) => {
  console.log("Pasó por authMiddleware:", req.method, req.path); 
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token inválido" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    console.log(token)
    const usuario = await prisma.usuarios.findUnique({
      where: { id: decoded.id },
    });

    if (!usuario || !usuario.estado) {
      return res.status(403).json({ error: "Sesión cerrada o usuario inactivo" });
    }
    // if (usuario.verificado != true){
    //   return res.status(403).json({error:'Tu email debe estar verificado para realizar esta accion'})
    // }

    req.usuarioId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token no válido o expirado" });
  }
};
