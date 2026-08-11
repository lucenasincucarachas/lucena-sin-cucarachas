/* =========================================================
LUCENA SIN CUCARACHAS
JavaScript principal
========================================================= */

"use strict";

/* =========================================================
INICIALIZACIÓN
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


inicializarMenu();
inicializarCompartir();
inicializarAno();


});

/* =========================================================
MENÚ MÓVIL
========================================================= */

function inicializarMenu() {


const boton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu-principal");

if (!boton || !menu) {
    return;
}


boton.addEventListener("click", () => {

    const abierto =
        boton.getAttribute("aria-expanded") === "true";

    boton.setAttribute(
        "aria-expanded",
        String(!abierto)
    );

    boton.setAttribute(
        "aria-label",
        abierto
            ? "Abrir menú"
            : "Cerrar menú"
    );

    menu.classList.toggle(
        "is-open",
        !abierto
    );

});


/* -----------------------------------------------------
   Cerrar menú al pulsar un enlace
   ----------------------------------------------------- */

menu.querySelectorAll("a").forEach((enlace) => {

    enlace.addEventListener("click", () => {

        cerrarMenu();

    });

});


/* -----------------------------------------------------
   Cerrar menú al pulsar fuera
   ----------------------------------------------------- */

document.addEventListener("click", (evento) => {

    if (
        !menu.classList.contains("is-open") ||
        menu.contains(evento.target) ||
        boton.contains(evento.target)
    ) {
        return;
    }

    cerrarMenu();

});


/* -----------------------------------------------------
   Cerrar menú con Escape
   ----------------------------------------------------- */

document.addEventListener("keydown", (evento) => {

    if (evento.key === "Escape") {

        cerrarMenu();

        boton.focus();

    }

});


/* -----------------------------------------------------
   Si volvemos a escritorio, cerrar menú
   ----------------------------------------------------- */

window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {
        cerrarMenu();
    }

});


}

function cerrarMenu() {


const boton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu-principal");

if (!boton || !menu) {
    return;
}

boton.setAttribute(
    "aria-expanded",
    "false"
);

boton.setAttribute(
    "aria-label",
    "Abrir menú"
);

menu.classList.remove("is-open");


}

/* =========================================================
COMPARTIR
========================================================= */

function inicializarCompartir() {


const botonWhatsApp =
    document.querySelector("#compartir-whatsapp");

const botonCopiar =
    document.querySelector("#copiar-enlace");

const botonNativo =
    document.querySelector("#compartir-nativo");


/* -----------------------------------------------------
   WhatsApp
   ----------------------------------------------------- */

if (botonWhatsApp) {

    botonWhatsApp.addEventListener(
        "click",
        compartirWhatsApp
    );

}


/* -----------------------------------------------------
   Copiar enlace
   ----------------------------------------------------- */

if (botonCopiar) {

    botonCopiar.addEventListener(
        "click",
        copiarEnlace
    );

}


/* -----------------------------------------------------
   Compartir nativo
   ----------------------------------------------------- */

if (
    botonNativo &&
    typeof navigator.share === "function"
) {

    botonNativo.hidden = false;

    botonNativo.addEventListener(
        "click",
        compartirNativo
    );

}


}

/* =========================================================
DATOS DE COMPARTIR
========================================================= */

function obtenerDatosCompartir() {


const url =
    window.location.href;

const titulo =
    document.title;

const texto =
    "Apoya la iniciativa vecinal «Lucena sin Cucarachas» y compártela con otros vecinos de Lucena.";

return {
    url,
    titulo,
    texto
};


}

/* =========================================================
WHATSAPP
========================================================= */

function compartirWhatsApp() {


const datos =
    obtenerDatosCompartir();

const mensaje =
    `${datos.texto}\n\n${datos.url}`;

const url =
    "https://wa.me/?text=" +
    encodeURIComponent(mensaje);

window.open(
    url,
    "_blank",
    "noopener,noreferrer"
);


}

/* =========================================================
COPIAR ENLACE
========================================================= */

async function copiarEnlace() {


const boton =
    document.querySelector("#copiar-enlace");

const textoOriginal =
    boton
        ? boton.textContent
        : "Copiar enlace";


try {

    await copiarTexto(
        window.location.href
    );

    mostrarConfirmacion(
        boton,
        "Enlace copiado"
    );

} catch (error) {

    /* -------------------------------------------------
       Fallback para navegadores antiguos
       ------------------------------------------------- */

    const copiado =
        copiarConFallback(
            window.location.href
        );

    if (copiado) {

        mostrarConfirmacion(
            boton,
            "Enlace copiado"
        );

    } else {

        mostrarConfirmacion(
            boton,
            "No se pudo copiar"
        );

    }

}


if (boton) {

    window.setTimeout(() => {

        boton.textContent =
            textoOriginal;

    }, 2200);

}


}

/* =========================================================
COPIADO MODERNO
========================================================= */

async function copiarTexto(texto) {


if (
    !navigator.clipboard ||
    typeof navigator.clipboard.writeText !== "function"
) {

    throw new Error(
        "Clipboard API no disponible"
    );

}

await navigator.clipboard.writeText(texto);


}

/* =========================================================
FALLBACK COPIAR
========================================================= */

function copiarConFallback(texto) {


const textarea =
    document.createElement("textarea");

textarea.value = texto;

textarea.setAttribute(
    "readonly",
    ""
);

textarea.style.position = "fixed";
textarea.style.opacity = "0";
textarea.style.pointerEvents = "none";

document.body.appendChild(
    textarea
);

textarea.select();

textarea.setSelectionRange(
    0,
    textarea.value.length
);

let resultado = false;

try {

    resultado =
        document.execCommand(
            "copy"
        );

} catch (error) {

    resultado = false;

}

document.body.removeChild(
    textarea
);

return resultado;


}

/* =========================================================
COMPARTIR NATIVO
========================================================= */

async function compartirNativo() {


if (
    typeof navigator.share !== "function"
) {
    return;
}


const datos =
    obtenerDatosCompartir();


try {

    await navigator.share({
        title: datos.titulo,
        text: datos.texto,
        url: datos.url
    });

} catch (error) {

    /*
     * AbortError significa normalmente que el usuario
     * cerró el panel de compartir.
     *
     * No mostramos ningún error en ese caso.
     */

    if (
        error &&
        error.name !== "AbortError"
    ) {

        console.warn(
            "No se pudo utilizar el sistema de compartir.",
            error
        );

    }

}


}

/* =========================================================
CONFIRMACIÓN VISUAL
========================================================= */

function mostrarConfirmacion(
boton,
mensaje
) {


if (!boton) {
    return;
}

boton.textContent =
    mensaje;


}

/* =========================================================
AÑO DEL FOOTER
========================================================= */

function inicializarAno() {


const elemento =
    document.querySelector("#anio");

if (!elemento) {
    return;
}

elemento.textContent =
    String(
        new Date().getFullYear()
    );


}
