// Espera até que todo o conteúdo HTML da página seja carregado
document.addEventListener('DOMContentLoaded', () => {

  // Seleciona o formulário que está dentro da section com a classe "form-box"
  const form = document.querySelector('section.form-box form');

  // Se o formulário não for encontrado, interrompe o script
  if (!form) return;

  // Adiciona um ouvinte de evento para quando o formulário for enviado (submit)
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão (evita recarregar a página)

    // Captura os valores dos campos de dados pessoais, usando os IDs definidos no HTML
    const nome = document.getElementById('nomeDadosPessoais')?.value || '';
    const cpf = document.getElementById('cpfDadosPessoais')?.value || '';
    const dataNascimento = document.getElementById('dataNascimentoDadosPessoais')?.value || '';
    const telefone = document.getElementById('telefoneDadosPessoais')?.value || '';
    const email = document.getElementById('emailDadosPessoais')?.value || '';
    const senha = document.getElementById('senhaDadosPessoais')?.value || '';

    // Cria um objeto com os dados capturados, com os mesmos nomes usados nos IDs
    const dadosPessoais = {
      nomeDadosPessoais: nome,
      cpfDadosPessoais: cpf,
      dataNascimentoDadosPessoais: dataNascimento,
      telefoneDadosPessoais: telefone,
      emailDadosPessoais: email,
      senhaDadosPessoais: senha
    };

    // Salva o objeto no localStorage com a chave "cadastroDados", convertido para string JSON
    localStorage.setItem('cadastroDados', JSON.stringify(dadosPessoais));

    // Mostra mensagem de sucesso
    alert('Dados pessoais salvos com sucesso!');

    // Redireciona o usuário para a página inicial
    window.location.href = '/index.html';
  });
});
