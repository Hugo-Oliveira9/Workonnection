import { useEffect, useState } from "react";
import { Vaga } from "../types/Vaga";
import { listarVagas, criarVaga } from "../services/vagasApi";
import { getUsuarioLogado } from "../services/authSession";
import { VagaCard } from "../components/VagaCard";
import { Topbar } from "../components/Topbar";
import { NovaVagaModal } from "../components/NovaVagaModal";
import "../style/home.css";

export default function Home(){
    const [vagas, setVagas] = useState<Vaga[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [pesquisa, setPesquisa] = useState("");

    useEffect(() => {
        async function carregarVagas() {
            try {
                const lista = await listarVagas();
                setVagas(lista);
            }catch (err: any){
                alert(err.message);
            }
        }
        carregarVagas();
    }, []);

    const vagasFiltradas = vagas.filter(
        (v) => 
            v.cargo.toLowerCase().includes(pesquisa.toLowerCase()) ||
            v.empresa.toLowerCase().includes(pesquisa.toLowerCase())
    );

    const handleSalvarVaga = async (novaVaga: Vaga) => {
        try {
            const vagaCriada = await criarVaga(novaVaga);
            setVagas((prev) => [vagaCriada.vaga, ...prev]);
            setShowModal(false);
        }catch (err: any){
            alert(err.message);
        }
    };

      return (
    <div>
      <Topbar pesquisa={pesquisa} setPesquisa={setPesquisa} />

      <div className="filtros-vagas">
        <div className="filtro-item ativo">
          <i className="fas fa-briefcase"></i> Todas as vagas
        </div>
      </div>

      <div id="vagas-container">
        {vagasFiltradas.map((vaga, idx) => (
          <VagaCard key={idx} vaga={vaga} />
        ))}
      </div>

      <button
        className="btn btn-primary btn-lg botao-publicar"
        onClick={() => setShowModal(true)}
      >
        <i className="fas fa-plus"></i>
      </button>

      {showModal && (
        <NovaVagaModal
          onSalvar={handleSalvarVaga}
          onFechar={() => setShowModal(false)}
        />
      )}
    </div>
  );
}