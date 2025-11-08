// helpers.js

// --- SALVAR E CARREGAR COM BASE NO USUÁRIO ---
export function save(key, data) {
  const userKey = getUserKey(key);
  localStorage.setItem(userKey, JSON.stringify(data));
}

export function load(key, defaultValue) {
  const userKey = getUserKey(key);
  const item = localStorage.getItem(userKey);
  return item ? JSON.parse(item) : defaultValue;
}

// --- IDENTIFICAR USUÁRIO ATUAL ---
export function getUserKey(key) {
  const user = getCurrentUser();
  if (!user || !user.email) return key;
  return `${key}_${user.email}`;
}

export function getCurrentUser() {
  const user = localStorage.getItem('usuarioLogado');
  try {
    return user ? JSON.parse(user) : null;
  } catch {
    // Corrige dados antigos (ex: "user1@teste")
    const obj = { email: user };
    localStorage.setItem('usuarioLogado', JSON.stringify(obj));
    return obj;
  }
}

export function setCurrentUser(userData) {
  localStorage.setItem('usuarioLogado', JSON.stringify(userData));
}

export function logout() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'login.html';
}

// --- CONFIRMAR EXCLUSÕES ---
export function confirmDelete(msg = 'Deseja realmente excluir?') {
  return confirm(msg);
}
