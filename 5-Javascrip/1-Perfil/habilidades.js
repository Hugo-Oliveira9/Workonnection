document.addEventListener('DOMContentLoaded', () => {
  const btnEditar = document.getElementById('btnEditarHabilidades');
  const modal = new bootstrap.Modal(document.getElementById('modalHabilidades'));
  const inputHabilidade = document.getElementById('inputHabilidade');
  const listaTemp = document.getElementById('listaHabilidadesTemp');
  const btnSalvar = document.getElementById('btnSalvarHabilidades');
  const listaHabilidadesDiv = document.getElementById('habilidades-lista');

  let habilidades = JSON.parse(localStorage.getItem('habilidades')) || [];

  function atualizarLista() {
    listaHabilidadesDiv.innerHTML = '';
    if (habilidades.length === 0) {
      listaHabilidadesDiv.innerHTML = '<span class="badge bg-secondary">Clique no ícone para adicionar</span>';
    } else {
      habilidades.forEach((h, index) => {
        const span = document.createElement('span');
        span.className = 'badge bg-primary me-1 mb-1';
        span.style.cursor = 'pointer';
        span.innerHTML = `${h} <span style="margin-left:4px; font-weight:bold;">&times;</span>`;
        // Excluir ao clicar no X
        span.querySelector('span').addEventListener('click', (e) => {
          e.stopPropagation(); // evita outros cliques
          habilidades.splice(index, 1);
          localStorage.setItem('habilidades', JSON.stringify(habilidades));
          atualizarLista();
        });
        listaHabilidadesDiv.appendChild(span);
      });
    }
  }

  btnEditar.addEventListener('click', () => {
    listaTemp.innerHTML = '';
    habilidades.forEach(h => {
      const li = document.createElement('li');
      li.textContent = h;
      listaTemp.appendChild(li);
    });
    inputHabilidade.value = '';
    modal.show();
  });

  btnSalvar.addEventListener('click', () => {
    const nova = inputHabilidade.value.trim();
    if (nova) habilidades.push(nova);
    localStorage.setItem('habilidades', JSON.stringify(habilidades));
    atualizarLista();
    modal.hide();
  });

  atualizarLista();
});
