document.addEventListener('DOMContentLoaded', () => {
  const containerPerfis = document.getElementById('containerPerfis');
  if (!containerPerfis) return;

  containerPerfis.innerHTML = ''; // limpa qualquer conteúdo antigo

  const usuarioAtual = localStorage.getItem('usuarioLogado');

  // Percorre todas as chaves do localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    if (!chave.startsWith('cadastroDados_')) continue;

    const dados = JSON.parse(localStorage.getItem(chave));
    const email = dados.emailDadosPessoais;
    const nome = dados.nomeDadosPessoais || 'Usuário sem nome';
    const img = dados.fotoPerfil || 'https://via.placeholder.com/60x60.png?text=Perfil';

    const conectado = email === usuarioAtual;

    const div = document.createElement('div');
    div.className = 'perfil-item';
    div.innerHTML = `
      <img src="${img}" alt="${nome}">
      <div class="perfil-info">
        <strong>${nome}</strong>
        <p>${conectado ? 'Conectado agora' : 'Desconectado'}</p>
      </div>
      <button class="btn ${conectado ? 'btn-secondary' : 'btn-outline-primary'}">
        ${conectado ? 'Ativo' : 'Entrar'}
      </button>
    `;

    const btn = div.querySelector('button');
    if (!conectado) {
      btn.addEventListener('click', () => {
        localStorage.setItem('usuarioLogado', email);
        alert(`Você entrou como ${nome}`);
        location.reload();
      });
    }

    containerPerfis.appendChild(div);
  }
});
