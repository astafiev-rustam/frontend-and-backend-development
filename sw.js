// Версия кэша - при обновлении приложения измените эту версию
const CACHE_NAME = 'app-shell-v2';
const DYNAMIC_CACHE_NAME = 'dynamic-content-v1';

// Файлы, которые будут закэшированы при установке (App Shell)
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/content/home.html',  // Основной контент для быстрой загрузки
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Установка Service Worker и кэширование App Shell
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Установка');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Кэширование App Shell');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[Service Worker] Пропуск фазы ожидания');
        return self.skipWaiting();
      })
  );
});

// Активация и очистка старых кэшей
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Активация');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
            console.log('[Service Worker] Удаление старого кэша:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('[Service Worker] Активация завершена');
      return self.clients.claim();
    })
  );
});

// Стратегия кэширования: Cache First с fallback к сети
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  
  // Пропускаем запросы к API и другие некритичные ресурсы
  if (requestUrl.origin !== location.origin) {
    return;
  }

  // Для App Shell используем Cache First
  if (STATIC_ASSETS.includes(requestUrl.pathname)) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          return cachedResponse || fetch(event.request);
        })
    );
  } 
  // Для динамического контента используем Network First
  else if (event.request.url.includes('/content/')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Кэшируем успешные ответы
          return caches.open(DYNAMIC_CACHE_NAME)
            .then((cache) => {
              cache.put(event.request.url, networkResponse.clone());
              return networkResponse;
            });
        })
        .catch(() => {
          // Fallback к кэшу если нет сети
          return caches.match(event.request)
            .then((cachedResponse) => {
              return cachedResponse || caches.match('/content/home.html');
            });
        })
    );
  }
});