import { useEffect, useState } from "react";
import { Vaga } from "../../types/Vaga";
import { listarVagas, criarVaga, editarVaga, excluirVaga } from "../../services/vagasApi";
import { VagaCard } from "../../components/VagaCard";
import { Topbar } from "../../components/Topbar";
import { NovaVagaModal } from "../../components/NovaVagaModal";
import { useAuth } from "../../contexts/authContext";
import "./home.css";

export default function Home(){
    const [vagas, setVagas] = useState<Vaga[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [pesquisa, setPesquisa] = useState("");

    const { usuario } = useAuth();

    useEffect(() => {
      listarVagas().then(setVagas).catch(err => alert(err.message));
    }, []);

    const vagasFiltradas = vagas.filter(
        v => 
            v.cargo.toLowerCase().includes(pesquisa.toLowerCase()) ||
            v.empresa.toLowerCase().includes(pesquisa.toLowerCase())
    );

    const handleSalvarVaga = async (vaga: Vaga) => {
      if (!usuario) {
        alert("Usuário não logado");
        return;
      }

      try {
          const res = await criarVaga(vaga, usuario);
          setVagas(prev => [res.vaga, ...prev]);
          setShowModal(false);
      }catch (err: any){
          alert(err.message);
      }
    };

  return (
    <div>
      <Topbar pesquisa={pesquisa} setPesquisa={setPesquisa} />

      <div id="vagas-container">
        {vagasFiltradas.map(vaga => (
          <VagaCard 
            key={vaga.id} 
            vaga={vaga}
            onEditar={async (dados) => {
              if (!usuario) return;

              const res = await editarVaga(vaga.id!, dados, usuario);

              setVagas(prev =>
                prev.map(v => v.id === vaga.id ? res.vaga: v)
              );
            }} 
            onExcluir={async () => {
              if (!usuario) return;

              await excluirVaga(vaga.id!, usuario);

              setVagas(prev =>
                prev.filter(v => v.id !== vaga.id)
              );
            }}
          />
        ))}
      </div>

      <button
        className="botao-publicar"
        onClick={() => setShowModal(true)}
      >
        +
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