const NOMBRE_CACHE = "reloj-pwa-v1";

const ARCHIVOS_A_CACHEAR = [
  "./index.html",
  "./app.js",
  "./manifest.json"
];

self.addEventListener("install", (evento) => {
  console.log("[SW] Instalando Service Worker...");

  evento.waitUntil(
    caches.open(NOMBRE_CACHE).then((cache) => {
      console.log("[SW] Archivos guardados en caché");
      return cache.addAll(ARCHIVOS_A_CACHEAR);
    })
  );

  self.skipWaiting();
});


self.addEventListener("activate", (evento) => {
  console.log("[SW] Service Worker activo");

  evento.waitUntil(
    caches.keys().then((nombresDeCaches) => {
      return Promise.all(
        nombresDeCaches
          .filter((nombre) => nombre !== NOMBRE_CACHE) 
          .map((nombreAntiguo) => {
            console.log("[SW] Eliminando caché antigua:", nombreAntiguo);
            return caches.delete(nombreAntiguo);
          })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", (evento) => {
  evento.respondWith(
    caches.match(evento.request).then((respuestaEnCache) => {
      if (respuestaEnCache) {
        return respuestaEnCache;
      }
      return fetch(evento.request);
    })
  );
});