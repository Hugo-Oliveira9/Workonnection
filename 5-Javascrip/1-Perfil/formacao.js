document.addEventListener('DOMContentLoaded', () => {
  const btnEditar = document.getElementById('btnEditarFormacao');
  const modal = new bootstrap.Modal(document.getElementById('modalFormacao'));
  const inputUniv = document.getElementById('inputUniversidade');
  const inputCurso = document.getElementById('inputCurso');
  const inputPeriodo = document.getElementById('inputPeriodo');
  const listaTemp = document.getElementById('listaFormacoesTemp');
  const btnSalvar = document.getElementById('btnSalvarFormacao');
  const formacoesDiv = document.getElementById('formacoes-lista');

  let formacoes = JSON.parse(localStorage.getItem('formacoes')) || [];

  function atualizarFormacoes() {
    formacoesDiv.innerHTML = '';
    if (formacoes.length === 0) {
      formacoesDiv.innerHTML = '<div class="formacao-item"><i class="fas fa-university text-primary"></i><div><b>Nenhuma formação cadastrada</b></div></div>';
    } else {
      formacoes.forEach((f, index) => {
        const div = document.createElement('div');
        div.className = 'formacao-item';
        div.innerHTML = `
          <i class="fas fa-university text-primary"></i>
          <div>
            <b>${f.universidade}</b><br>
            ${f.curso}<br>
            <small>${f.periodo}</small>
          </div>
          <span style="cursor:pointer; color:red; margin-left:10px;">&times;</span>
        `;
        div.querySelector('span').addEventListener('click', () => {
          formacoes.splice(index, 1);
          localStorage.setItem('formacoes', JSON.stringify(formacoes));
          atualizarFormacoes();
        });
        formacoesDiv.appendChild(div);
      });
    }
  }

  btnEditar.addEventListener('click', () => {
    listaTemp.innerHTML = '';
    formacoes.forEach(f => {
      const li = document.createElement('li');
      li.textContent = `${f.universidade} - ${f.curso} (${f.periodo})`;
      listaTemp.appendChild(li);
    });
    inputUniv.value = '';
    inputCurso.value = '';
    inputPeriodo.value = '';
    modal.show();
  });

  btnSalvar.addEventListener('click', () => {
    const univ = inputUniv.value.trim();
    const curso = inputCurso.value.trim();
    const periodo = inputPeriodo.value.trim();
    if (univ && curso && periodo) {
      formacoes.push({ universidade: univ, curso: curso, periodo: periodo });
      localStorage.setItem('formacoes', JSON.stringify(formacoes));
      atualizarFormacoes();
      modal.hide();
    } else {
      alert('Preencha todos os campos antes de salvar!');
    }
  });

  atualizarFormacoes();
});
