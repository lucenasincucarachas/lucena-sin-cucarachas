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

        const total = document.getElementById("total-respuestas");

        if (total) {

            total.textContent =
                Number(datos.totalRespuestas).toLocaleString("es-ES");

        }

        const duplicados = document.getElementById("duplicados");

        if (duplicados) {

            duplicados.textContent =
                Number(datos.duplicados).toLocaleString("es-ES");

        }

        const actualizacion = document.getElementById("actualizacion");

        if (actualizacion) {

            const fecha = new Date(datos.actualizado);

            actualizacion.textContent =
                fecha.toLocaleString("es-ES");

        }

    }

    catch (error) {

        console.error(error);

    }

}

document.addEventListener("DOMContentLoaded", actualizarContador);