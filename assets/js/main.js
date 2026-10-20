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

  const locationPicker = document.querySelector('.location-picker');
  const locationButton = document.querySelector('.location-picker__button');
  const locationMenu = document.querySelector('.location-picker__menu');

  if (locationPicker && locationButton && locationMenu) {
    const setLocationOpen = (open) => {
      locationButton.setAttribute('aria-expanded', String(open));
      locationMenu.classList.toggle('is-open', open);
    };

    locationButton.addEventListener('click', (event) => {
      event.stopPropagation();
      setLocationOpen(locationButton.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('click', (event) => {
      if (!locationPicker.contains(event.target)) setLocationOpen(false);
    });
    locationPicker.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setLocationOpen(false);
        locationButton.focus();
      }
    });
  }

  const bindCallbackForm = (callbackForm, callbackStatus) => {
    if (!callbackForm) return;
    callbackForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!callbackForm.reportValidity()) return;
      const data = new FormData(callbackForm);
      const body = [
        `Имя: ${data.get('name')}`,
        `Телефон: ${data.get('phone')}`
      ];
      if (callbackForm.elements.date) body.push(`Дата звонка: ${data.get('date') || 'не указана'}`);
      if (callbackForm.elements.time) body.push(`Время звонка: ${data.get('time') || 'не указано'}`);
      if (callbackForm.elements.comment) body.push(`Комментарий: ${data.get('comment') || '—'}`);
      if (callbackStatus) {
        callbackStatus.textContent = 'Заявка подготовлена к отправке в вашей почтовой программе.';
        callbackStatus.classList.add('is-visible');
      }
      window.location.href = `mailto:cleancityspb@mail.ru?subject=${encodeURIComponent('Заказ обратного звонка')}&body=${encodeURIComponent(body.join('\n'))}`;
    });
  };

  const modal = document.querySelector('[data-callback-modal]');
  const dialog = modal?.querySelector('.callback-modal__dialog');
  const form = modal?.querySelector('[data-callback-form]');
  const status = modal?.querySelector('.callback-form__status');
  let modalTrigger = null;

  if (modal && dialog && form) {
    const focusableSelector = 'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled])';
    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      modalTrigger?.focus();
    };
    const openModal = (trigger) => {
      modalTrigger = trigger;
      button?.setAttribute('aria-expanded', 'false');
      button?.setAttribute('aria-label', 'Открыть меню');
      panel?.classList.remove('is-open');
      status.classList.remove('is-visible');
      status.textContent = '';
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      window.setTimeout(() => form.elements.name.focus(), 0);
    };

    document.querySelectorAll('[data-callback-open]').forEach((trigger) => {
      trigger.addEventListener('click', () => openModal(trigger));
    });
    modal.querySelectorAll('[data-callback-close]').forEach((trigger) => {
      trigger.addEventListener('click', closeModal);
    });
    modal.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeModal();
      if (event.key !== 'Tab') return;
      const focusable = [...dialog.querySelectorAll(focusableSelector)];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    bindCallbackForm(form, status);
  }

  bindCallbackForm(document.querySelector('[data-quick-callback-form]'), document.querySelector('.cta-form__status'));
})();
