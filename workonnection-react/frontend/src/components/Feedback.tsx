type Props = {
    mensagem: string;
    tipo: "erro" | "sucesso";
};

export function Feedback({ mensagem, tipo }: Props) {
    return <div className={`feedback ${tipo}`}>
                {mensagem}
            </div>;
}