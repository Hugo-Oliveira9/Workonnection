import React, { useState } from "react";
import "../style/cadastro.css";
import logo from "../assets/Logo Workonnection.png";
import { useNavigate } from "react-router-dom";

type TipoUsuario = "empresa" | "me" | "mei" | "estudante" | null

type DadosCadastro = {
    nomeDadosPessoais: string;
    cpfDadosPessoais: string;
    dataNascimentoDadosPessoais: string;
    telefoneDadosPessoais: string;
    emailDadosPessoais: string;
    senhaDadosPessoais: string;
    tipoUsuario: TipoUsuario;
}

export default function Cadastro() {
    const navigate = useNavigate();

    const [dados, setDados] = useState<DadosCadastro>({
        nomeDadosPessoais: "",
        cpfDadosPessoais: "",
        dataNascimentoDadosPessoais: "",
        telefoneDadosPessoais: "",
        emailDadosPessoais: "",
        senhaDadosPessoais: "",
        tipoUsuario: null,
    })

    const [mensagem, setMensagem] = useState<string | null>(null)
    const [tipoMsg, setTipoMsg] = useState<"erro" | "sucesso">("erro")

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value } = e.target;
        setDados((prev) => ({ ...prev, [name]: value }));
    }

    function selecionarTipo(tipo: TipoUsuario) {
        setDados((prev) => ({
            ...prev,
            tipoUsuario: prev.tipoUsuario === tipo ? null : tipo,
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!dados.emailDadosPessoais || !dados.senhaDadosPessoais) {
            setTipoMsg("erro")
            setMensagem("Preencha email e senha corretamente")
            return;
        }

        const chaveUsuario = `cadastro_${dados.emailDadosPessoais}`

        localStorage.setItem(chaveUsuario, JSON.stringify(dados))

        setTipoMsg("sucesso")
        setMensagem("Cadastro realizado com sucesso!")

        setTimeout(() => {
            navigate("/")
        }, 1500);
    }

    return (
        <>
            <header className="header">
                <img src={logo} alt="Logo Workonnection" className="logo" />
                <h1>Cadastro</h1>
            </header>

            <main className="cadastro-container">
                <section className="form-box">
                    <h2>Dados Pessoais</h2>

                    {mensagem && (
                        <div className={`feedback ${tipoMsg}`}>
                            {mensagem}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="input-group">
                                <label>Nome</label>
                                <input
                                    name="nomeDadosPessoais"
                                    value={dados.nomeDadosPessoais}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>CPF</label>
                                <input
                                    name="cpfDadosPessoais"
                                    value={dados.cpfDadosPessoais}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label>Data de Nascimento</label>
                                <input
                                    type="date"
                                    name="dataNascimentoDadosPessoais"
                                    value={dados.dataNascimentoDadosPessoais}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Telefone</label>
                                <input
                                    name="telefoneDadosPessoais"
                                    value={dados.telefoneDadosPessoais}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="emailDadosPessoais"
                                    value={dados.emailDadosPessoais}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Senha</label>
                                <input
                                    type="password"
                                    name="senhaDadosPessoais"
                                    value={dados.senhaDadosPessoais}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <p className="user-label">Tipo de usuários</p>

                        <div className="user-type-box">
                            {["empresa", "me", "mei", "estudante"].map((tipo) => (
                                <button
                                    key={tipo}
                                    type="button"
                                    className="user-btn"
                                    aria-pressed={dados.tipoUsuario === tipo}
                                    onClick={() => selecionarTipo(tipo as TipoUsuario)}
                                >
                                    {tipo.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        {dados.tipoUsuario && (
                            <div className="user-box collapsible is-open">
                                <h3>Dados adicionais ({dados.tipoUsuario})</h3>
                                <p>Campos específicos podem ser adicionados aqui.</p>
                            </div>
                        )}

                        <div className="buttons">
                            <button
                                type="button"
                                className="btn-back"
                                onClick={() => navigate("/")}
                            >
                                Voltar
                            </button>

                            <button type="submit" className="btn-submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </>
    );
}