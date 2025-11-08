// salvaDados.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('section.form-box form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nomeDadosPessoais')?.value || '';
    const cpf = document.getElementById('cpfDadosPessoais')?.value || '';
    const dataNascimento = document.getElementById('dataNascimentoDadosPessoais')?.value || '';
    const telefone = document.getElementById('telefoneDadosPessoais')?.value || '';
    const email = document.getElementById('emailDadosPessoais')?.value || '';
    const senha = document.getElementById('senhaDadosPessoais')?.value || '';

    if (!email || !senha) {
      alert('Preencha o e-mail e a senha.');
      return;
    }

    // Cria o objeto de dados pessoais
    const dadosPessoais = {
      nomeDadosPessoais: nome,
      cpfDadosPessoais: cpf,
      dataNascimentoDadosPessoais: dataNascimento,
      telefoneDadosPessoais: telefone,
      emailDadosPessoais: email,
      senhaDadosPessoais: senha
    };

    // Chave única para cada usuário com base no e-mail
    const chaveUsuario = `cadastroDados_${email}`;

    // Salva no localStorage
    localStorage.setItem(chaveUsuario, JSON.stringify(dadosPessoais));

    alert('Dados pessoais salvos com sucesso!');
    window.location.href = '/index.html';
  });
});
