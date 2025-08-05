// Para cada botão com a classe .user-btn (Empresa, ME, MEI, Estudante)
document.querySelectorAll('.user-btn').forEach((btn) => {
  
  // Adiciona um evento de clique em cada botão
  btn.addEventListener('click', () => {
    // Pega o seletor do box associado ao botão (ex: "#empresaBox")
    const targetSel = btn.getAttribute('data-target');

    // Seleciona a div correspondente com base no atributo data-target
    const box = document.querySelector(targetSel);

    // Verifica se o botão está marcado como "pressionado"
    const pressed = btn.getAttribute('aria-pressed') === 'true';

    // Inverte o valor de aria-pressed (serve para acessibilidade)
    btn.setAttribute('aria-pressed', String(!pressed));

    // Alterna a classe "is-open" na div do formulário (abre ou fecha)
    box.classList.toggle('is-open', !pressed);
  });

  // Permite ativar o botão com Enter ou Espaço (acessibilidade via teclado)
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.code === 'Space') {
      e.preventDefault(); // Evita que o botão envie o formulário
      btn.click(); // Simula o clique no botão
    }
  });
});

// Para cada caixa de usuário (empresaBox, meBox, etc.) que pode ser colapsada
document.querySelectorAll('.user-box.collapsible').forEach((box) => {

  // Verifica se algum input dentro da caixa possui valor preenchido
  const hasValue = [...box.querySelectorAll('input')].some(i => i.value && i.value.trim() !== '');

  if (hasValue) {
    // Se tiver pelo menos um valor, abre a caixa (classe "is-open")
    box.classList.add('is-open');

    // Encontra o botão correspondente à caixa, usando o ID da caixa
    const id = '#' + box.id;
    const btn = document.querySelector(`.user-btn[data-target="${id}"]`);

    // Marca o botão como "pressionado" visualmente e semanticamente
    if (btn) btn.setAttribute('aria-pressed', 'true');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const btnVoltar = document.querySelector('.btn-back');
  if (btnVoltar) {
    btnVoltar.addEventListener('click', () => {
      window.location.href = '/index.html';
    });
  }
});
