// habilidades.js
import { save, load } from './helpers.js';

// Garante que o objeto global editing exista
if (!window.editing) window.editing = {};

const btnEditarHabilidades = document.getElementById('btnEditarHabilidades');
const modalHabilidade = new bootstrap.Modal(document.getElementById('modalHabilidade'));
const inputHabilidade = document.getElementById('inputHabilidade');
const btnSalvarHabilidade = document.getElementById('btnSalvarHabilidade');
const habilidadesLista = document.getElementById('habilidades-lista');

window.editing.habilidadeIndex = -1;

// Exporta a função para o main.js poder chamar também
export function renderHabilidades() {
  const arr = load('habilidades', []);
  habilidadesLista.innerHTML = '';

  if (arr.length === 0) {
    habilidadesLista.innerHTML =
      '<span class="badge bg-secondary">Clique no ícone para adicionar</span>';
    return;
  }

  arr.forEach((h, idx) => {
    const span = document.createElement('span');
    span.className = 'badge bg-primary m-1';
    span.style.display = 'inline-flex';
    span.style.alignItems = 'center';
    span.innerHTML = `${h} <i class="fa-solid fa-xmark ms-2" style="cursor:pointer;" title="Excluir"></i>`;

    span.querySelector('i').addEventListener('click', () => {
      if (!confirm('Excluir essa habilidade?')) return;
      arr.splice(idx, 1);
      save('habilidades', arr);
      renderHabilidades();
    });

    habilidadesLista.appendChild(span);
  });
}

// Ao clicar em editar, abre o modal
btnEditarHabilidades.addEventListener('click', () => {
  inputHabilidade.value = '';
  window.editing.habilidadeIndex = -1;
  modalHabilidade.show();
});

// Ao clicar em salvar, adiciona ou atualiza
btnSalvarHabilidade.addEventListener('click', () => {
  const val = inputHabilidade.value.trim();
  if (!val) return alert('Digite uma habilidade');

  const arr = load('habilidades', []);

  if (window.editing.habilidadeIndex >= 0) {
    arr[window.editing.habilidadeIndex] = val;
  } else {
    arr.push(val);
  }

  save('habilidades', arr);
  modalHabilidade.hide();
  renderHabilidades();
  window.editing.habilidadeIndex = -1;
});

// Garante que, ao carregar a página, as habilidades apareçam
document.addEventListener('DOMContentLoaded', () => {
  renderHabilidades();
});
