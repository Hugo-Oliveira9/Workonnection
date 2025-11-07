const fotoEl = document.getElementById('perfil-foto');
const nomeEl = document.getElementById('perfil-nome');
const formacaoSmall = document.getElementById('perfil-formacao');
const btnAbrirModal = document.getElementById('btnAbrirModal');

const modalPerfil = new bootstrap.Modal(document.getElementById('editarPerfilModal'));
const inputNome = document.getElementById('inputNome');
const inputEmail = document.getElementById('inputEmail');
const inputLocal = document.getElementById('inputLocal');
const inputTelefone = document.getElementById('inputTelefone');
const inputInstagram = document.getElementById('inputInstagram');
const inputLinkedin = document.getElementById('inputLinkedin');
const inputSite = document.getElementById('inputSite');
const inputFoto = document.getElementById('inputFoto');
const btnSalvarPerfil = document.getElementById('btnSalvarPerfil');

function carregarPerfil() {
  const perfil = load('perfil', {
    nome: 'Seu Nome',
    email: '',
    local: '',
    telefone: '',
    instagram: '',
    linkedin: '',
    site: '',
    foto: 'https://img.freepik.com/fotos-gratis/homem-de-negocios-de-vista-frontal-quer-apertar-as-maos_23-2148763831.jpg'
  });

  nomeEl.textContent = perfil.nome || 'Nome:';

  const formacoes = load('formacoes', []);
  if (formacoes.length) {
    formacaoSmall.textContent = formacoes[formacoes.length - 1].curso + ' - ' + formacoes[formacoes.length - 1].universidade;
  } else {
    formacaoSmall.textContent = perfil.email ? perfil.email : 'Formação:';
  }

  fotoEl.src = perfil.foto || '';

  // contatos
  document.getElementById('perfil-local').innerHTML = '<i class="fas fa-map-marker-alt text-primary"></i> ' + (perfil.local || 'Local:');
  document.getElementById('perfil-telefone').innerHTML = '<i class="fas fa-phone text-success"></i> ' + (perfil.telefone || 'Telefone:');
  document.getElementById('perfil-instagram').innerHTML = '<i class="fab fa-instagram text-danger"></i> ' + (perfil.instagram || 'Instagram:');
  document.getElementById('perfil-linkedin').innerHTML = '<i class="fab fa-linkedin text-primary"></i> ' + (perfil.linkedin || 'LinkedIn:');
  document.getElementById('perfil-site').innerHTML = '<i class="fas fa-globe text-info"></i> ' + (perfil.site || 'Site:');
}

// abrir modal perfil
btnAbrirModal.addEventListener('click', () => {
  const perfil = load('perfil', {});
  inputNome.value = perfil.nome || '';
  inputEmail.value = perfil.email || '';
  inputLocal.value = perfil.local || '';
  inputTelefone.value = perfil.telefone || '';
  inputInstagram.value = perfil.instagram || '';
  inputLinkedin.value = perfil.linkedin || '';
  inputSite.value = perfil.site || '';
  inputFoto.value = perfil.foto || '';
  modalPerfil.show();
});

// salvar perfil
btnSalvarPerfil.addEventListener('click', () => {
  const perfil = {
    nome: inputNome.value.trim() || 'Seu Nome',
    email: inputEmail.value.trim() || '',
    local: inputLocal.value.trim() || '',
    telefone: inputTelefone.value.trim() || '',
    instagram: inputInstagram.value.trim() || '',
    linkedin: inputLinkedin.value.trim() || '',
    site: inputSite.value.trim() || '',
    foto: inputFoto.value.trim() || fotoEl.src
  };
  save('perfil', perfil);
  carregarPerfil();
  modalPerfil.hide();
});
