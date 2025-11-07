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

window.renderExperiencias = function() {
  const arr = load('experiencias', []);
  experienciasLista.innerHTML = '';
  if (!arr.length) {
    experienciasLista.innerHTML = '<div class="experiencia-item"><i class="fas fa-briefcase text-primary"></i><div><b>Nenhuma experiência cadastrada</b></div></div>';
    return;
  }

  arr.forEach((e, idx) => {
    const div = document.createElement('div');
    div.className = 'experiencia-item';
    div.style.justifyContent = 'space-between';
    div.innerHTML = `
      <div style="display:flex; gap:12px; align-items:center;">
        <i class="fas fa-briefcase text-primary"></i>
        <div>
          <b>${e.cargo}</b><br>
          <small>${e.empresa} • ${e.periodo}</small><br>
          <small>${e.descricao}</small>
        </div>
      </div>
    `;
    const actions = document.createElement('div');
    actions.className = 'small-actions';
    const editI = document.createElement('i');
    editI.className = 'fa-solid fa-pen text-primary';
    editI.title = 'Editar';
    editI.addEventListener('click', () => {
      window.editing.experienciaIndex = idx;
      titleExperiencia.textContent = 'Editar Experiência';
      inputEmpresa.value = e.empresa;
      inputCargo.value = e.cargo;
      inputPeriodoExp.value = e.periodo;
      inputDescricaoExp.value = e.descricao;
      modalExperiencia.show();
    });
    const delI = document.createElement('i');
    delI.className = 'fa-solid fa-trash text-danger';
    delI.title = 'Excluir';
    delI.addEventListener('click', () => {
      if (!confirmDelete('Excluir essa experiência?')) return;
      arr.splice(idx, 1);
      save('experiencias', arr);
      renderExperiencias();
    });
    actions.appendChild(editI);
    actions.appendChild(delI);
    div.appendChild(actions);
    experienciasLista.appendChild(div);
  });
};

btnEditarExperiencia.addEventListener('click', () => {
  window.editing.experienciaIndex = -1;
  titleExperiencia.textContent = 'Adicionar Experiência';
  inputEmpresa.value = '';
  inputCargo.value = '';
  inputPeriodoExp.value = '';
  inputDescricaoExp.value = '';
  modalExperiencia.show();
});

btnSalvarExperiencia.addEventListener('click', () => {
  const empresa = inputEmpresa.value.trim();
  const cargo = inputCargo.value.trim();
  const periodo = inputPeriodoExp.value.trim();
  const descricao = inputDescricaoExp.value.trim();
  if (!empresa || !cargo || !periodo) return alert('Preencha todos os campos obrigatórios');
  const arr = load('experiencias', []);
  const obj = { empresa, cargo, periodo, descricao };
  if (window.editing.experienciaIndex >= 0) {
    arr[window.editing.experienciaIndex] = obj;
  } else {
    arr.push(obj);
  }
  save('experiencias', arr);
  modalExperiencia.hide();
  renderExperiencias();
  window.editing.experienciaIndex = -1;
});
