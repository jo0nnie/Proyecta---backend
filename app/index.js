import express from "express";
import emprendimientosRoutes from "./routes/emprendimientosRoutes.js"; 

const app = express();

app.use(express.json());

app.use("/emprendimientos", emprendimientosRoutes);

export default app;