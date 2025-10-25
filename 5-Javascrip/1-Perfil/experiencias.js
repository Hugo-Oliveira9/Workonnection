document.addEventListener('DOMContentLoaded', () => {
  const btnEditarExp = document.getElementById('btnEditarExperiencias');
  const modalExp = new bootstrap.Modal(document.getElementById('modalExperiencias'));
  const inputEmpresa = document.getElementById('inputEmpresa');
  const inputCargo = document.getElementById('inputCargo');
  const inputDescricao = document.getElementById('inputDescricao');
  const inputLocalExp = document.getElementById('inputLocalExp');
  const inputPeriodoExp = document.getElementById('inputPeriodoExp');
  const listaTempExp = document.getElementById('listaExperienciasTemp');
  const btnSalvarExp = document.getElementById('btnSalvarExperiencia');
  const experienciasDiv = document.getElementById('experiencias-lista');

  let experiencias = JSON.parse(localStorage.getItem('experiencias')) || [];

  function atualizarExperiencias() {
    experienciasDiv.innerHTML = '';
    if (experiencias.length === 0) {
      experienciasDiv.innerHTML = '<div class="experiencia-item"><i class="fas fa-building text-primary"></i><div><b>Nenhuma experiência cadastrada</b></div></div>';
    } else {
      experiencias.forEach((exp, index) => {
        const div = document.createElement('div');
        div.className = 'experiencia-item';
        div.innerHTML = `
          <i class="fas fa-building text-primary"></i>
          <div>
            <b>${exp.empresa}</b><br>
            <span class="cargo">${exp.cargo}</span><br>
            <p>${exp.descricao}</p>
            <div class="detalhes">
              <span><i class="fas fa-map-marker-alt text-success"></i> ${exp.local}</span>
              <span><i class="fas fa-calendar-alt text-info"></i> ${exp.periodo}</span>
            </div>
          </div>
          <span style="cursor:pointer; color:red; margin-left:10px;">&times;</span>
        `;
        div.querySelector('span').addEventListener('click', () => {
          experiencias.splice(index, 1);
          localStorage.setItem('experiencias', JSON.stringify(experiencias));
          atualizarExperiencias();
        });
        experienciasDiv.appendChild(div);
      });
    }
  }

  btnEditarExp.addEventListener('click', () => {
    listaTempExp.innerHTML = '';
    experiencias.forEach(exp => {
      const li = document.createElement('li');
      li.textContent = `${exp.empresa} - ${exp.cargo} (${exp.periodo})`;
      listaTempExp.appendChild(li);
    });
    inputEmpresa.value = '';
    inputCargo.value = '';
    inputDescricao.value = '';
    inputLocalExp.value = '';
    inputPeriodoExp.value = '';
    modalExp.show();
  });

  btnSalvarExp.addEventListener('click', () => {
    const empresa = inputEmpresa.value.trim();
    const cargo = inputCargo.value.trim();
    const descricao = inputDescricao.value.trim();
    const local = inputLocalExp.value.trim();
    const periodo = inputPeriodoExp.value.trim();
    if (empresa && cargo && descricao && local && periodo) {
      experiencias.push({ empresa, cargo, descricao, local, periodo });
      localStorage.setItem('experiencias', JSON.stringify(experiencias));
      atualizarExperiencias();
      modalExp.hide();
    } else {
      alert('Preencha todos os campos antes de salvar!');
    }
  });

  atualizarExperiencias();
});
