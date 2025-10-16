import express from "express";
import emprendimientosRoutes from "./routes/emprendimientosRoutes.js"; 
import usuariosRoutes from "./routes/usuarioRoutes.js"

const app = express();

app.use(express.json());
 //rutas de emprendimientos
app.use("/emprendimientos", emprendimientosRoutes);
//rutas de usuarios
app.use("/usuarios", usuariosRoutes);

export default app;