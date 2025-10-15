import express from "express";
import emprendimientosRoutes from "./routes/emprendimientosRoutes.js";
import planesRoutes from "./routes/planesRoutes.js";

const app = express();

app.use(express.json());
//rutas de emprendimientos
app.use("/emprendimientos", emprendimientosRoutes);
// rutas de planes
app.use("/planes", planesRoutes);


export default app;