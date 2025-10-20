import express from "express";
import emprendimientosRoutes from "./routes/emprendimientosRoutes.js"; 
import usuariosRoutes from "./routes/usuarioRoutes.js"
import carritoRoutes from "./routes/carritoRoutes.js";

const app = express();

app.use(express.json());
 //rutas de emprendimientos
app.use("/emprendimientos", emprendimientosRoutes);
//rutas de usuarios
app.use("/usuarios", usuariosRoutes);
// rutas de carrito
app.use("/carritos", carritoRoutes);

export default app;