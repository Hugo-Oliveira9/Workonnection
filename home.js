const contas = [
      { email: "joao@email.com", senha: "123456", nome: "João" },
      { email: "maria@email.com", senha: "654321", nome: "Maria" }
    ];

    function loginUsuario() {
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      const conta = contas.find(c => c.email === email && c.senha === senha);

      if (conta) {
        localStorage.setItem("usuario", conta.nome);
        localStorage.setItem("logado", "true");
        alert("Bem-vindo(a), " + conta.nome + "!");
        window.location.href = "home.html";
      } else {
        alert("Email ou senha incorretos.");
      }

      return false;
    }

window.onload = function () {
  const usuario = localStorage.getItem("usuario");
  const logado = localStorage.getItem("logado");


}

function logout() {
    sessionStorage.clear();
    localStorage.clear();
    alert("Você saiu da conta!");
    window.location.href = "login.html";
}