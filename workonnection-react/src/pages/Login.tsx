import React, { useState } from "react";
import "../style/login.css";
import logo from "../assets/Logo Workonnection.png";
import { Link, useNavigate } from "react-router-dom";

type DadosCadastro = {
  nomeDadosPessoais?: string;
  senhaDadosPessoais?: string;
};

type FeedbackTipo = "erro" | "sucesso";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [tipo, setTipo] = useState<FeedbackTipo>("erro");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !senha) {
      setTipo("erro");
      setMensagem("Email ou senha inválidos.");
      return;
    }

    const chaveUsuario = `cadastroDados_${email}`;
    const stored = localStorage.getItem(chaveUsuario);

    if (!stored) {
      setTipo("erro");
      setMensagem("Email ou senha inválidos.");
      return;
    }

    const dados: DadosCadastro = JSON.parse(stored);

    if (senha === dados.senhaDadosPessoais) {
      localStorage.setItem("usuarioLogado", email);
      setTipo("sucesso");
      setMensagem(`Bem-vindo(a), ${dados.nomeDadosPessoais || "Usuário"}!`);

      setTimeout(() => {
        navigate("/home");
      }, 1200);
    } else {
      setTipo("erro");
      setMensagem("Email ou senha inválidos.");
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
