document.addEventListener('DOMContentLoaded', () => {
  const btnEditarCursos = document.getElementById('btnEditarCursos');
  const modalCursos = new bootstrap.Modal(document.getElementById('modalCursos'));

  // IDs corrigidos
  const inputNomeCurso = document.getElementById('inputNomeCurso');
  const inputInstituicaoCurso = document.getElementById('inputInstituicaoCurso');
  const inputPeriodoCurso = document.getElementById('inputPeriodoCurso');

  const listaTempCursos = document.getElementById('listaCursosTemp');
  const btnSalvarCurso = document.getElementById('btnSalvarCurso');
  const cursosDiv = document.getElementById('cursos-lista');

  let cursos = JSON.parse(localStorage.getItem('cursos')) || [];

  function atualizarCursos() {
    cursosDiv.innerHTML = '';
    if (cursos.length === 0) {
      cursosDiv.innerHTML = `
        <div class="experiencia-item">
          <i class="fas fa-book text-primary"></i>
          <div><b>Nenhum curso cadastrado</b></div>
        </div>`;
    } else {
      cursos.forEach((curso, index) => {
        const div = document.createElement('div');
        div.className = 'experiencia-item';
        div.innerHTML = `
          <i class="fas fa-book text-primary"></i>
          <div>
            <b>${curso.nome}</b><br>
            <span class="instituicao">${curso.instituicao}</span><br>
            <div class="detalhes">
              <span><i class="fas fa-calendar-alt text-info"></i> ${curso.periodo}</span>
            </div>
          </div>
          <span class="btn-excluir" style="cursor:pointer; color:red; font-weight:bold; margin-left:10px;">&times;</span>
        `;
        div.querySelector('.btn-excluir').addEventListener('click', () => {
          cursos.splice(index, 1);
          localStorage.setItem('cursos', JSON.stringify(cursos));
          atualizarCursos();
        });
        cursosDiv.appendChild(div);
      });
    }
  }

  btnEditarCursos.addEventListener('click', () => {
    listaTempCursos.innerHTML = '';
    cursos.forEach(curso => {
      const li = document.createElement('li');
      li.textContent = `${curso.nome} - ${curso.instituicao} (${curso.periodo})`;
      listaTempCursos.appendChild(li);
    });

    // Limpar campos
    inputNomeCurso.value = '';
    inputInstituicaoCurso.value = '';
    inputPeriodoCurso.value = '';

    modalCursos.show();
  });

  btnSalvarCurso.addEventListener('click', () => {
    const nome = inputNomeCurso.value.trim();
    const instituicao = inputInstituicaoCurso.value.trim();
    const periodo = inputPeriodoCurso.value.trim();

    if (!nome || !instituicao || !periodo) {
      alert('Preencha todos os campos antes de salvar!');
      return;
    }

    cursos.push({ nome, instituicao, periodo });
    localStorage.setItem('cursos', JSON.stringify(cursos));
    atualizarCursos();
    modalCursos.hide();
  });

  atualizarCursos();
});
