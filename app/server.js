import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config({ path: "../.env" });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use(errorHandler);

app.listen(PORT, () => console.log(`Servidor en http://localhost:${[PORT]}`));
