document.addEventListener('DOMContentLoaded', () => {
  // Recupera os dados do localStorage
  const usuario = JSON.parse(localStorage.getItem('cadastroDados')) || {};

  // PERFIL CARD
  document.getElementById('perfil-nome').textContent = usuario.nomeDadosPessoais || 'Nome:';
  document.getElementById('perfil-formacao').textContent = usuario.formacao || 'Formação:';
  document.getElementById('perfil-foto').src = usuario.foto || 'https://img.freepik.com/fotos-gratis/homem-de-negocios-de-vista-frontal-quer-apertar-as-maos_23-2148763831.jpg';

  // Campos de contato: adiciona <span> no HTML do perfil se ainda não existir
  const contatos = [
    { id: 'perfil-local', valor: usuario.local },
    { id: 'perfil-telefone', valor: usuario.telefoneDadosPessoais },
    { id: 'perfil-instagram', valor: usuario.instagram },
    { id: 'perfil-linkedin', valor: usuario.linkedin },
    { id: 'perfil-site', valor: usuario.site }
  ];

  contatos.forEach(contato => {
    const elemento = document.getElementById(contato.id);
    let span = elemento.querySelector('span');
    if (!span) {
      span = document.createElement('span');
      elemento.appendChild(span);
    }
    span.textContent = contato.valor || '';
  });

  // MODAL DE EDIÇÃO
  document.getElementById('inputNome').value = usuario.nomeDadosPessoais || '';
  document.getElementById('inputEmail').value = usuario.emailDadosPessoais || '';
  document.getElementById('inputLocal').value = usuario.local || '';
  document.getElementById('inputTelefone').value = usuario.telefoneDadosPessoais || '';
  document.getElementById('inputInstagram').value = usuario.instagram || '';
  document.getElementById('inputLinkedin').value = usuario.linkedin || '';
  document.getElementById('inputSite').value = usuario.site || '';
  document.getElementById('inputFoto').value = usuario.foto || '';

  // Botão SALVAR do modal
  document.getElementById('btnSalvarModal').addEventListener('click', () => {
    // Atualiza objeto usuário com os novos valores
    usuario.local = document.getElementById('inputLocal').value;
    usuario.telefoneDadosPessoais = document.getElementById('inputTelefone').value;
    usuario.instagram = document.getElementById('inputInstagram').value;
    usuario.linkedin = document.getElementById('inputLinkedin').value;
    usuario.site = document.getElementById('inputSite').value;
    usuario.foto = document.getElementById('inputFoto').value;

    // Salva no localStorage
    localStorage.setItem('cadastroDados', JSON.stringify(usuario));

    // Atualiza o perfil na tela sem precisar recarregar
    document.getElementById('perfil-foto').src = usuario.foto || 'https://img.freepik.com/fotos-gratis/homem-de-negocios-de-vista-frontal-quer-apertar-as-maos_23-2148763831.jpg';
    contatos.forEach(contato => {
      const elemento = document.getElementById(contato.id);
      elemento.querySelector('span').textContent = usuario[contato.id === 'perfil-telefone' ? 'telefoneDadosPessoais' : contato.id.replace('perfil-', '')] || '';
    });

    // Fecha o modal
    const modalEl = document.getElementById('editarPerfilModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  });

  // Abrir modal ao clicar no lápis
  document.getElementById('btnAbrirModal').addEventListener('click', () => {
    const modal = new bootstrap.Modal(document.getElementById('editarPerfilModal'));
    modal.show();
  });
});
