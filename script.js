const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2100);
}
async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    showToast('IP copiada al portapapeles');
  } catch {
    const input = document.createElement('textarea');
    input.value = value;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
    showToast('IP copiada al portapapeles');
  }
}
document.getElementById('copyIp').addEventListener('click', () => copyText('infernmc.nyxelis.tech'));
document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', () => copyText(button.dataset.copy));
});
const menuToggle = document.getElementById('menuToggle');
const topLinks = document.querySelector('.top-links');
menuToggle.addEventListener('click', () => {
  const open = topLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
topLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  topLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.side-link')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle('selected', link.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, {rootMargin: '-20% 0px -65% 0px'});
  sections.forEach(section => observer.observe(section));
}
