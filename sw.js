// sw.js - Service Worker de DBGEO 2026
const CACHE_NAME = 'dbgeo-cache-v1';

// Archivos esenciales que se guardarán para acceso sin internet
const urlsToCache = [
    '/',
    '/index.html',
    '/auditoria.html',
    '/tecnologia.html',
    '/laboratorio.html',
    '/css/style.css',
    '/js/main.js',
    '/img/logo-header.png'
];

// Instalación: Guarda los archivos en caché
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Petición (Fetch): Si no hay internet, saca la web del caché
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Devuelve el archivo del caché si existe, sino lo busca en la red
                return response || fetch(event.request);
            })
    );
});