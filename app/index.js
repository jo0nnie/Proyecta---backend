import express from "express";
import emprendimientosRoutes from "./routes/emprendimientosRoutes.js";
import planesRoutes from "./routes/planesRoutes.js";
import emprendimientosRoutes from "./routes/emprendimientosRoutes.js"; 
import fileUpload from "express-fileupload";
import cors from "cors";  
import usuariosRoutes from "./routes/usuarioRoutes.js"

const app = express();


app.use(cors({
  origin: 'http://localhost:5173', //frontend URL server
  methods: ['GET', 'POST', 'PUT', 'DELETE'], //mis metodos de front
  // credentials: true, // si usás cookies o autenticación
}));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(express.json());
//rutas de emprendimientos
app.use("/emprendimientos", emprendimientosRoutes);
// rutas de planes
app.use("/planes", planesRoutes);
//rutas de usuarios
app.use("/usuarios", usuariosRoutes);

export default app;