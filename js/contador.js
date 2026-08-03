const URL_CONTADOR =
"https://script.google.com/macros/s/AKfycbxec01HNqgwCn8auC-x5w7YxZGXRvZloU3_XgM9yyGyflEZGTsh6u44IIyJChPUrdxrfA/exec";

async function actualizarContador() {

    try {

        const respuesta = await fetch(URL_CONTADOR + "?t=" + Date.now());

        const datos = await respuesta.json();

        const contador = document.getElementById("contador");

        if (contador) {

            contador.textContent =
                Number(datos.firmas).toLocaleString("es-ES");

        }

        const actualizacion = document.getElementById("actualizacion");

        if (actualizacion) {

            actualizacion.textContent =
                new Date(datos.actualizado).toLocaleString("es-ES");

        }

    }

    catch (error) {

        console.error("Error al actualizar contador:", error);

    }

}

document.addEventListener("DOMContentLoaded", actualizarContador);