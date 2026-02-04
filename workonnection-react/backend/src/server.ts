import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import vagasRoutes from "./routes/vagas.routes";
import { autenticarUsuario } from "./middlewares/authUsuario";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/vagas", vagasRoutes);