<<<<<<< HEAD
import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";
import app from "./index.js";
dotenv.config({ path: "../.env" });

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(errorHandler);

app.listen(PORT, () => console.log(`Servidor en http://localhost:${[PORT]}`));
=======
// server.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import emprendimientosRoutes from "./routes/emprendimientosRoutes.js";
import usuariosRoutes from "./routes/usuarioRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Cargar variables de entorno
dotenv.config({ path: "../.env" });

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Crear la aplicación Express (una sola vez)
const app = express();

// Middlewares globales
app.use(express.json());

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// Montar rutas
app.use("/emprendimientos", emprendimientosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/", userRoutes);

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Frontend permitido: ${FRONTEND_URL}`);
});
>>>>>>> 4bb50d6 (se modificaron los endpoints de usuario y se cambio el lugar de las rutas a server.js)
