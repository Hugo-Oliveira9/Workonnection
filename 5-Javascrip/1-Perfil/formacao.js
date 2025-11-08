// formacao.js
import { save, load, getUserKey } from './helpers.js';

// Garante que o objeto global editing exista
if (!window.editing) window.editing = {};

const btnEditarFormacao = document.getElementById('btnEditarFormacao');
const modalFormacao = new bootstrap.Modal(document.getElementById('modalFormacao'));
const titleFormacao = document.getElementById('titleFormacao');
const inputUniversidade = document.getElementById('inputUniversidade');
const inputCurso = document.getElementById('inputCurso');
const inputPeriodo = document.getElementById('inputPeriodo');
const btnSalvarFormacao = document.getElementById('btnSalvarFormacao');
const formacoesLista = document.getElementById('formacoes-lista');

window.editing.formacaoIndex = -1;

// Função exportada para renderizar formações
export function renderFormacoes() {
  const arr = load(getUserKey('formacoes'), []);
  formacoesLista.innerHTML = '';

  if (!arr.length) {
    formacoesLista.innerHTML = `
      <div class="formacao-item">
        <i class="fas fa-university text-primary"></i>
        <div><b>Nenhuma formação cadastrada</b></div>
      </div>
    `;
    return;
  }

  arr.forEach((f, idx) => {
    const div = document.createElement('div');
    div.className = 'experiencia-item d-flex justify-content-between align-items-center';
    div.innerHTML = `
      <div style="display:flex; gap:12px; align-items:center;">
        <i class="fas fa-university text-primary"></i>
        <div>
          <b>${f.curso}</b><br>
          <small>${f.universidade} • ${f.periodo}</small>
        </div>
      </div>
    `;

    // Cria botões de ação (editar / excluir)
    const actions = document.createElement('div');
    actions.className = 'small-actions';

    const editI = document.createElement('i');
    editI.className = 'fa-solid fa-pen text-primary';
    editI.title = 'Editar';
    editI.style.cursor = 'pointer';
    editI.addEventListener('click', () => {
      window.editing.formacaoIndex = idx;
      titleFormacao.textContent = 'Editar Formação';
      inputUniversidade.value = f.universidade;
      inputCurso.value = f.curso;
      inputPeriodo.value = f.periodo;
      modalFormacao.show();
    });

    const delI = document.createElement('i');
    delI.className = 'fa-solid fa-trash text-danger';
    delI.title = 'Excluir';
    delI.style.cursor = 'pointer';
    delI.addEventListener('click', () => {
      if (!confirm('Excluir essa formação?')) return;
      arr.splice(idx, 1);
      save(getUserKey('formacoes'), arr);
      renderFormacoes();
    });

    actions.appendChild(editI);
    actions.appendChild(delI);
    div.appendChild(actions);
    formacoesLista.appendChild(div);
  });
}

// Botão para adicionar nova formação
btnEditarFormacao.addEventListener('click', () => {
  window.editing.formacaoIndex = -1;
  titleFormacao.textContent = 'Adicionar Formação';
  inputUniversidade.value = '';
  inputCurso.value = '';
  inputPeriodo.value = '';
  modalFormacao.show();
});

// Botão para salvar (adicionar/editar)
btnSalvarFormacao.addEventListener('click', () => {
  const uni = inputUniversidade.value.trim();
  const curso = inputCurso.value.trim();
  const per = inputPeriodo.value.trim();

  if (!uni || !curso || !per) return alert('Preencha todos os campos.');

  const arr = load(getUserKey('formacoes'), []);
  const obj = { universidade: uni, curso, periodo: per };

  if (window.editing.formacaoIndex >= 0) {
    arr[window.editing.formacaoIndex] = obj;
  } else {
    arr.push(obj);
  }

  save(getUserKey('formacoes'), arr);
  modalFormacao.hide();
  renderFormacoes();
  window.editing.formacaoIndex = -1;
});

// Renderiza automaticamente ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  renderFormacoes();
});
