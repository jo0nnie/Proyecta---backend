import { errorHandler } from "./middlewares/errorHandler.js";
import app from './index.js'
import dotenv from 'dotenv'
import fileUpload from "express-fileupload";
dotenv.config('../.env');
const PORT = process.env.PORT || 3000;

// middleware para subir archivos
app.use(fileUpload({
  useTempFiles: true, 
  tempFileDir: '/tmp/'
}));
// app.use("/users", userRoutes);

app.use(errorHandler);


app.listen(PORT, () => console.log(`Servidor en http://localhost:${[PORT]}]`));
