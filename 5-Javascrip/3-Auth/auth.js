// 5-Javascript/3-Auth/auth.js
document.addEventListener('DOMContentLoaded', () => {
    const usuarioAtual = localStorage.getItem('usuarioLogado');

    if (!usuarioAtual) {
        console.log('Nenhum usuário logado. Redirecionando para o login...');
        // Redireciona para a página de login
        window.location.href = '/index.html';
    } else {
        console.log(`Usuário logado: ${usuarioAtual}`);
        // Opcional: mostrar uma mensagem visual na página
        // alert(`Bem-vindo de volta, ${usuarioAtual}!`);
    }
});
