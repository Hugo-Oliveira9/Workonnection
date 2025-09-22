function thumbsUp(vagaId){
    alert("Você curtiu a vaga " + vagaId)
}

function thumbsDown(vagaId){
    alert("Você descurtiu a vaga " + vagaId)
}

function openWhatsApp(empresa, localizacao){
    const mensagem = `Olá, gostaria de saber mais sobre a vaga da empresa ${empresa} localizada em ${localizacao}.`
    window.open(`https://wa.me/?text=${encodeURIComponent(mensagem)}`, '_blank')
}

function openChat(empresa) {
    alert(`Abrindo chat (FAQ) para ${empresa}.`);
}

function aplicarFiltros() {
            const checkboxes = document.querySelectorAll('.dropdown-menu input[type="checkbox"]:checked');
            const filtrosSelecionados = Array.from(checkboxes).map(checkbox => checkbox.getAttribute('data-filter'));

            console.log("Filtros selecionados:", filtrosSelecionados);

            const vagas = document.querySelectorAll('.vaga-card');
            vagas.forEach(vaga => {
                const modalidade = vaga.querySelector('.vaga-body p').textContent.includes('Remoto') ? 'remoto' :
                                   vaga.querySelector('.vaga-body p').textContent.includes('Presencial') ? 'presencial' :
                                   vaga.querySelector('.vaga-body p').textContent.includes('Híbrido') ? 'hibrido' : '';

                const localizacao = vaga.querySelector('.vaga-body p').textContent.includes('São Paulo') ? 'sp' :
                                    vaga.querySelector('.vaga-body p').textContent.includes('Curitiba') ? 'pr' : '';

                const cargo = vaga.querySelector('.vaga-body p').textContent.includes('Designer') ? 'design' :
                              vaga.querySelector('.vaga-body p').textContent.includes('Desenvolvimento') ? 'desenvolvimento' : '';

                // Exibir ou esconder a vaga com base nos filtros selecionados
                if (filtrosSelecionados.every(filtro => [modalidade, localizacao, cargo].includes(filtro))) {
                    vaga.style.display = 'block';  // Mostrar a vaga
                } else {
                    vaga.style.display = 'none';  // Esconder a vaga
                }
            });
        }


