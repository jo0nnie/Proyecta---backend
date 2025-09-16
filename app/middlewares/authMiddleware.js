import { SECRET } from "../constants/constants.js";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader) return res.status(401).json({ error: "Token requerido" });
  
  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token inválido" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token no válido o expirado" });
  }
};
