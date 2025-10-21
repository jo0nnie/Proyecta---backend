import express from "express";
import emprendimientosRoutes from "./routes/emprendimientosRoutes.js"; 
import usuariosRoutes from "./routes/usuarioRoutes.js"
import carritoRoutes from "./routes/carritoRoutes.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import planesRoutes from "./routes/planesRoutes.js";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(express.json());
//rutas de emprendimientos
app.use("/emprendimientos", emprendimientosRoutes);
//rutas de usuarios
app.use("/usuarios", usuariosRoutes);
// rutas de carrito
app.use("/carritos", carritoRoutes);

//rutas de planes
app.use("/planes", planesRoutes);
export default app;
