// sobre.js
import { save, load } from './helpers.js';

if (!window.editing) window.editing = {};

const btnEditarSobre = document.getElementById('btnEditarSobre');
const modalSobre = new bootstrap.Modal(document.getElementById('editarSobreModal'));
const inputSobre = document.getElementById('inputSobre');
const btnSalvarSobre = document.getElementById('btnSalvarSobre');
const sobreConteudo = document.getElementById('sobre-conteudo');

// Função que renderiza o texto na tela
export function renderSobre() {
  const s = load('sobre', '');
  if (sobreConteudo) {
    sobreConteudo.textContent = s || 'Clique em editar para adicionar suas informações.';
  }
}

// Quando clicar em editar
btnEditarSobre.addEventListener('click', () => {
  inputSobre.value = load('sobre', '');
  modalSobre.show();
});

// Quando clicar em salvar
btnSalvarSobre.addEventListener('click', () => {
  const val = inputSobre.value.trim();
  save('sobre', val);
  renderSobre();
  modalSobre.hide();
});

// 👇 Garante que, quando o DOM estiver pronto, ele renderize corretamente
document.addEventListener('DOMContentLoaded', () => {
  renderSobre();
});
