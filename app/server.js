import { errorHandler } from "./middlewares/errorHandler.js";
import dotenv from "dotenv";
import app from "./index.js";
dotenv.config({ path: "../.env" });
const PORT = process.env.PORT || 3000;

// middleware para subir archivos

app.use(errorHandler);

app.listen(PORT, () => console.log(`Servidor en http://localhost:${[PORT]}]`));
