// logout.js
document.addEventListener('DOMContentLoaded', () => {
  const btnSair = document.getElementById('btnSair');
  if (!btnSair) return;
  btnSair.addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado'); // chave correta
    window.location.href = '/index.html';
  });
});
