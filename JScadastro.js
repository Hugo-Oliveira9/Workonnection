
function showBox(boxId) {
  const selectedBox = document.getElementById(boxId);
  if (!selectedBox) return;

  const isHidden = selectedBox.classList.contains('hidden');

 
  if (isHidden) {
    const allBoxes = document.querySelectorAll('.user-box');
    allBoxes.forEach(box => box.classList.add('hidden'));

    selectedBox.classList.remove('hidden');
  } else {

    selectedBox.classList.add('hidden');
  }
}


function showBox(boxId) {
    document.querySelectorAll('.user-box').forEach(box => box.classList.add('hidden'));
    document.getElementById(boxId).classList.remove('hidden');
}


document.addEventListener("DOMContentLoaded", function () {
    const btnCadastrar = document.querySelector(".btn-submit");

    btnCadastrar.addEventListener("click", function () {
        const dados = {
            nome: document.querySelector('input[placeholder="Digite seu nome"]').value,
            cpf: document.querySelector('input[placeholder="000.000.000-00"]').value,
            dataNascimento: document.querySelector('input[type="date"]').value,
            telefone: document.querySelectorAll('input[placeholder="(099999999)"], input[placeholder="(99)9999999"]')[0]?.value || '',
            email: document.querySelector('input[type="email"]').value,
            senha: document.querySelector('input[type="password"]').value,
        };

        const tipos = ['empresaBox', 'meBox', 'meiBox', 'estudanteBox'];
        for (let tipo of tipos) {
            const box = document.getElementById(tipo);
            if (!box.classList.contains('hidden')) {
                dados.tipoUsuario = tipo;

                const camposEspecificos = {};
                box.querySelectorAll('input').forEach(input => {
                    const label = input.previousElementSibling?.innerText || "campo";
                    camposEspecificos[label] = input.value;
                });

                dados.dadosEspecificos = camposEspecificos;
                break;
            }
        }

  
        localStorage.setItem("dadosCadastro", JSON.stringify(dados));
        alert("Dados salvos no localStorage!");


        window.location.href = "home.html";
    });
});
