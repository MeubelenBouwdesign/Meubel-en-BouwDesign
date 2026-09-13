// =========================================================
// CONTACT.JS - MEUBEL & BOUW DESIGN
// Bevat: hamburger menu en contactformulier (Web3Forms)
// =========================================================

document.addEventListener('DOMContentLoaded', function () {
    // =========================================================
    // 1. HAMBURGER MENU (mobiel)
    // =========================================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.right-navbar');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.right-navbar a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // =========================================================
    // 2. CONTACTFORMULIER (Web3Forms)
    // =========================================================
    const form = document.getElementById('contactForm');
    const statusEl = document.getElementById('formStatus');
    const captchaError = document.getElementById('captchaError');

    if (form && statusEl) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const captchaResponse = document.querySelector('[name="h-captcha-response"]');

            if (!captchaResponse || captchaResponse.value.trim() === '') {
                if (captchaError) {
                    captchaError.hidden = false;
                }

                statusEl.textContent = '';
                statusEl.className = 'form-status';

                return;
            }

            if (captchaError) {
                captchaError.hidden = true;
            }

            statusEl.textContent = 'Bericht wordt verzonden...';
            statusEl.className = 'form-status sending';

            const btn = form.querySelector('.form-submit');
            const oldLabel = btn.querySelector('.submit-text').textContent;

            btn.disabled = true;
            btn.querySelector('.submit-text').textContent = 'Bezig...';

            try {
                const formData = new FormData(form);

                const res = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: formData
                });

                const result = await res.json();

                if (res.ok && result.success) {
                    statusEl.textContent = 'Bedankt! Uw bericht is verzonden. We nemen spoedig contact met u op.';
                    statusEl.className = 'form-status success';

                    form.reset();

                    if (typeof hcaptcha !== 'undefined') {
                        hcaptcha.reset();
                    }
                } else {
                    statusEl.textContent = result.message || 'Er ging iets mis bij het verzenden. Probeer het later opnieuw of bel ons direct.';
                    statusEl.className = 'form-status error';
                }
            } catch (err) {
                statusEl.textContent = 'Geen verbinding. Controleer uw internetverbinding en probeer het opnieuw.';
                statusEl.className = 'form-status error';
            } finally {
                btn.disabled = false;
                btn.querySelector('.submit-text').textContent = oldLabel;
            }
        });
    }
});