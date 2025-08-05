// Quando a página terminar de carregar
document.addEventListener('DOMContentLoaded', () => {
  // Seleciona o formulário da página (assumindo que só tem um)
  const form = document.querySelector('form');

  // Adiciona o evento de submit ao formulário (quando o botão "Entrar" é clicado)
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário (evita recarregar a página)

    // Pega os valores dos campos de email e senha digitados pelo usuário
    const emailInput = document.getElementById('email')?.value.trim();
    const senhaInput = document.getElementById('senha')?.value;

    // Se email ou senha estiverem vazios, mostra alerta e cancela
    if (!emailInput || !senhaInput) {
      alert('Preencha email e senha.');
      return;
    }

    // Tenta pegar os dados salvos do cadastro no localStorage
    const stored = localStorage.getItem('cadastroDados');
    if (!stored) {
      alert('Nenhum usuário cadastrado. Faça o cadastro primeiro.');
      return;
    }

    let dados;
    try {
      // Converte os dados de texto JSON para objeto JavaScript
      dados = JSON.parse(stored);
    } catch {
      alert('Erro ao ler dados de cadastro. Limpe o localStorage e tente novamente.');
      return;
    }

    // Extrai o email e a senha cadastrados do objeto
    const emailCadastrado = dados.emailDadosPessoais || '';
    const senhaCadastrada = dados.senhaDadosPessoais || '';

    // Verifica se os dados digitados batem com os do cadastro
    if (emailInput === emailCadastrado && senhaInput === senhaCadastrada) {
      // Se baterem, salva os dados do usuário logado no localStorage
      localStorage.setItem('usuarioLogado', JSON.stringify({
        email: emailCadastrado,
        nome: dados.nomeDadosPessoais || ''
      }));

      // Redireciona para a página inicial do sistema
      window.location.href = '/3-Paginas/home.html';
    } else {
      // Se email ou senha estiverem errados
      alert('Email ou senha incorretos.');
    }
  });
});
