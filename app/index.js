import express from "express";
import emprendimientosRoutes from "./routes/emprendimientosRoutes.js"; 
import fileUpload from "express-fileupload";

const app = express();
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(express.json());
 //rutas de emprendimientos
app.use("/emprendimientos", emprendimientosRoutes);

export default app;