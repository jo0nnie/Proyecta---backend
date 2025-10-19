import { errorHandler } from "./middlewares/errorHandler.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
const PORT = process.env.PORT || 3000;

// middleware para subir archivos

// app.use("/users", userRoutes);

app.use("/usuarios", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Servidor en http://localhost:${[PORT]}]`));
