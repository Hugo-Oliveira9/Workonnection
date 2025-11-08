import { save, load, getUserKey, getCurrentUser } from './helpers.js';

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

export function carregarPerfil() {
  const usuarioLogado = getCurrentUser();
  if (!usuarioLogado) return;

  // 1️⃣ Tenta carregar o perfil salvo no localStorage
  let perfil = load(getUserKey('perfil'), null);

  // 2️⃣ Se não existir perfil, tenta pegar os dados do cadastro
  if (!perfil) {
    const cadastro = load(`cadastroDados_${usuarioLogado.email}`, null);
    if (cadastro) {
      perfil = {
        nome: cadastro.nomeDadosPessoais || 'Seu Nome',
        email: cadastro.emailDadosPessoais || usuarioLogado.email,
        local: '',
        telefone: cadastro.telefoneDadosPessoais || '',
        instagram: '',
        linkedin: '',
        site: '',
        foto: 'https://img.freepik.com/fotos-gratis/homem-de-negocios-de-vista-frontal-quer-apertar-as-maos_23-2148763831.jpg'
      };
      save(getUserKey('perfil'), perfil);
    }
  }

  // 3️⃣ Se ainda assim não houver, cria um perfil padrão
  if (!perfil) {
    perfil = {
      nome: 'Seu Nome',
      email: usuarioLogado.email,
      local: '',
      telefone: '',
      instagram: '',
      linkedin: '',
      site: '',
      foto: 'https://img.freepik.com/fotos-gratis/homem-de-negocios-de-vista-frontal-quer-apertar-as-maos_23-2148763831.jpg'
    };
    save(getUserKey('perfil'), perfil);
  }

  // Atualiza o conteúdo da tela
  nomeEl.textContent = perfil.nome || 'Nome:';
  fotoEl.src = perfil.foto || '';

  const formacoes = load(getUserKey('formacoes'), []);
  if (formacoes.length) {
    const ultima = formacoes[formacoes.length - 1];
    formacaoSmall.textContent = `${ultima.curso} - ${ultima.universidade}`;
  } else {
    formacaoSmall.textContent = perfil.email || 'Formação:';
  }

  document.getElementById('perfil-local').innerHTML =
    `<i class="fas fa-map-marker-alt text-primary"></i> ${perfil.local || 'Local:'}`;
  document.getElementById('perfil-telefone').innerHTML =
    `<i class="fas fa-phone text-success"></i> ${perfil.telefone || 'Telefone:'}`;
  document.getElementById('perfil-instagram').innerHTML =
    `<i class="fab fa-instagram text-danger"></i> ${perfil.instagram || 'Instagram:'}`;
  document.getElementById('perfil-linkedin').innerHTML =
    `<i class="fab fa-linkedin text-primary"></i> ${perfil.linkedin || 'LinkedIn:'}`;
  document.getElementById('perfil-site').innerHTML =
    `<i class="fas fa-globe text-info"></i> ${perfil.site || 'Site:'}`;
}

// 🔹 Abrir modal com dados atuais
btnAbrirModal.addEventListener('click', () => {
  const perfil = load(getUserKey('perfil'), {});
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

// 🔹 Salvar perfil atualizado
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

  save(getUserKey('perfil'), perfil);
  carregarPerfil();
  modalPerfil.hide();
});

// 🔹 Carrega tudo quando a página for aberta
document.addEventListener('DOMContentLoaded', carregarPerfil);
