/*==========================================================
    LUCENA SIN CUCARACHAS
    MENU.JS
==========================================================*/

"use strict";

/*==========================================================
    ELEMENTOS
==========================================================*/

const cabecera=document.querySelector(".cabecera");

const botonMenu=document.querySelector(".menu-movil");

const navegacion=document.querySelector("nav");

const enlaces=document.querySelectorAll("nav a");

/*==========================================================
    MENÚ MÓVIL
==========================================================*/

if(botonMenu){

    botonMenu.addEventListener("click",()=>{

        navegacion.classList.toggle("activo");

        const abierto=navegacion.classList.contains("activo");

        botonMenu.setAttribute(

            "aria-expanded",

            abierto

        );

    });

}

/*==========================================================
    CERRAR MENÚ AL PULSAR UN ENLACE
==========================================================*/

enlaces.forEach(enlace=>{

    enlace.addEventListener("click",()=>{

        if(window.innerWidth<=992){

            navegacion.classList.remove("activo");

            botonMenu.setAttribute(

                "aria-expanded",

                "false"

            );

        }

    });

});

/*==========================================================
    CERRAR CON ESC
==========================================================*/

document.addEventListener("keydown",e=>{

    if(e.key==="Escape"){

        navegacion.classList.remove("activo");

        botonMenu.setAttribute(

            "aria-expanded",

            "false"

        );

    }

});

/*==========================================================
    CERRAR PULSANDO FUERA
==========================================================*/

document.addEventListener("click",e=>{

    if(

        window.innerWidth<=992 &&

        !navegacion.contains(e.target) &&

        !botonMenu.contains(e.target)

    ){

        navegacion.classList.remove("activo");

        botonMenu.setAttribute(

            "aria-expanded",

            "false"

        );

    }

});

/*==========================================================
    HEADER AL HACER SCROLL
==========================================================*/

function actualizarCabecera(){

    if(window.scrollY>40){

        cabecera.classList.add("scrolled");

    }

    else{

        cabecera.classList.remove("scrolled");

    }

}

actualizarCabecera();

window.addEventListener(

    "scroll",

    actualizarCabecera,

    {

        passive:true

    }

);

/*==========================================================
    ENLACE ACTIVO
==========================================================*/

const secciones=[

    ...document.querySelectorAll("main section[id]")

];

function actualizarMenuActivo(){

    let actual="";

    const posicion=

        window.scrollY+

        180;

    secciones.forEach(seccion=>{

        if(

            posicion>=seccion.offsetTop

        ){

            actual=seccion.id;

        }

    });

    enlaces.forEach(enlace=>{

        enlace.classList.remove("activo");

        if(

            enlace.getAttribute("href")==="#"+actual

        ){

            enlace.classList.add("activo");

        }

    });

}

actualizarMenuActivo();

window.addEventListener(

    "scroll",

    actualizarMenuActivo,

    {

        passive:true

    }

);

/*==========================================================
    REAJUSTAR AL CAMBIAR TAMAÑO
==========================================================*/

window.addEventListener("resize",()=>{

    if(window.innerWidth>992){

        navegacion.classList.remove("activo");

        botonMenu.setAttribute(

            "aria-expanded",

            "false"

        );

    }

});