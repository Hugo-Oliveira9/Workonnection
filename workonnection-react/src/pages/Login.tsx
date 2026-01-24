import React, { useState } from "react";
import "../style/login.css";
import logo from "../assets/Logo Workonnection.png";
import { Link, useNavigate } from "react-router-dom";

type FeedbackTipo = "erro" | "sucesso";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [tipo, setTipo] = useState<FeedbackTipo>("erro");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !senha) {
      setTipo("erro");
      setMensagem("Email ou senha inválidos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, senha}),
      });

      const result = await response.json();

      if (!response.ok) {
        setTipo("erro");
        setMensagem(result.message || "Erro no Login");
        return;
      }

      setTipo("sucesso");
      setMensagem(`Bem vindo(a), ${result.nome}!`)
    }catch(error){
      setTipo("erro");
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="container">
      <div className="left">
        <img
          src="https://www.netzpiloten.de/wp-content/uploads/2021/01/work-life-balance-home-office-1000x1000-1.jpg"
          alt="ImagemLogin"
        />
      </div>

      <div className="right">
        <div className="login-form-box">
          <img src={logo} alt="Logo Workonnection" className="logoLogin" />

          {mensagem && <div className={`feedback ${tipo}`}>{mensagem}</div>}

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <button type="submit">➜ Entrar</button>
          </form>

          <p className="cadastro">
            Não é cadastrado? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
