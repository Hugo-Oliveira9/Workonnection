import { Vaga } from "../types/Vaga";

const API_URL = "http://localhost:3000";

export async function listarVagas(): Promise<Vaga[]> {
  const response = await fetch(`${API_URL}/vagas`);

  if (!response.ok) {
    throw new Error("Erro ao buscar vagas");
  }

  return response.json();
}

export async function criarVaga(vaga: Vaga, email: string) {
  if (!email) {
    throw new Error("Usuário não logado");
  }

  const response = await fetch(`${API_URL}/vagas/criar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "user-email": email,
    },
    body: JSON.stringify(vaga),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
