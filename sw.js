/**
 * INAUS TECHNOLOGIES - Service Worker (PWA)
 * Arquitectura Offline & Caché Dinámica
 */

const CACHE_NAME = 'inaus-core-v3'; // BUMP VERSION: Fuerza la actualización de los HTML nuevos
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/auditoria.html',
  '/informatica.html',
  '/laboratorio.html',
  '/nosotros.html',
  '/nodos.html',
  '/contacto.html',
  '/academia.html',
  '/perspectivas.html',
  '/legales.html',
  '/css/style.css',
  '/js/main.js',
  '/img/logo-inaus.png',
  '/img/tech-terminal.png',
  '/img/miguel-perfil.jpg'
];

// 1. INSTALACIÓN: Guardar en la bóveda (Caché)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Guardando activos críticos INAUS en caché');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// 2. ACTIVACIÓN: Purgar versiones antiguas (Limpieza de "Efecto Laberinto")
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Purgando caché obsoleta:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. ESTRATEGIA DE RED: Stale-While-Revalidate (Caché primero, luego actualiza en fondo)
self.addEventListener('fetch', (event) => {
  // Ignorar peticiones a APIs externas (como formspree o google analytics)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      });
      return cachedResponse || fetchPromise;
    })
  );
});