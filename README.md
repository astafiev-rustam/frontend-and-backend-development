|||
|---|---|
|ДИСЦИПЛИНА|Фронтенд и бэкенд разработка|
|ИНСТИТУТ|ИПТИП|
|КАФЕДРА|Индустриального программирования|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|
|ПРЕПОДАВАТЕЛЬ|Астафьев Рустам Уралович|
|СЕМЕСТР|2 семестр, 2024/2025 уч. год|

---

### **Практическое занятие 19: HTTPS и App Shell**

---

#### **Введение в безопасное соединение и мгновенную загрузку**

Представьте, что вы разрабатываете веб-приложение для заметок. Пользователи жалуются, что при плохом интернете приложение не загружается, а браузер показывает предупреждение о небезопасном соединении. Сегодня мы решим обе проблемы: настроим HTTPS для безопасности и реализуем App Shell для мгновенной загрузки.

#### **Шаг 1: Настройка локального HTTPS (практический пример)**

**Проблема:** Браузер блокирует важные функции PWA без HTTPS.

**Решение:** Создадим локальный HTTPS-сервер за 10 минут.

1. Устанавливаем mkcert (Windows/macOS/Linux):
   ```bash
   # Для Windows (Chocolatey):
   choco install mkcert

   # Для macOS (Homebrew):
   brew install mkcert
   ```

2. Генерируем сертификаты:
   ```bash
   mkcert -install
   mkcert localhost 127.0.0.1 ::1
   ```
   После выполнения в папке появятся два файла: `localhost.pem` (сертификат) и `localhost-key.pem` (ключ).

3. Запускаем сервер с HTTPS:
   ```bash
   npx http-server --ssl --cert localhost.pem --key localhost-key.pem -p 3000
   ```
   Открываем в браузере: `https://localhost:3000`. Видим замок 🔒 в адресной строке – это подтверждение успешной настройки.

**Проверка безопасности:**
1. Открываем DevTools (F12)
2. Переходим на вкладку "Security"
3. Видим статус "Secure" и информацию о сертификате

#### **Шаг 2: Создание App Shell (реальный пример)**

**Проблема:** Приложение долго загружается на медленных соединениях.

**Решение:** Реализуем мгновенную загрузку интерфейса.

#### **Контекст и подготовка**
Перед началом убедитесь, что у вас:
1. Установлен Node.js (версия 16+)
2. Текстовый редактор (VS Code, Sublime Text)
3. Браузер Chrome или Edge (для DevTools)

#### **Создание структуры проекта**
Создайте новую папку проекта и следующие файлы:

**1. index.html** - основной каркас приложения:
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мои заметки</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#4a76a8">
</head>
<body>
    <div class="app-shell">
        <header class="app-header">
            <h1>Мои заметки</h1>
        </header>
        <nav class="app-nav">
            <button id="home-btn" class="nav-btn active">Главная</button>
            <button id="about-btn" class="nav-btn">О приложении</button>
        </nav>
        <main id="app-content" class="app-main">
            <!-- Контент будет загружаться здесь -->
        </main>
    </div>
    <script src="app.js"></script>
</body>
</html>
```

**2. styles.css** - базовые стили:
```css
body {
    font-family: 'Segoe UI', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
}

.app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.app-header {
    background-color: #4a76a8;
    color: white;
    padding: 1rem;
    text-align: center;
}

.app-nav {
    display: flex;
    background-color: #3a6399;
}

.nav-btn {
    flex: 1;
    padding: 1rem;
    border: none;
    background: none;
    color: white;
    cursor: pointer;
}

.nav-btn.active {
    background-color: #2d4d73;
}

.app-main {
    flex: 1;
    padding: 2rem;
    background-color: white;
}
```

**3. app.js** - основная логика:
```javascript
// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    // Загрузка начального контента
    loadContent('home');
    
    // Обработчики кнопок навигации
    document.getElementById('home-btn').addEventListener('click', () => {
        setActiveButton('home-btn');
        loadContent('home');
    });
    
    document.getElementById('about-btn').addEventListener('click', () => {
        setActiveButton('about-btn');
        loadContent('about');
    });
});

// Функция загрузки контента
async function loadContent(page) {
    try {
        const response = await fetch(`/content/${page}.html`);
        const content = await response.text();
        document.getElementById('app-content').innerHTML = content;
    } catch (error) {
        document.getElementById('app-content').innerHTML = `
            <div class="error">
                <h2>Ошибка загрузки</h2>
                <p>Не удалось загрузить содержимое страницы</p>
            </div>
        `;
    }
}

// Функция активации кнопки
function setActiveButton(buttonId) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(buttonId).classList.add('active');
}

// Регистрация Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker зарегистрирован');
            })
            .catch(error => {
                console.log('Ошибка регистрации:', error);
            });
    });
}
```

**4. Создаем папку content с HTML-фрагментами**
```
/content
   ├── home.html
   └── about.html
```

**home.html**:
```html
<div class="home-content">
    <h2>Добро пожаловать!</h2>
    <p>Это приложение для заметок с мгновенной загрузкой.</p>
    <button id="new-note-btn">Создать заметку</button>
</div>
```

**about.html**:
```html
<div class="about-content">
    <h2>О приложении</h2>
    <p>Версия 1.0.0</p>
    <p>Использует технологию App Shell для быстрой загрузки</p>
</div>
```

**5. manifest.json** - конфигурация PWA:
```json
{
    "name": "Мои заметки",
    "short_name": "Заметки",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#f5f5f5",
    "theme_color": "#4a76a8",
    "icons": [
        {
            "src": "icons/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "icons/icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
}
```

Добавьте необходимые иконки для приложения

### **Файл sw.js: Полная реализация Service Worker для App Shell**

Вот готовый файл `sw.js`, который необходимо добавить в корень вашего проекта (рядом с `index.html`):

```javascript
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
```

### **Как интегрировать этот файл в проект:**

Для регистрации Service Worker добавьте в `app.js` следующий код (если его еще нет):

```javascript
// Регистрация Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('ServiceWorker зарегистрирован:', registration.scope);
      })
      .catch(function(err) {
        console.log('Ошибка регистрации ServiceWorker:', err);
      });
  });
}
```

#### **Запуск приложения**

1. Установите http-server глобально:
```bash
npm install -g http-server
```

2. Запустите сервер из папки проекта:
```bash
http-server -p 3000
```

3. Откройте в браузере:
```
http://localhost:3000
```

4. Для тестирования PWA:
- В Chrome: Откройте DevTools (F12)
- Перейдите на вкладку "Application" → "Manifest"
- Нажмите "Add to homescreen" для проверки установки

#### **Проверка работы App Shell**

1. В DevTools перейдите на вкладку "Network"
2. Установите throttling на "Slow 3G"
3. Обновите страницу (Ctrl+R)
4. Наблюдайте:
   - Мгновенную загрузку каркаса приложения
   - Задержку при загрузке содержимого страниц

5. Проверьте офлайн-режим:
   - В DevTools: "Application" → "Service Workers"
   - Отметьте "Offline"
   - Обновите страницу
   - Убедитесь, что каркас приложения работает без интернета

**Совет для продвинутых:** Попробуйте добавить индикатор загрузки, который будет показываться при запросе нового контента и скрываться после его получения. Это улучшит пользовательский опыт.
