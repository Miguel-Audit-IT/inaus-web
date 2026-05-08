/**
 * ====================================================================
 * DBGEO TECHNOLOGIES - CORE SYSTEM SCRIPT
 * Arquitectura: Vanilla JS (ES6+)
 * Build: 2026.3 - PWA, Auto Dark Mode & AJAX Formspree Transmission
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. ANIMACIONES (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({ once: true, offset: 50, duration: 800, easing: 'ease-out-cubic' });
    }

    // 2. NAVBAR GLASSMORPHISM
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(7, 23, 57, 0.98)';
                navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
                navbar.style.borderBottom = '1px solid rgba(227, 195, 157, 0.3)';
            } else {
                navbar.style.background = 'rgba(7, 23, 57, 0.85)';
                navbar.style.boxShadow = 'none';
                navbar.style.borderBottom = '1px solid rgba(227, 195, 157, 0.15)';
            }
        }, { passive: true });
    }

    // 3. FIRMA TÉCNICA
    console.log('%c DBGEO Technologies 2026 ', 'background: #071739; color: #E3C39D; font-size: 20px; font-weight: 900; padding: 10px 20px; border-radius: 5px;');
    console.log('%c> Arquitectura de Sistemas & Auditoría Financiera.', 'color: #4B6382; font-size: 14px; font-weight: bold;');

    // 4. DARK MODE AUTOMÁTICO
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = (isDark) => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    };
    applyTheme(prefersDarkScheme.matches);
    prefersDarkScheme.addEventListener('change', (e) => applyTheme(e.matches));

    // 5. REGISTRO PWA (OFFLINE MODE)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('%c[PWA] Sistema Offline Registrado con éxito.', 'color: #27c93f; font-family: monospace;'))
            .catch(err => console.error('Error PWA:', err));
    }
});

// 6. LÓGICA DE CAMPOS DINÁMICOS (FORMULARIO)
const toggleDynamicFields = () => {
    const select = document.getElementById('departmentSelect');
    if (!select) return;

    const fields = document.querySelectorAll('.dynamic-field');
    fields.forEach(field => {
        field.style.opacity = '0';
        field.style.transform = 'translateY(-10px)';
        setTimeout(() => field.style.display = 'none', 300);
    });

    const targetMap = {
        'auditoria': 'field-audit',
        'laboratorio': 'field-lab',
        'software': 'field-soft'
    };

    const targetId = targetMap[select.value];
    if (targetId) {
        const activeField = document.getElementById(targetId);
        if (activeField) {
            setTimeout(() => {
                activeField.style.display = 'block';
                void activeField.offsetWidth;
                activeField.style.transition = 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
                activeField.style.opacity = '1';
                activeField.style.transform = 'translateY(0)';
            }, 310);
        }
    }
};
window.toggleDynamicFields = toggleDynamicFields;

// 7. MOTOR DE TRANSMISIÓN DE DATOS (FORMSPREE AJAX)
const intelligentForm = document.getElementById('intelligentForm');

if (intelligentForm) {
    intelligentForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Detiene la recarga de la página

        const statusDiv = document.getElementById('form-status');
        const btnSubmit = document.getElementById('btn-submit');

        btnSubmit.innerHTML = '<span class="status-indicator"></span> TRANSMITIENDO...';
        btnSubmit.disabled = true;
        statusDiv.innerHTML = '';

        const data = new FormData(event.target);

        try {
            const response = await fetch('https://formspree.io/f/xnjwdbjp', {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                statusDiv.innerHTML = '<span class="status-dot"></span> [200 OK] Paquete de datos transmitido. Nos pondremos en contacto pronto.';
                statusDiv.style.color = '#27c93f';
                intelligentForm.reset();
                document.querySelectorAll('.dynamic-field').forEach(f => f.style.display = 'none');
            } else {
                statusDiv.innerHTML = '>[ERROR 400] Anomalía en la red. Revise los datos.';
                statusDiv.style.color = '#ff5f56';
            }
        } catch (error) {
            statusDiv.innerHTML = '>[ERROR 503] Sin conexión. La solicitud está en cola.';
            statusDiv.style.color = '#ffbd2e';
        } finally {
            btnSubmit.innerHTML = 'ENVIAR SOLICITUD AL SISTEMA';
            btnSubmit.disabled = false;
        }
    });
}
// 8. MOTOR HÁPTICO (MICRO-VIBRACIÓN EN MÓVILES)
document.addEventListener('DOMContentLoaded', () => {
    const hapticBtns = document.querySelectorAll('.haptic-btn');

    hapticBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // navigator.vibrate(15) genera un pulso seco de 15 milisegundos
            // Funciona en Android para dar la sensación de un "clic" físico
            if (navigator.vibrate) {
                navigator.vibrate(15);
            }
        });
    });
});
// 9. CYBER CURSOR & ATTENTION API (2026 TENDENCIES)
document.addEventListener('DOMContentLoaded', () => {

    // --- API DE RETENCIÓN DE ATENCIÓN (Tab Change) ---
    const originalTitle = document.title;
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            document.title = "[ ⚠️ ] Sistema en Pausa";
        } else {
            document.title = originalTitle;
        }
    });

    // --- CYBER CURSOR SCRIPT ---
    // Solo lo ejecutamos si estamos en PC (pantallas grandes)
    if (window.innerWidth >= 992) {
        const dot = document.createElement('div');
        dot.classList.add('cyber-dot');
        document.body.appendChild(dot);

        const ring = document.createElement('div');
        ring.classList.add('cyber-ring');
        document.body.appendChild(ring);

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // El punto sigue al mouse instantáneamente
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
        });

        // Bucle de animación para que el anillo siga al punto con "retraso elástico"
        const animateRing = () => {
            // Lerp (Linear Interpolation) para movimiento fluido
            ringX += (mouseX - ringX) * 0.2;
            ringY += (mouseY - ringY) * 0.2;

            ring.style.left = `${ringX}px`;
            ring.style.top = `${ringY}px`;

            requestAnimationFrame(animateRing);
        };
        animateRing();
    }
});
// 10. CONTROL DEL PRE-LOADER INAUS
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');

    // Si el preloader existe en el HTML, ejecutamos la secuencia
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('preloader-hidden');
            // Opcional: vibración háptica al terminar de cargar (solo en móviles Android)
            if (navigator.vibrate) {
                navigator.vibrate(20);
            }
        }, 1500); // 1500 milisegundos = 1.5 segundos de carga
    }
});
/* =========================================
   CYBER CURSOR & ATTENTION API
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Solo ejecutamos el cursor personalizado en PC (pantallas grandes)
    if (window.innerWidth >= 992) {
        // 1. Crear los elementos en el HTML dinámicamente
        const dot = document.createElement('div');
        dot.classList.add('cyber-dot');
        document.body.appendChild(dot);

        const ring = document.createElement('div');
        ring.classList.add('cyber-ring');
        document.body.appendChild(ring);

        // 2. Variables de posición
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        // 3. Capturar el movimiento real del mouse
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // El punto sigue al mouse instantáneamente
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
        });

        // 4. Bucle de animación para que el anillo siga al punto suavemente
        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.2; // 0.2 es la fricción/suavidad
            ringY += (mouseY - ringY) * 0.2;

            ring.style.left = `${ringX}px`;
            ring.style.top = `${ringY}px`;

            requestAnimationFrame(animateRing);
        };
        animateRing();
    }
});