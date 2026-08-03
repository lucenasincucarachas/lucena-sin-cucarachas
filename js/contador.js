const URL_CONTADOR =
"https://script.google.com/macros/s/AKfycbxec01HNqgwCn8auC-x5w7YxZGXRvZloU3_XgM9yyGyflEZGTsh6u44IIyJChPUrdxrfA/exec";

async function actualizarContador(){

    try{

        const respuesta = await fetch(URL_CONTADOR);

        const datos = await respuesta.json();

        const contador = document.getElementById("contador");

        if(contador){

            contador.textContent =
                Number(datos.firmas).toLocaleString("es-ES");

        }

    }

    catch(error){

        console.error("No se pudo actualizar el contador:", error);

    }

}

document.addEventListener("DOMContentLoaded", actualizarContador);