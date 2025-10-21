<<<<<<< HEAD
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import emprendimientosRoutes from "./routes/emprendimientosRoutes.js";
import usuariosRoutes from "./routes/usuarioRoutes.js";
=======
/*import express from "express";
import emprendimientosRoutes from "./routes/emprendimientosRoutes.js"; 
import usuariosRoutes from "./routes/usuarioRoutes.js";
import userRoutes from "./routes/userRoutes.js";

>>>>>>> 4bb50d6 (se modificaron los endpoints de usuario y se cambio el lugar de las rutas a server.js)
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
//rutas user
app.use("/", userRoutes);

<<<<<<< HEAD
export default app;
=======
export default app;*/
>>>>>>> 4bb50d6 (se modificaron los endpoints de usuario y se cambio el lugar de las rutas a server.js)
