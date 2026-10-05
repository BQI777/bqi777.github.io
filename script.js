let translations = {};


// ==============================
// COPIAR EMAIL
// ==============================

function copiarMail() {
    navigator.clipboard.writeText("nicolas.barqui@gmail.com");
}


// ==============================
// ALERTA DE EMAIL COPIADO
// ==============================

const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

const appendAlert = (message, type) => {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');

    alertPlaceholder.append(wrapper);

    setTimeout(() => {
        const closeButton = wrapper.querySelector('.btn-close');

        if (closeButton) {
            closeButton.click();
        }
    }, 2500);
};


const alertTrigger = document.getElementById('liveAlertBtn');

if (alertTrigger) {
    alertTrigger.addEventListener('click', () => {
        appendAlert(translations.alerts.emailCopied, 'dark');
    });
}


// ==============================
// BOTÓN VOLVER ARRIBA
// ==============================

let mybutton = document.getElementById("btn-back-to-top");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

mybutton.addEventListener("click", backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


// ==============================
// MAGNIFIC POPUP
// ==============================

$('.open-popup').magnificPopup({
    type: 'image',

    closeBtnInside: false,
    closeOnContentClick: true,
    closeOnBgClick: true,

    callbacks: {
        open: function () {
            var self = this;

            self.wrap.on('click.pinhandler', 'img', function () {
                self.wrap.toggleClass('mfp-force-scrollbars');
            });
        },

        beforeClose: function () {
            this.wrap.off('click.pinhandler');
            this.wrap.removeClass('mfp-force-scrollbars');
        }
    },

    image: {
        verticalFit: false
    }
});


// ==============================
// SISTEMA DE IDIOMAS
// ==============================

async function loadLanguage(language) {

    const response = await fetch(`translations/${language}.json`);

    translations = await response.json();


    // ==============================
    // TRADUCIR TEXTOS
    // ==============================

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.dataset.i18n;

        const keys = key.split(".");

        let value = translations;


        keys.forEach(k => {
            value = value[k];
        });


        element.innerHTML = value;

    });


    // ==============================
    // CAMBIAR IMÁGENES
    // ==============================

    document.querySelectorAll("[data-i18n-src]").forEach(element => {

        const key = element.dataset.i18nSrc;

        const keys = key.split(".");

        let value = translations;


        keys.forEach(k => {
            value = value[k];
        });


        element.src = value;

    });


    // ==============================
    // CAMBIAR BANDERA DEL BOTÓN
    // ==============================

    const languageButton = document.getElementById("languageButton");

    if (languageButton) {

        if (language === "es") {

            languageButton.innerHTML =
                '<span class="fi fi-es"></span> <p style="font-size: 16px; display: inline;">ES</p>';

        }

        else if (language === "en") {

            languageButton.innerHTML =
                '<span class="fi fi-gb"></span> <p style="font-size: 16px; display: inline;">EN</p>';

        }

    }

}


// ==============================
// CAMBIAR IDIOMA
// ==============================

function changeLanguage(language) {

    // Guardar idioma elegido

    localStorage.setItem("language", language);

    // Cargar idioma

    loadLanguage(language);

}


// ==============================
// CARGAR IDIOMA GUARDADO
// ==============================

const savedLanguage = localStorage.getItem("language") || "es";

loadLanguage(savedLanguage);