// cursos.js
import { save, load } from './helpers.js';

// Garante que o objeto global window.editing exista
if (!window.editing) window.editing = {};

const btnEditarCurso = document.getElementById('btnEditarCursos');
const modalCurso = new bootstrap.Modal(document.getElementById('modalCurso'));
const titleCurso = document.getElementById('titleCurso');
const inputCursoNome = document.getElementById('inputNomeCurso');
const inputCursoInstituicao = document.getElementById('inputInstituicaoCurso');
const inputCursoPeriodo = document.getElementById('inputPeriodoCurso');
const btnSalvarCurso = document.getElementById('btnSalvarCurso');
const cursosLista = document.getElementById('cursos-lista');

window.editing.cursoIndex = -1;

// Exporta a função para ser usada no main.js
export function renderCursos() {
  const arr = load('cursos', []);
  cursosLista.innerHTML = '';

  if (!arr.length) {
    cursosLista.innerHTML = `
      <div class="curso-item">
        <i class="fas fa-book text-primary"></i>
        <div><b>Nenhum curso cadastrado</b></div>
      </div>
    `;
    return;
  }

  arr.forEach((c, idx) => {
    const div = document.createElement('div');
    div.className = 'curso-item d-flex justify-content-between align-items-center';
    div.innerHTML = `
      <div style="display:flex; gap:12px; align-items:center;">
        <i class="fas fa-graduation-cap text-primary"></i>
        <div>
          <b>${c.nome}</b><br>
          <small>${c.instituicao} • ${c.periodo}</small>
        </div>
      </div>
    `;

    // Ações (editar/excluir)
    const actions = document.createElement('div');
    actions.className = 'small-actions';

    const editI = document.createElement('i');
    editI.className = 'fa-solid fa-pen text-primary';
    editI.title = 'Editar';
    editI.style.cursor = 'pointer';
    editI.addEventListener('click', () => {
      window.editing.cursoIndex = idx;
      titleCurso.textContent = 'Editar Curso';
      inputCursoNome.value = c.nome;
      inputCursoInstituicao.value = c.instituicao;
      inputCursoPeriodo.value = c.periodo;
      modalCurso.show();
    });

    const delI = document.createElement('i');
    delI.className = 'fa-solid fa-trash text-danger';
    delI.title = 'Excluir';
    delI.style.cursor = 'pointer';
    delI.addEventListener('click', () => {
      if (!confirm('Excluir esse curso?')) return;
      arr.splice(idx, 1);
      save('cursos', arr);
      renderCursos();
    });

    actions.appendChild(editI);
    actions.appendChild(delI);
    div.appendChild(actions);
    cursosLista.appendChild(div);
  });
}

// Adicionar novo curso
btnEditarCurso.addEventListener('click', () => {
  window.editing.cursoIndex = -1;
  titleCurso.textContent = 'Adicionar Curso';
  inputCursoNome.value = '';
  inputCursoInstituicao.value = '';
  inputCursoPeriodo.value = '';
  modalCurso.show();
});

// Salvar curso (novo ou editado)
btnSalvarCurso.addEventListener('click', () => {
  const nome = inputCursoNome.value.trim();
  const instituicao = inputCursoInstituicao.value.trim();
  const periodo = inputCursoPeriodo.value.trim();

  if (!nome || !instituicao || !periodo) return alert('Preencha todos os campos obrigatórios.');

  const arr = load('cursos', []);
  const obj = { nome, instituicao, periodo };

  if (window.editing.cursoIndex >= 0) {
    arr[window.editing.cursoIndex] = obj;
  } else {
    arr.push(obj);
  }

  save('cursos', arr);
  modalCurso.hide();
  renderCursos();
  window.editing.cursoIndex = -1;
});

// Renderiza automaticamente ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  renderCursos();
});
