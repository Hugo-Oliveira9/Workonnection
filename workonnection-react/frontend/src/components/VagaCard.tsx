import { useState } from "react";
import { Vaga } from "../types/Vaga";
import {
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaGift,
  FaLaptopCode,
  FaClipboardList,
  FaEllipsisV
} from "react-icons/fa";

type Props = {
  vaga: Vaga;
  onEditar: (vaga: Partial<Vaga>) => void;
  onExcluir: () => void;
};

export function VagaCard({ vaga, onEditar, onExcluir }: Props) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [editando, setEditando] = useState(false);

  const [form, setForm] = useState({ ...vaga });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function salvarEdicao() {
    onEditar(form);
    setEditando(false);
  }

  return (
    <div className="vaga-card">

      {/* MENU 3 PONTOS */}
      <div className="vaga-menu">
        <FaEllipsisV onClick={() => setMenuAberto(!menuAberto)} />

        {menuAberto && (
          <div className="vaga-dropdown">
            <button onClick={() => {
              setEditando(true);
              setMenuAberto(false);
            }}>
              ✏️ Editar
            </button>

            <button onClick={onExcluir}>
              🗑 Excluir
            </button>
          </div>
        )}
      </div>

      {/* TÍTULO */}
      {editando ? (
        <>
          <input
            name="cargo"
            value={form.cargo}
            onChange={handleChange}
            className="edit-input"
          />
          <input
            name="empresa"
            value={form.empresa}
            onChange={handleChange}
            className="edit-input"
          />
        </>
      ) : (
        <div className="vaga-titulo">
          <h3>{vaga.cargo}</h3>
          <span>{vaga.empresa}</span>
        </div>
      )}

      {/* DESCRIÇÃO */}
      {editando ? (
        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          className="edit-textarea"
        />
      ) : (
        <p className="vaga-descricao">{vaga.descricao}</p>
      )}

      {/* INFO */}
      <ul className="vaga-info-list">
        {["modalidade","horario","localizacao","salario","beneficios","requisitos"].map((campo, i) => (
          <li key={i}>
            {editando ? (
              <input
                name={campo}
                value={(form as any)[campo] || ""}
                onChange={handleChange}
                className="edit-mini"
              />
            ) : (
              (vaga as any)[campo]
            )}
          </li>
        ))}
      </ul>

      {/* BOTÕES DE EDIÇÃO */}
      {editando && (
        <div className="vaga-footer">
          <button className="btn-success" onClick={salvarEdicao}>
            💾 Salvar
          </button>
          <button
            className="btn-danger"
            onClick={() => {
              setForm(vaga);
              setEditando(false);
            }}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
