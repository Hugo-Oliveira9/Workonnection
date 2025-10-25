document.addEventListener('DOMContentLoaded', () => {
  const btnEditarSobre = document.getElementById('btnEditarSobre');
  const btnSalvarSobre = document.getElementById('btnSalvarSobre');
  const inputSobre = document.getElementById('inputSobre');
  const sobreConteudo = document.getElementById('sobre-conteudo');

  // Carregar dados do localStorage
  const perfilDados = JSON.parse(localStorage.getItem('perfilDados')) || {};
  if (perfilDados.sobre) {
    sobreConteudo.textContent = perfilDados.sobre;
  }

  // Abrir modal
  btnEditarSobre.addEventListener('click', () => {
    inputSobre.value = perfilDados.sobre || '';
    const modal = new bootstrap.Modal(document.getElementById('editarSobreModal'));
    modal.show();
  });

  // Salvar dados
  btnSalvarSobre.addEventListener('click', () => {
    const texto = inputSobre.value.trim();
    perfilDados.sobre = texto;
    localStorage.setItem('perfilDados', JSON.stringify(perfilDados));
    sobreConteudo.textContent = texto || 'Clique no ícone de editar para adicionar suas informações.';
    const modalEl = document.getElementById('editarSobreModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  });
});
