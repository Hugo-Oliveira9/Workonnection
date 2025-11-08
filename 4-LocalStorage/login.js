// login.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('email')?.value.trim();
    const senhaInput = document.getElementById('senha')?.value;

    if (!emailInput || !senhaInput) {
      alert('Preencha email e senha.');
      return;
    }

    const chaveUsuario = `cadastroDados_${emailInput}`;
    const stored = localStorage.getItem(chaveUsuario);

    if (!stored) {
      alert('Nenhum usuário encontrado com esse email. Faça o cadastro primeiro.');
      return;
    }

    let dados;
    try {
      dados = JSON.parse(stored);
    } catch {
      alert('Erro ao ler os dados do cadastro.');
      return;
    }

    const senhaCadastrada = dados.senhaDadosPessoais || '';

    if (senhaInput === senhaCadastrada) {
      localStorage.setItem('usuarioLogado', emailInput);
      alert(`Bem-vindo(a), ${dados.nomeDadosPessoais || 'usuário'}!`);
      window.location.href = '/3-Paginas/PaginasGlobal/home.html';
    } else {
      alert('Senha incorreta.');
    }
  });
});
