const pages = document.querySelector('#pages');
const dots = [...document.querySelectorAll('.dot')];
let currentPage = 0;
let updateTimer;

function showPage(index, smooth = true) {
  pages.scrollTo({
    left: index * pages.clientWidth,
    behavior: smooth ? 'smooth' : 'auto'
  });
}

function updatePagination() {
  const nextPage = Math.round(pages.scrollLeft / pages.clientWidth);
  if (nextPage === currentPage) return;

  currentPage = nextPage;
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentPage);
    if (index === currentPage) dot.setAttribute('aria-current', 'page');
    else dot.removeAttribute('aria-current');
  });
}

pages.addEventListener('scroll', () => {
  window.clearTimeout(updateTimer);
  updateTimer = window.setTimeout(updatePagination, 60);
}, { passive: true });

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showPage(index));
});

pages.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') showPage(Math.min(currentPage + 1, dots.length - 1));
  if (event.key === 'ArrowLeft') showPage(Math.max(currentPage - 1, 0));
});

window.addEventListener('resize', () => showPage(currentPage, false));

window.addEventListener('load', () => {
  document.querySelectorAll('.page img').forEach((image) => {
    if (!image.complete) image.decode?.().catch(() => {});
  });
});
