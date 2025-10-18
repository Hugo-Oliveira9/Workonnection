// logout.js
const btnSair = document.getElementById('btnSair');

btnSair.addEventListener('click', () => {
  localStorage.removeItem('usuario'); // remove dados de login
  localStorage.removeItem('token');   // se houver token
  // localStorage.clear(); // opcional, se quiser limpar tudo

  window.location.href = '/index.html';
});
