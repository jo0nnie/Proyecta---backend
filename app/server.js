import { errorHandler } from "./middlewares/errorHandler.js";
import app from './index.js'
import dotenv from 'dotenv'
dotenv.config('../.env');
const PORT = process.env.PORT || 3000;

// middleware para subir archivos

// app.use("/users", userRoutes);

app.use(errorHandler);


app.listen(PORT, () => console.log(`Servidor en http://localhost:${[PORT]}]`));
