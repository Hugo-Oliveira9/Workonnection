// experiencias.js
import { save, load, getUserKey } from './helpers.js';

// Garante que o objeto global window.editing exista
if (!window.editing) window.editing = {};

const btnEditarExperiencia = document.getElementById('btnEditarExperiencias');
const modalExperiencia = new bootstrap.Modal(document.getElementById('modalExperiencia'));
const titleExperiencia = document.getElementById('titleExperiencia');
const inputEmpresa = document.getElementById('inputEmpresa');
const inputCargo = document.getElementById('inputCargo');
const inputPeriodoExp = document.getElementById('inputPeriodoExp');
const inputDescricaoExp = document.getElementById('inputDescricao');
const btnSalvarExperiencia = document.getElementById('btnSalvarExperiencia');
const experienciasLista = document.getElementById('experiencias-lista');

window.editing.experienciaIndex = -1;

// Exporta a função para que o main.js possa chamá-la
export function renderExperiencias() {
  const arr = load(getUserKey('experiencias'), []);
  experienciasLista.innerHTML = '';

  if (!arr.length) {
    experienciasLista.innerHTML = `
      <div class="experiencia-item">
        <i class="fas fa-briefcase text-primary"></i>
        <div><b>Nenhuma experiência cadastrada</b></div>
      </div>
    `;
    return;
  }

  arr.forEach((e, idx) => {
    const div = document.createElement('div');
    div.className = 'experiencia-item d-flex justify-content-between align-items-center';
    div.innerHTML = `
      <div style="display:flex; gap:12px; align-items:center;">
        <i class="fas fa-briefcase text-primary"></i>
        <div>
          <b>${e.cargo}</b><br>
          <small>${e.empresa} • ${e.periodo}</small><br>
          <small>${e.descricao || ''}</small>
        </div>
      </div>
    `;

    // Cria os ícones de ação
    const actions = document.createElement('div');
    actions.className = 'small-actions';

    const editI = document.createElement('i');
    editI.className = 'fa-solid fa-pen text-primary';
    editI.title = 'Editar';
    editI.style.cursor = 'pointer';
    editI.addEventListener('click', () => {
      window.editing.experienciaIndex = idx;
      titleExperiencia.textContent = 'Editar Experiência';
      inputEmpresa.value = e.empresa;
      inputCargo.value = e.cargo;
      inputPeriodoExp.value = e.periodo;
      inputDescricaoExp.value = e.descricao || '';
      modalExperiencia.show();
    });

    const delI = document.createElement('i');
    delI.className = 'fa-solid fa-trash text-danger';
    delI.title = 'Excluir';
    delI.style.cursor = 'pointer';
    delI.addEventListener('click', () => {
      if (!confirm('Excluir essa experiência?')) return;
      arr.splice(idx, 1);
      save(getUserKey('experiencias'), arr);
      renderExperiencias();
    });

    actions.appendChild(editI);
    actions.appendChild(delI);
    div.appendChild(actions);
    experienciasLista.appendChild(div);
  });
}

// Botão para adicionar nova experiência
btnEditarExperiencia.addEventListener('click', () => {
  window.editing.experienciaIndex = -1;
  titleExperiencia.textContent = 'Adicionar Experiência';
  inputEmpresa.value = '';
  inputCargo.value = '';
  inputPeriodoExp.value = '';
  inputDescricaoExp.value = '';
  modalExperiencia.show();
});

// Botão salvar (criar ou editar)
btnSalvarExperiencia.addEventListener('click', () => {
  const empresa = inputEmpresa.value.trim();
  const cargo = inputCargo.value.trim();
  const periodo = inputPeriodoExp.value.trim();
  const descricao = inputDescricaoExp.value.trim();

  if (!empresa || !cargo || !periodo) return alert('Preencha todos os campos obrigatórios.');

  const arr = load(getUserKey('experiencias'), []);
  const obj = { empresa, cargo, periodo, descricao };

  if (window.editing.experienciaIndex >= 0) {
    arr[window.editing.experienciaIndex] = obj;
  } else {
    arr.push(obj);
  }

  save(getUserKey('experiencias'), arr);
  modalExperiencia.hide();
  renderExperiencias();
  window.editing.experienciaIndex = -1;
});

// Renderiza automaticamente ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  renderExperiencias();
});
