// helpers
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const load = (k, dv) => {
  const s = localStorage.getItem(k);
  return s ? JSON.parse(s) : dv;
};
const confirmDelete = (message) => confirm(message);

// inicializa tudo após DOM carregado
document.addEventListener('DOMContentLoaded', () => {
  // Cria objeto global editing caso não exista
  if (!window.editing) window.editing = {};

  // Carrega perfil e renderiza todas as seções
  if (typeof carregarPerfil === 'function') carregarPerfil();
  if (typeof renderSobre === 'function') renderSobre();
  if (typeof renderHabilidades === 'function') renderHabilidades();
  if (typeof renderFormacoes === 'function') renderFormacoes();
  if (typeof renderExperiencias === 'function') renderExperiencias();
  if (typeof renderCursos === 'function') renderCursos();

  // Resetar todos os dados
  const btnResetar = document.getElementById('btnResetar');
  if (btnResetar) {
    btnResetar.addEventListener('click', () => {
      if (!confirm('Tem certeza que deseja reiniciar todo o perfil? Isso apagará os dados salvos localmente.')) return;

      // Remove itens do localStorage
      ['perfil', 'sobre', 'habilidades', 'formacoes', 'experiencias', 'cursos'].forEach(k => localStorage.removeItem(k));

      // Re-render de todas as seções
      if (typeof carregarPerfil === 'function') carregarPerfil();
      if (typeof renderSobre === 'function') renderSobre();
      if (typeof renderHabilidades === 'function') renderHabilidades();
      if (typeof renderFormacoes === 'function') renderFormacoes();
      if (typeof renderExperiencias === 'function') renderExperiencias();
      if (typeof renderCursos === 'function') renderCursos();
    });
  }
});
