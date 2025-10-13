const textarea = document.getElementById('mensagemInput');
const chatBody = document.querySelector('.chat-body');
const enviarBtn = document.querySelector('.enviar-btn');

// Função para criar uma nova mensagem
function criarMensagem(texto, tipo = 'enviada') {
    const div = document.createElement('div');
    div.classList.add('mensagem', tipo);

    const p = document.createElement('p');
    if(tipo === 'enviada') {
        p.innerHTML = `<strong>Usuário:</strong> ${texto}`;
    } else {
        p.innerHTML = `<strong>Tech Solutiones:</strong> ${texto}`;
    }

    div.appendChild(p);

    if(tipo === 'enviada') {
        const statusSpan = document.createElement('span');
        statusSpan.classList.add('status-msg');
        statusSpan.innerText = 'Visualizado';
        div.appendChild(statusSpan);
    }

    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Evento do botão enviar
enviarBtn.addEventListener('click', () => {
    const texto = textarea.value.trim();
    if(texto === '') return;

    criarMensagem(texto, 'enviada');
    textarea.value = '';
    textarea.style.height = 'auto';

    // Simula resposta automática do "bot" depois de 1 segundo
    setTimeout(() => {
        criarMensagem('Recebido! Obrigado pela mensagem.', 'recebida');
    }, 1000);
});

// Ajuste automático da altura do textarea
textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

// Função para apagar todas as mensagens
function apagarMensagens() {
    chatBody.innerHTML = '';
}