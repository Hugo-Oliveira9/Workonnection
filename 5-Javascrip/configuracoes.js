// Alternância de tema
const radiosTema = document.querySelectorAll('input[name="tema"]');

radiosTema.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'escuro') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  });
});
