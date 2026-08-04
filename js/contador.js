const URL_CONTADOR =
    "https://script.google.com/macros/s/AKfycbxec01HNqgwCn8auC-x5w7YxZGXRvZloU3_XgM9yyGyflEZGTsh6u44IIyJChPUrdxrfA/exec";

const INTERVALO_ACTUALIZACION = 30000; // 30 segundos
const MAX_REINTENTOS = 3;
const RETRASO_REINTENTO = 2000;
const TIMEOUT = 10000;

let actualizando = false;

async function fetchConTimeout(url, timeout = TIMEOUT) {

    const controller = new AbortController();

    const timer = setTimeout(() => {
        controller.abort();
    }, timeout);

    try {

        const respuesta = await fetch(url, {
            cache: "no-store",
            signal: controller.signal
        });

        clearTimeout(timer);

        return respuesta;

    } catch (error) {

        clearTimeout(timer);

        throw error;

    }

}

async function actualizarContador(intento = 1) {

    if (actualizando) return;

    actualizando = true;

    try {

        const respuesta = await fetchConTimeout(
            `${URL_CONTADOR}?t=${Date.now()}`
        );

        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        // Compatibilidad con distintas versiones
        const firmas = Number(datos.FIRMAS ?? datos.firmas ?? 0);
        const calles = Number(datos.CALLES_UNICAS ?? 0);
        const comunicadoSi = Number(datos.COMUNICADO_SI ?? 0);
        const actualizado = datos.actualizado ?? datos.ULTIMA_ACTUALIZACION;

        // ==========================
        // CONTADOR PRINCIPAL
        // ==========================

        const contador = document.getElementById("contador");

        if (contador) {
            contador.textContent = firmas.toLocaleString("es-ES");
        }

        // ==========================
        // CALLES REPRESENTADAS
        // ==========================

        const contadorCalles =
            document.getElementById("contador-calles");

        if (contadorCalles) {
            contadorCalles.textContent =
                calles.toLocaleString("es-ES");
        }

        // ==========================
        // COMUNICADOS PREVIOS
        // ==========================

        const contadorComunicados =
            document.getElementById("contador-comunicados");

        if (contadorComunicados) {
            contadorComunicados.textContent =
                comunicadoSi.toLocaleString("es-ES");
        }

        // ==========================
        // FECHA ACTUALIZACIÓN
        // ==========================

        const fechaActualizacion =
            document.getElementById("actualizacion");

        if (fechaActualizacion && actualizado) {

            const fecha = new Date(actualizado);

            if (!isNaN(fecha.getTime())) {

                fechaActualizacion.textContent =
                    fecha.toLocaleString("es-ES");

            }

        }

    } catch (error) {

        console.warn(
            `Error al actualizar el contador (intento ${intento}/${MAX_REINTENTOS})`,
            error
        );

        if (intento < MAX_REINTENTOS) {

            setTimeout(() => {
                actualizarContador(intento + 1);
            }, RETRASO_REINTENTO);

        }

    } finally {

        actualizando = false;

    }

}

document.addEventListener("DOMContentLoaded", () => {

    actualizarContador();

    setInterval(() => {
        actualizarContador();
    }, INTERVALO_ACTUALIZACION);

});
const calles = document.getElementById("calles");

if (calles && datos.CALLES_UNICAS !== undefined) {
    calles.textContent = Number(datos.CALLES_UNICAS).toLocaleString("es-ES");
}