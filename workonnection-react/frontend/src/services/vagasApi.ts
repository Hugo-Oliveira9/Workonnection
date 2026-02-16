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

export async function editarVaga(
  id: string,
  vaga: Partial<Vaga>,
  email: string
) {
  const res = await fetch(`${API_URL}/vagas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "user-email": email
    },
    body: JSON.stringify(vaga)
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);
  return data;
}

export async function excluirVaga(id: string, email: string) {
  const res = await fetch(`${API_URL}/vagas/${id}`, {
    method: "DELETE",
    headers: {
      "user-email": email
    }
  });

  const data = await res.json();
  
  if (!res.ok) throw new Error(data.message);
  return data;
}