import express from "express";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import dotenv from 'dotenv'
dotenv.config('../.env');
const PORT = process.env.PORT || 3000;



const app = express();
app.use(express.json());

// app.use("/users", userRoutes);

app.use(errorHandler);


app.listen(PORT, () => console.log(`Servidor en http://localhost:${[PORT]}]`));
