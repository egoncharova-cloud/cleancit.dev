(() => {
  const button = document.querySelector('.header__burger');
  const panel = document.querySelector('.header__panel');

  if (button && panel) {
    const closeMenu = () => {
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Открыть меню');
      panel.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    };

    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      panel.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
    });

    panel.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        button.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 767) closeMenu();
    });
  }

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
