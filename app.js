window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./sw.js")
      .then((registro) => {
        console.log("[App] Service Worker registrado con éxito:", registro.scope);
      })
      .catch((error) => {
        console.error("[App] Error al registrar el Service Worker:", error);
      });
  } else {
    console.warn("[App] Este navegador no soporta Service Workers.");
  }
});

function animarCambio(id) {
  const el = document.getElementById(id);
  el.classList.add("cambio");
  setTimeout(() => el.classList.remove("cambio"), 150);
}

function agregarCeroIzquierda(numero) {
  return numero < 10 ? "0" + numero : String(numero);
}


function actualizarReloj() {
  const ahora = new Date();

  const horas   = agregarCeroIzquierda(ahora.getHours());
  const minutos = agregarCeroIzquierda(ahora.getMinutes());
  const segundos = agregarCeroIzquierda(ahora.getSeconds());

  document.getElementById("horas").textContent = horas;
  animarCambio("horas");
  
  document.getElementById("minutos").textContent = minutos;
  animarCambio("minutos");
  
  document.getElementById("segundos").textContent = segundos;
  animarCambio("segundos");

  const opcionesFecha = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  document.getElementById("fecha").textContent = ahora.toLocaleDateString("es-MX", opcionesFecha);
}

actualizarReloj();

setInterval(actualizarReloj, 1000);