const btnEditarSobre = document.getElementById('btnEditarSobre');
const modalSobre = new bootstrap.Modal(document.getElementById('editarSobreModal'));
const inputSobre = document.getElementById('inputSobre');
const btnSalvarSobre = document.getElementById('btnSalvarSobre');
const sobreConteudo = document.getElementById('sobre-conteudo');

function renderSobre() {
  const s = load('sobre', '');
  sobreConteudo.textContent = s || 'Clique em editar para adicionar suas informações.';
}

btnEditarSobre.addEventListener('click', () => {
  inputSobre.value = load('sobre', '');
  modalSobre.show();
});

btnSalvarSobre.addEventListener('click', () => {
  const val = inputSobre.value.trim();
  save('sobre', val);
  renderSobre();
  modalSobre.hide();
});
