let emailLogado: string | null = null;

export function setUsuarioLogado(email: string) {
  emailLogado = email;
}

export function getUsuarioLogado() {
  return emailLogado;
}

export function isLogado() {
  return emailLogado !== null;
}

export function logout() {
  emailLogado = null;
}
