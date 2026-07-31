/*==========================================================
    LUCENA SIN CUCARACHAS
    CONTADOR.JS
==========================================================*/

"use strict";

/*==========================================================
    CONFIGURACIÓN
==========================================================*/

const CONFIG={

    valorInicial:0,

    duracion:1800,

    separador:true,

    actualizarCada:300000

};

/*==========================================================
    ELEMENTOS
==========================================================*/

const contador=document.getElementById("contador");

if(!contador){

    console.warn("No existe #contador");

}

/*==========================================================
    FORMATO
==========================================================*/

function formatear(numero){

    if(!CONFIG.separador){

        return numero.toString();

    }

    return numero.toLocaleString("es-ES");

}

/*==========================================================
    ANIMACIÓN
==========================================================*/

function animar(desde,hasta){

    if(!contador){

        return;

    }

    const inicio=performance.now();

    function frame(tiempo){

        const progreso=Math.min(

            (tiempo-inicio)/CONFIG.duracion,

            1

        );

        const valor=Math.floor(

            desde+

            (hasta-desde)*progreso

        );

        contador.textContent=formatear(valor);

        if(progreso<1){

            requestAnimationFrame(frame);

        }

    }

    requestAnimationFrame(frame);

}

/*==========================================================
    ESTABLECER VALOR
==========================================================*/

let valorActual=CONFIG.valorInicial;

function establecerContador(valor){

    valor=Math.max(0,Number(valor)||0);

    animar(valorActual,valor);

    valorActual=valor;

}

/*==========================================================
    API FUTURA
==========================================================*/

async function obtenerFirmas(){

    /*
    Sustituir por la API definitiva.

    Debe devolver únicamente un número.

    Ejemplo:

    return fetch(...)
        .then(r=>r.json())
        .then(d=>d.total);

    */

    return CONFIG.valorInicial;

}

/*==========================================================
    ACTUALIZACIÓN
==========================================================*/

async function actualizar(){

    try{

        const firmas=

            await obtenerFirmas();

        establecerContador(firmas);

    }

    catch(error){

        console.error(

            "Error actualizando contador",

            error

        );

    }

}

/*==========================================================
    OBSERVER
==========================================================*/

if(contador){

    const observer=new IntersectionObserver(

        entradas=>{

            entradas.forEach(entrada=>{

                if(entrada.isIntersecting){

                    actualizar();

                    observer.disconnect();

                }

            });

        },

        {

            threshold:.5

        }

    );

    observer.observe(contador);

}

/*==========================================================
    AUTOREFRESH
==========================================================*/

setInterval(

    actualizar,

    CONFIG.actualizarCada

);

/*==========================================================
    ACCESO GLOBAL
==========================================================*/

window.actualizarFirmas=

establecerContador;