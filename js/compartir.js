/* ==========================================================
   COMPARTIR LA WEB
========================================================== */

const URL_WEB = "https://lucenasincucarachas.github.io/lucena-sin-cucarachas/";

const TITULO = "Lucena sin Cucarachas";

const TEXTO = "Apoya la iniciativa vecinal para solicitar un Plan Integral de Control de Plagas en Lucena. Firma aquí:";

/* ==========================================
   WHATSAPP
========================================== */

function compartirWhatsApp() {

    window.open(

        "https://wa.me/?text=" +
        encodeURIComponent(TEXTO + " " + URL_WEB),

        "_blank"

    );

}

/* ==========================================
   FACEBOOK
========================================== */

function compartirFacebook() {

    window.open(

        "https://www.facebook.com/sharer/sharer.php?u=" +
        encodeURIComponent(URL_WEB),

        "_blank"

    );

}

/* ==========================================
   TELEGRAM
========================================== */

function compartirTelegram() {

    window.open(

        "https://t.me/share/url?url=" +
        encodeURIComponent(URL_WEB) +
        "&text=" +
        encodeURIComponent(TEXTO),

        "_blank"

    );

}

/* ==========================================
   X (Twitter)
========================================== */

function compartirX() {

    window.open(

        "https://x.com/intent/post?url=" +
        encodeURIComponent(URL_WEB) +
        "&text=" +
        encodeURIComponent(TEXTO),

        "_blank"

    );

}

/* ==========================================
   COPIAR ENLACE
========================================== */

function copiarEnlace() {

    navigator.clipboard.writeText(URL_WEB);

    alert("Enlace copiado al portapapeles.");

}

/* ==========================================
   COMPARTIR NATIVO
========================================== */

async function compartir() {

    if (navigator.share) {

        try {

            await navigator.share({

                title: TITULO,

                text: TEXTO,

                url: URL_WEB

            });

        } catch (e) {}

    } else {

        copiarEnlace();

    }

}