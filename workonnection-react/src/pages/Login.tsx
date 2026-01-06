import React, { useState } from "react";
import "../styles/login.css";
import logo from "../assets/Logo Workonnection.png";

type DadosCadastro = {
  nomeDadosPessoais?: string;
  senhaDadosPessoais?: string;
};

type FeedbackTipo = "erro" | "sucesso";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [tipo, setTipo] = useState<FeedbackTipo>("erro");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setMensagem(null);
  };

  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);
    setMensagem(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

    let dados: DadosCadastro;

    try {
      dados = JSON.parse(stored);
    } catch {
      setTipo("erro");
      setMensagem("Erro ao processar os dados do usuário.");
      return;
    }

    if (senha === dados.senhaDadosPessoais) {
      localStorage.setItem("usuarioLogado", email);
      setTipo("sucesso");
      setMensagem(`Bem-vindo(a), ${dados.nomeDadosPessoais || "Usuário"}!`);

      setTimeout(() => {
        window.location.href = "/home";
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
        <div className="form-box">
          <img src={logo} alt="Logo Workonnection" className="logoLogin" />

          {mensagem && (
            <div className={`feedback ${tipo}`}>
              {mensagem}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              <span className="icon">
                <i className="fas fa-envelope"></i>
              </span>
              Email:
            </label>

            <input
              type="email"
              id="email"
              placeholder="Insira o seu email"
              value={email}
              onChange={handleEmailChange}
              required
            />

            <label htmlFor="senha">
              <span className="icon">
                <i className="fas fa-lock"></i>
              </span>
              Senha:
            </label>

            <input
              type="password"
              id="senha"
              placeholder="Insira a sua senha"
              value={senha}
              onChange={handleSenhaChange}
              required
            />

            <button type="submit">➜ Entrar</button>
          </form>

          <p className="cadastro">
            Não é cadastrado? <a href="/cadastro">Cadastre-se</a>
          </p>
        </div>
      </div>
    </div>
  );
}
