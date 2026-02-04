import { useState } from "react";
import { Vaga } from "../types/Vaga";
import { getUsuarioLogado } from "../services/authSession";

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
        email: ""
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        setVaga({...vaga, [e.target.name]: e.target.value });
    }

    function handleSalvar(){
        const email = getUsuarioLogado();

        if (!email){
            alert("Usuário não logado");
            return;
        }

        onSalvar({ ...vaga, criadoPor: email});
    }

  return (
    <div className="modal-vaga">
      {Object.keys(vaga).map(
        (campo) =>
          campo !== "criadoPor" && (
            <input
              key={campo}
              name={campo}
              placeholder={campo}
              value={(vaga as any)[campo]}
              onChange={handleChange}
            />
          )
      )}

      <div className="modal-footer">
        <button onClick={handleSalvar}>Salvar</button>
        <button onClick={onFechar}>Cancelar</button>
      </div>
    </div>
  );
}