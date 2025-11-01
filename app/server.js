import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";
import app from "./index.js";

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
