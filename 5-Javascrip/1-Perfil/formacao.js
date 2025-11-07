const btnEditarFormacao = document.getElementById('btnEditarFormacao');
const modalFormacao = new bootstrap.Modal(document.getElementById('modalFormacao'));
const titleFormacao = document.getElementById('titleFormacao');
const inputUniversidade = document.getElementById('inputUniversidade');
const inputCurso = document.getElementById('inputCurso');
const inputPeriodo = document.getElementById('inputPeriodo');
const btnSalvarFormacao = document.getElementById('btnSalvarFormacao');
const formacoesLista = document.getElementById('formacoes-lista');

window.editing.formacaoIndex = -1;

window.renderFormacoes = function() {
  const arr = load('formacoes', []);
  formacoesLista.innerHTML = '';
  if (!arr.length) {
    formacoesLista.innerHTML = '<div class="formacao-item"><i class="fas fa-university text-primary"></i><div><b>Nenhuma formação cadastrada</b></div></div>';
    return;
  }

  arr.forEach((f, idx) => {
    const div = document.createElement('div');
    div.className = 'experiencia-item';
    div.style.justifyContent = 'space-between';
    div.innerHTML = `
      <div style="display:flex; gap:12px; align-items:center;">
        <i class="fas fa-university text-primary"></i>
        <div>
          <b>${f.curso}</b><br>
          <small>${f.universidade} • ${f.periodo}</small>
        </div>
      </div>
    `;
    const actions = document.createElement('div');
    actions.className = 'small-actions';
    const editI = document.createElement('i');
    editI.className = 'fa-solid fa-pen text-primary';
    editI.title = 'Editar';
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
    delI.addEventListener('click', () => {
      if (!confirmDelete('Excluir essa formação?')) return;
      arr.splice(idx, 1);
      save('formacoes', arr);
      renderFormacoes();
    });
    actions.appendChild(editI);
    actions.appendChild(delI);
    div.appendChild(actions);
    formacoesLista.appendChild(div);
  });
};

btnEditarFormacao.addEventListener('click', () => {
  window.editing.formacaoIndex = -1;
  titleFormacao.textContent = 'Adicionar Formação';
  inputUniversidade.value = '';
  inputCurso.value = '';
  inputPeriodo.value = '';
  modalFormacao.show();
});

btnSalvarFormacao.addEventListener('click', () => {
  const uni = inputUniversidade.value.trim();
  const curso = inputCurso.value.trim();
  const per = inputPeriodo.value.trim();
  if (!uni || !curso || !per) return alert('Preencha todos os campos');
  const arr = load('formacoes', []);
  const obj = { universidade: uni, curso, periodo: per };
  if (window.editing.formacaoIndex >= 0) {
    arr[window.editing.formacaoIndex] = obj;
  } else {
    arr.push(obj);
  }
  save('formacoes', arr);
  modalFormacao.hide();
  renderFormacoes();
  window.editing.formacaoIndex = -1;
});
