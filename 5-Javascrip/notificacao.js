function excluirNotificacao(elemento) {
    // Sobe até o card pai e remove
    const card = elemento.closest('.notificacao-card');
    if (card) {
        card.remove();
    }
}

function excluirNotificacao(elemento) {
    // Remove o card da notificação
    const card = elemento.closest(".notificacao-card");
    card.remove();

    // Verifica se ainda existem notificações
    const container = document.getElementById("notificacoes-container");
    const notificacoes = container.querySelectorAll(".notificacao-card");

    if (notificacoes.length === 0) {
        document.getElementById("sem-notificacoes").style.display = "block";
    }
}
