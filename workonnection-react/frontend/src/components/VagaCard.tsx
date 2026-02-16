import { Vaga } from "../types/Vaga";
import {
  FaBuilding,
  FaBriefcase,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaGift,
  FaLaptopCode,
  FaClipboardList
} from "react-icons/fa";

type Props = {
  vaga: Vaga;
  onEditar: (vaga: Partial<Vaga>) => void;
  onExcluir: () => void;
};

export function VagaCard({ vaga, onEditar, onExcluir }: Props) {
  return (
    <div className="vaga-card">

      <div className="vaga-titulo">
        <h3>{vaga.cargo}</h3>
        <span>{vaga.empresa}</span>
      </div>

      <p className="vaga-descricao">{vaga.descricao}</p>

      <ul className="vaga-info-list">

        <li>
          <FaLaptopCode /> {vaga.modalidade}
        </li>

        <li>
          <FaClock /> {vaga.horario}
        </li>

        <li>
          <FaMapMarkerAlt /> {vaga.localizacao}
        </li>

        <li>
          <FaMoneyBillWave /> {vaga.salario}
        </li>

        <li>
          <FaGift /> {vaga.beneficios}
        </li>

        <li>
          <FaClipboardList /> {vaga.requisitos}
        </li>

      </ul>

      <div className="vaga-footer">
        
        <button
          className="btn-success"
          onClick={() =>
            onEditar({
              cargo: prompt("Novo cargo:", vaga.cargo) || vaga.cargo,
              descricao: prompt("Nova descrição:", vaga.descricao) || vaga.descricao
            })
          }
        >
          ✏️ Editar
        </button>

        <button
          className="btn-danger"
          onClick={onExcluir}
        >
          🗑 Excluir
        </button>

      </div>

    </div>
  );
}
