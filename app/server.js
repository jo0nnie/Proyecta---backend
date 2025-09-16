import express from "express";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
