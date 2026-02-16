import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../../services/api";
import { Feedback } from "../../components/Feedback";
import { useAuth } from "../../contexts/authContext";
import logo from "../../assets/Logo Workonnection.png";
import "./login.css";

type FeedbackTipo = "erro" | "sucesso";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

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
      const result = await apiPost<{
        nome: string;
        email: string;
        tipoUsuario: string;
      }>("/auth/login",{
          emailDadosPessoais: email, 
          senhaDadosPessoais: senha
      });

      login(result.email);

      setTipo("sucesso");
      setMensagem(`Bem vindo(a) ${result.nome}!`);

      setTimeout(() => {
        navigate("/home");
      }, 1500);
    }catch (error: any){
      setTipo("erro");
      setMensagem(error.message);
    }
  }

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

          {mensagem && <Feedback mensagem={mensagem} tipo={tipo}/>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu E-mail"
              required
            />

            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua Senha"
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
