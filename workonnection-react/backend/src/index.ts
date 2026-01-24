import express from "express";
import authRoutes from "./routes/auth.routes";

const app = express();
const PORT = 3000;

//Middleware para ler json
app.use(express.json());

//Teste
app.get("/", (req, res) => {
    res.send("Backend Workonnection rodando!");
});

app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost: ${PORT}`);
});