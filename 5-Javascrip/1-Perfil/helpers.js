// helpers.js
window.save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
window.load = (k, dv) => {
  const s = localStorage.getItem(k);
  return s ? JSON.parse(s) : dv;
};
window.confirmDelete = (msg) => confirm(msg);

// estado de edição global
window.editing = {
  habilidadeIndex: -1,
  formacaoIndex: -1,
  experienciaIndex: -1,
  cursoIndex: -1
};
