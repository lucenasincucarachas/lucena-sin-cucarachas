/*==========================================================
    LUCENA SIN CUCARACHAS
    COMPARTIR.JS
==========================================================*/

"use strict";

/*==========================================================
    CONFIGURACIÓN
==========================================================*/

const COMPARTIR={

    titulo:"Lucena sin Cucarachas",

    texto:"Apoya esta iniciativa ciudadana para mejorar el control de plagas en Lucena. Tu firma puede marcar la diferencia.",

    url:window.location.origin+window.location.pathname

};

/*==========================================================
    ELEMENTOS
==========================================================*/

const botonCompartir=document.querySelector("#btnCompartir");

const botonCopiar=document.querySelector("#btnCopiar");

const botonWhatsapp=document.querySelector("#btnWhatsapp");

const botonTelegram=document.querySelector("#btnTelegram");

const botonFacebook=document.querySelector("#btnFacebook");

const botonX=document.querySelector("#btnX");

/*==========================================================
    WEB SHARE API
==========================================================*/

async function compartirNativo(){

    if(!navigator.share){

        return false;

    }

    try{

        await navigator.share({

            title:COMPARTIR.titulo,

            text:COMPARTIR.texto,

            url:COMPARTIR.url

        });

        return true;

    }

    catch(error){

        return false;

    }

}

/*==========================================================
    COPIAR ENLACE
==========================================================*/

async function copiarEnlace(){

    try{

        await navigator.clipboard.writeText(

            COMPARTIR.url

        );

        mostrarMensaje(

            "Enlace copiado al portapapeles."

        );

    }

    catch{

        mostrarMensaje(

            "No ha sido posible copiar el enlace."

        );

    }

}

/*==========================================================
    MENSAJE
==========================================================*/

function mostrarMensaje(texto){

    let aviso=document.querySelector("#mensajeCompartir");

    if(!aviso){

        aviso=document.createElement("div");

        aviso.id="mensajeCompartir";

        aviso.style.position="fixed";

        aviso.style.bottom="30px";

        aviso.style.left="50%";

        aviso.style.transform="translateX(-50%)";

        aviso.style.padding="14px 24px";

        aviso.style.background="#165C3A";

        aviso.style.color="#FFF";

        aviso.style.borderRadius="12px";

        aviso.style.boxShadow="0 12px 30px rgba(0,0,0,.20)";

        aviso.style.zIndex="99999";

        aviso.style.opacity="0";

        aviso.style.transition=".30s";

        document.body.appendChild(aviso);

    }

    aviso.textContent=texto;

    aviso.style.opacity="1";

    setTimeout(()=>{

        aviso.style.opacity="0";

    },2500);

}

/*==========================================================
    REDES SOCIALES
==========================================================*/

function abrir(url){

    window.open(

        url,

        "_blank",

        "noopener,noreferrer"

    );

}

function compartirWhatsapp(){

    abrir(

        "https://wa.me/?text="+

        encodeURIComponent(

            COMPARTIR.texto+

            "\n\n"+

            COMPARTIR.url

        )

    );

}

function compartirTelegram(){

    abrir(

        "https://t.me/share/url?url="+

        encodeURIComponent(

            COMPARTIR.url

        )+

        "&text="+

        encodeURIComponent(

            COMPARTIR.texto

        )

    );

}

function compartirFacebook(){

    abrir(

        "https://www.facebook.com/sharer/sharer.php?u="+

        encodeURIComponent(

            COMPARTIR.url

        )

    );

}

function compartirX(){

    abrir(

        "https://twitter.com/intent/tweet?text="+

        encodeURIComponent(

            COMPARTIR.texto

        )+

        "&url="+

        encodeURIComponent(

            COMPARTIR.url

        )

    );

}

/*==========================================================
    EVENTOS
==========================================================*/

if(botonCompartir){

    botonCompartir.addEventListener(

        "click",

        async()=>{

            const compartido=

                await compartirNativo();

            if(!compartido){

                copiarEnlace();

            }

        }

    );

}

if(botonCopiar){

    botonCopiar.addEventListener(

        "click",

        copiarEnlace

    );

}

if(botonWhatsapp){

    botonWhatsapp.addEventListener(

        "click",

        compartirWhatsapp

    );

}

if(botonTelegram){

    botonTelegram.addEventListener(

        "click",

        compartirTelegram

    );

}

if(botonFacebook){

    botonFacebook.addEventListener(

        "click",

        compartirFacebook

    );

}

if(botonX){

    botonX.addEventListener(

        "click",

        compartirX

    );

}