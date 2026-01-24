import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("Backend Workonnection rodando!");
});

// Rotas de autenticação
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
