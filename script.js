/**
 * Resume Interactivity & Theme Controller
 * Author: Luiz Guilherme Mariano
 */

(function () {
  'use strict';

  // Elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const printBtn = document.getElementById('printBtn');
  const copyEmailLink = document.getElementById('copyEmailLink');
  const toast = document.getElementById('toast');

  // --- Theme Management ---
  const STORAGE_KEY = 'luiz_resume_theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    // Default to dark mode for web portfolio look
    return 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    if (themeToggleBtn) {
      const icon = themeToggleBtn.querySelector('i');
      const text = themeToggleBtn.querySelector('.btn-text');
      if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
        text.textContent = 'Claro';
      } else {
        icon.className = 'fa-solid fa-moon';
        text.textContent = 'Escuro';
      }
    }
  }

  // Initialize theme
  applyTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      showToast(`Modo ${next === 'dark' ? 'Escuro' : 'Claro'} ativado`);
    });
  }

  // --- Print to PDF ---
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // --- Toast Notification ---
  let toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --- Copy Email on Click ---
  if (copyEmailLink) {
    copyEmailLink.addEventListener('click', (e) => {
      // If user holds cmd/ctrl or right clicks, let default mailto proceed
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      
      const email = 'lgluizguilherme@hotmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email)
          .then(() => {
            showToast('E-mail copiado: ' + email);
          })
          .catch(() => {
            // fallback
          });
      }
    });
  }

})();
