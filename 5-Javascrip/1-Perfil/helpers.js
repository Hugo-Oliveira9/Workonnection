// helpers.js
export function key(base) {
  const usuario = localStorage.getItem('usuarioLogado');
  return `${base}_${usuario}`;
}

export function save(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

export function load(chave, padrao = null) {
  const valor = localStorage.getItem(chave);
  try {
    return valor ? JSON.parse(valor) : padrao;
  } catch {
    return padrao;
  }
}

export function confirmDelete(msg = 'Tem certeza que deseja excluir?') {
  return confirm(msg);
}

// 🔹 Retorna o e-mail do usuário logado
export function getCurrentUser() {
  const email = localStorage.getItem('usuarioLogado');
  if (!email) return null;
  return { email };
}

// 🔹 Gera uma chave com base no usuário logado
export function getUserKey(base) {
  const usuario = getCurrentUser();
  return usuario ? `${base}_${usuario.email}` : base;
}
