import { key, save, load, confirmDelete } from './helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!window.editing) window.editing = {};

  const email = localStorage.getItem('usuarioLogado');
  if (!email) {
    alert('Nenhum usuário logado.');
    window.location.href = '/index.html';
    return;
  }

  // Renderiza tudo
  if (typeof carregarPerfil === 'function') carregarPerfil();
  if (typeof renderSobre === 'function') renderSobre();
  if (typeof renderHabilidades === 'function') renderHabilidades();
  if (typeof renderFormacoes === 'function') renderFormacoes();
  if (typeof renderExperiencias === 'function') renderExperiencias();
  if (typeof renderCursos === 'function') renderCursos();

  // Botão Resetar
  const btnResetar = document.getElementById('btnResetar');
  if (btnResetar) {
    btnResetar.addEventListener('click', () => {
      if (!confirm('Tem certeza que deseja reiniciar todo o perfil? Isso apagará os dados deste usuário.')) return;

      ['perfil', 'sobre', 'habilidades', 'formacoes', 'experiencias', 'cursos'].forEach(k => {
        localStorage.removeItem(key(k));
      });

      if (typeof carregarPerfil === 'function') carregarPerfil();
      if (typeof renderSobre === 'function') renderSobre();
      if (typeof renderHabilidades === 'function') renderHabilidades();
      if (typeof renderFormacoes === 'function') renderFormacoes();
      if (typeof renderExperiencias === 'function') renderExperiencias();
      if (typeof renderCursos === 'function') renderCursos();
    });
  }
});
