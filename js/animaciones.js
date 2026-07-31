/*==========================================================
    LUCENA SIN CUCARACHAS
    ANIMACIONES.JS
==========================================================*/

"use strict";

/*==========================================================
    REVEAL AL HACER SCROLL
==========================================================*/

const elementosReveal=document.querySelectorAll(

    ".reveal,.reveal-left,.reveal-right,.reveal-zoom"

);

const observer=new IntersectionObserver(

    (entradas)=>{

        entradas.forEach(entrada=>{

            if(entrada.isIntersecting){

                entrada.target.classList.add("visible");

                observer.unobserve(

                    entrada.target

                );

            }

        });

    },

    {

        threshold:.15,

        rootMargin:"0px 0px -80px 0px"

    }

);

elementosReveal.forEach(elemento=>{

    observer.observe(elemento);

});

/*==========================================================
    ANIMACIÓN ESCALONADA DE TARJETAS
==========================================================*/

const tarjetas=document.querySelectorAll(

    ".card,.documento-card,.propuestas-grid article"

);

tarjetas.forEach((tarjeta,indice)=>{

    tarjeta.style.transitionDelay=

        (indice*80)+"ms";

});

/*==========================================================
    PARALLAX SUAVE HERO
==========================================================*/

const heroImagen=document.querySelector(

    ".hero-imagen img"

);

function parallaxHero(){

    if(

        !heroImagen ||

        window.innerWidth<992

    ){

        return;

    }

    const scroll=

        window.scrollY;

    heroImagen.style.transform=

        `translateY(${scroll*0.08}px)`;

}

window.addEventListener(

    "scroll",

    parallaxHero,

    {

        passive:true

    }

);

/*==========================================================
    EFECTO SUAVE EN TÍTULOS
==========================================================*/

const titulos=document.querySelectorAll(

    ".titulo-seccion"

);

const observerTitulos=

new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.animate(

[

{

opacity:0,

transform:"translateY(40px)"

},

{

opacity:1,

transform:"translateY(0)"

}

],

{

duration:700,

easing:"ease-out",

fill:"forwards"

}

);

observerTitulos.unobserve(

entry.target

);

}

});

},

{

threshold:.25

}

);

titulos.forEach(titulo=>{

observerTitulos.observe(

titulo

);

});

/*==========================================================
    EFECTO HERO AL CARGAR
==========================================================*/

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});

/*==========================================================
    EFECTO HOVER PREMIUM
==========================================================*/

document.querySelectorAll(

".card"

).forEach(card=>{

card.addEventListener(

"mousemove",

e=>{

const rect=

card.getBoundingClientRect();

const x=

e.clientX-

rect.left;

const y=

e.clientY-

rect.top;

card.style.setProperty(

"--x",

`${x}px`

);

card.style.setProperty(

"--y",

`${y}px`

);

}

);

});

/*==========================================================
    DETECCIÓN DE SCROLL
==========================================================*/

let ultimoScroll=0;

window.addEventListener(

"scroll",

()=>{

const actual=

window.pageYOffset;

document.body.classList.toggle(

"scroll-down",

actual>ultimoScroll

);

ultimoScroll=actual;

},

{

passive:true

}

);

/*==========================================================
    REINICIAR ANIMACIONES AL VOLVER ARRIBA
==========================================================*/

window.addEventListener(

"beforeunload",

()=>{

window.scrollTo(0,0);

}

);