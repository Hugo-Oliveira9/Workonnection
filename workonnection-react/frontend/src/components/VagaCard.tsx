import { Vaga } from "../types/Vaga";

type Props = {
  vaga: Vaga;
};

export function VagaCard({ vaga }: Props) {
  return (
    <div className="vaga-card">
      <div className="vaga-body">
        <p><strong>Empresa:</strong> {vaga.empresa}</p>
        <p><strong>Cargo:</strong> {vaga.cargo}</p>
        <p>{vaga.descricao}</p>
        <p><strong>Modalidade:</strong> {vaga.modalidade}</p>
        <p><strong>Salário:</strong> {vaga.salario}</p>
      </div>
    </div>
  );
}