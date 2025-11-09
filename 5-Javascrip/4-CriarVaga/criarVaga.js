// pegar elementos
const botaoNovaVaga = document.querySelector(".botao-publicar");
const modalVaga = new bootstrap.Modal(document.getElementById("modalVaga"));
const btnSalvarVaga = document.getElementById("btnSalvarVaga");

// inputs do modal
const inputEmpresa = document.getElementById("inputEmpresa");
const inputCargo = document.getElementById("inputCargo");
const inputDescricao = document.getElementById("inputDescricao");
const inputModalidade = document.getElementById("inputModalidade");
const inputHorario = document.getElementById("inputHorario");
const inputBeneficios = document.getElementById("inputBeneficios");
const inputLocalizacao = document.getElementById("inputLocalizacao");
const inputSalario = document.getElementById("inputSalario");
const inputData = document.getElementById("inputData");
const inputRequisitos = document.getElementById("inputRequisitos");
const inputEmail = document.getElementById("inputEmail");

const vagasContainer = document.getElementById("vagas-container");

// Pegar usuário logado
const usuarioLogado = localStorage.getItem("usuarioLogado") || "Guest";
const user = {
    username: usuarioLogado,
    profilePic: "/6-Imagens/FotosPerfis/default.png" // Ajuste se quiser usar a foto real
};

// Pegar vagas do localStorage
let vagas = JSON.parse(localStorage.getItem("vagas")) || [];

// Função para renderizar todas as vagas
function renderVagas() {
    // Limpa apenas vagas criadas dinamicamente
    vagasContainer.querySelectorAll(".vaga-card[data-created]").forEach(v => v.remove());

    // Renderiza todas as vagas
    vagas.forEach((vaga, index) => {
        const vagaDiv = document.createElement("div");
        vagaDiv.classList.add("vaga-card");
        vagaDiv.dataset.created = true;
        vagaDiv.dataset.index = index;
        vagaDiv.dataset.creator = vaga.creator;

        vagaDiv.innerHTML = `
            <div class="vaga-header" style="position: relative;">
                <img src="${user.profilePic}" alt="Logo Empresa">
                <div>
                    <h5>${vaga.empresa}</h5>
                    <small>${vaga.cargo}</small>
                </div>
                ${vaga.creator === user.username ? `
                <div class="dropdown" style="position: absolute; top: 10px; right: 10px;">
                    <button class="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" onclick="editarVaga(${index})">Editar</a></li>
                        <li><a class="dropdown-item" href="#" onclick="excluirVaga(${index})">Excluir</a></li>
                    </ul>
                </div>` : ''}
            </div>

            <div class="vaga-body">
                <p><b>Cargo:</b> ${vaga.cargo}</p>
                <p><b>Descrição:</b> ${vaga.descricao}</p>
                <p><b>Modalidade:</b> ${vaga.modalidade}</p>
                <p><b>Horário:</b> ${vaga.horario}</p>
                <p><b>Benefícios:</b> ${vaga.beneficios}</p>
                <p><b>Localização:</b> ${vaga.localizacao}</p>
                <p><b>Salário:</b> ${vaga.salario}</p>
                <p><b>Data de publicação:</b> ${vaga.data}</p>
                <p><b>Requisitos:</b> ${vaga.requisitos}</p>
                <p><b>Email de contato:</b> ${vaga.email}</p>
            </div>

            <div class="vaga-footer d-flex align-items-center gap-2">
                <button class="btn btn-success btn-sm" onclick="openWhatsApp('${vaga.empresa}', '${vaga.localizacao}')">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </button>
                <button class="btn btn-danger btn-sm" onclick="openChat('${vaga.empresa}')">
                    <i class="fas fa-comment"></i> Chat (FAQ)
                </button>

                <div class="d-flex flex-grow-1 align-items-center comment-wrapper">
                    <input type="text" class="form-control form-control-sm comment-input" placeholder="Comentar..." />
                    <button class="btn btn-comment-send" title="Enviar comentário">
                        <i class="fas fa-paper-plane" style="color:#47a4c4;"></i>
                    </button>
                </div>
            </div>
        `;

        vagasContainer.appendChild(vagaDiv);
    });
}

// Criar nova vaga
btnSalvarVaga.addEventListener("click", () => {
    const novaVaga = {
        empresa: inputEmpresa.value,
        cargo: inputCargo.value,
        descricao: inputDescricao.value,
        modalidade: inputModalidade.value,
        horario: inputHorario.value,
        beneficios: inputBeneficios.value,
        localizacao: inputLocalizacao.value,
        salario: inputSalario.value,
        data: inputData.value,
        requisitos: inputRequisitos.value,
        email: inputEmail.value,
        creator: user.username // garante que é o usuário logado
    };

    vagas.push(novaVaga);
    localStorage.setItem("vagas", JSON.stringify(vagas));

    renderVagas();
    modalVaga.hide();

    // limpar inputs
    inputEmpresa.value = "";
    inputCargo.value = "";
    inputDescricao.value = "";
    inputModalidade.value = "";
    inputHorario.value = "";
    inputBeneficios.value = "";
    inputLocalizacao.value = "";
    inputSalario.value = "";
    inputData.value = "";
    inputRequisitos.value = "";
    inputEmail.value = "";
});

// Funções editar/excluir
function excluirVaga(index) {
    const vaga = vagas[index];
    if (!vaga) return;
    if (vaga.creator === user.username) {
        vagas.splice(index, 1);
        localStorage.setItem("vagas", JSON.stringify(vagas));
        renderVagas();
    } else {
        alert("Você não pode excluir uma vaga de outro usuário!");
    }
}

function editarVaga(index) {
    const vaga = vagas[index];
    if (!vaga) return;
    if (vaga.creator === user.username) {
        inputEmpresa.value = vaga.empresa;
        inputCargo.value = vaga.cargo;
        inputDescricao.value = vaga.descricao;
        inputModalidade.value = vaga.modalidade;
        inputHorario.value = vaga.horario;
        inputBeneficios.value = vaga.beneficios;
        inputLocalizacao.value = vaga.localizacao;
        inputSalario.value = vaga.salario;
        inputData.value = vaga.data;
        inputRequisitos.value = vaga.requisitos;
        inputEmail.value = vaga.email;

        modalVaga.show();

        vagas.splice(index, 1);
        localStorage.setItem("vagas", JSON.stringify(vagas));
    } else {
        alert("Você não pode editar uma vaga de outro usuário!");
    }
}

// Renderizar ao carregar
renderVagas();

// Abrir modal nova vaga
botaoNovaVaga.addEventListener("click", () => modalVaga.show());
