
  document.addEventListener("DOMContentLoaded", () => {
    const sobreTab = document.getElementById("sobre-tab");
    const vagasTab = document.getElementById("vagas-tab");
    const experienciasCard = document.querySelector(".experiencias-card");

    // Quando clicar na aba "Vagas"
    vagasTab.addEventListener("click", () => {
      experienciasCard.style.display = "none"; // esconde a parte de experiências e cursos
    });

    // Quando clicar na aba "Sobre"
    sobreTab.addEventListener("click", () => {
      experienciasCard.style.display = "block"; // mostra novamente as experiências
    });
  });