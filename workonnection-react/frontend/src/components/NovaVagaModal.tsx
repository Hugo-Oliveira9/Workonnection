import { useState } from "react";
import { Vaga } from "../types/Vaga";

type Props = {
    onSalvar: (vaga: Vaga) => void;
    onFechar: () => void;
}

export function NovaVagaModal({ onSalvar, onFechar }: Props){
    const [vaga, setVaga] = useState<Vaga>({
      empresa: "",
      cargo: "",
      descricao: "",
      modalidade: "",
      horario: "",
      beneficios: "",
      localizacao: "",
      salario: "",
      data: "",
      requisitos: "",
    });

    function handleChange
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ){
        setVaga({...vaga, [e.target.name]: e.target.value });
    }

  return (
   <div className="modal-vaga">

      <div className="modal-box">

        <input name="empresa" placeholder="Empresa" onChange={handleChange} />
        <input name="cargo" placeholder="Cargo" onChange={handleChange} />
        <textarea name="descricao" placeholder="Descrição" onChange={handleChange} />

        <input name="modalidade" placeholder="Modalidade" onChange={handleChange} />
        <input name="horario" placeholder="Horário" onChange={handleChange} />
        <input name="localizacao" placeholder="Localização" onChange={handleChange} />
        <input name="salario" placeholder="Salário" onChange={handleChange} />
        <input name="beneficios" placeholder="Beneficios" onChange={handleChange} />
        <input name="requisitos" placeholder="Requisitos" onChange={handleChange} />

        <div className="modal-actions">
          <button className="btn-cancelar" onClick={onFechar}>Cancelar</button>
          <button className="btn-salvar" onClick={() => onSalvar(vaga as any)}>
            Publicar
          </button>
        </div>

      </div>

    </div>
  );
}