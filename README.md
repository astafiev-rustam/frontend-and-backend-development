|||
|---|---|
|ДИСЦИПЛИНА|Фронтенд и бэкенд разработка|
|ИНСТИТУТ|ИПТИП|
|КАФЕДРА|Индустриального программирования|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|
|ПРЕПОДАВАТЕЛЬ|Астафьев Рустам Уралович|
|СЕМЕСТР|2 семестр, 2024/2025 уч. год|

---

### **Практическое занятие 20: PWA с Push-уведомления**

---

#### 1. Создаем структуру проекта
```bash
mkdir pwa-push-demo
cd pwa-push-demo
mkdir -p client/icons server
```

#### 2. Инициализируем проект
```bash
npm init -y
cd server
npm install express web-push dotenv
```

#### 3. Полное содержимое всех файлов:

**client/index.html**
```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Push Demo</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#4a76a8">
</head>
<body>
  <div class="container">
    <h1>Push-уведомления</h1>
    <button id="subscribeBtn">Подписаться</button>
    <div id="status">Статус: проверка...</div>
    <div class="send-box">
      <h3>Тест:</h3>
      <input type="text" id="titleInput" value="Новое уведомление">
      <textarea id="bodyInput">Привет! Это тест push-сообщения</textarea>
      <button id="sendBtn">Отправить тест</button>
    </div>
  </div>
  <script src="app.js"></script>
</body>
</html>
```

**client/styles.css**
```css
body {
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
}

.container {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

button {
  background: #4a76a8;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px 0;
  transition: background 0.3s;
}

button:hover {
  background: #3a6399;
}

#status {
  padding: 12px;
  background: #f0f0f0;
  border-radius: 4px;
  margin: 15px 0;
}

.send-box {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

input, textarea {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

textarea {
  height: 100px;
  resize: vertical;
}
```

**client/manifest.json**
```json
{
  "name": "Push Demo",
  "short_name": "PushDemo",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#4a76a8",
  "description": "Демонстрация push-уведомлений",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**client/app.js**
```javascript
const VAPID_PUBLIC_KEY = 'BANyYVYp6Ne3cULh5y8QE9NWuPXtTpwPUc3DJllSANezWTM-jkKu8Ma29JbMveNJyv_bA_B3u_wSuQi2j1cyUtg'
const VAPID_PRIVATE_KEY='VH6lg8zKldw7AxC6zB1vcUmOXP6DAzItk4LtmeVWCj4'
const VAPID_EMAIL='your@email.com'
const PORT='3000'

// В начале app.js
console.log('VAPID Key:', VAPID_PUBLIC_KEY);
console.log('Key length:', VAPID_PUBLIC_KEY.length);

if (VAPID_PUBLIC_KEY.length !== 87 || !VAPID_PUBLIC_KEY.startsWith('B')) {
  alert('ОШИБКА: Неверный формат VAPID ключа! Проверьте консоль.');
  console.error('Ключ должен быть 87 символов и начинаться с "B"');
}

// Проверка поддержки
if (!('serviceWorker' in navigator)) {
  updateStatus('Service Worker не поддерживается', 'red');
  document.getElementById('subscribeBtn').disabled = true;
}

// Инициализация
document.addEventListener('DOMContentLoaded', init);

async function init() {
  try {
    const reg = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker зарегистрирован');
    
    const subscription = await reg.pushManager.getSubscription();
    updateUI(subscription);
    
    setupEventHandlers(reg, subscription);
  } catch (error) {
    console.error('Ошибка инициализации:', error);
    updateStatus(`Ошибка: ${error.message}`, 'red');
  }
}

function setupEventHandlers(reg, subscription) {
  document.getElementById('subscribeBtn').addEventListener('click', async () => {
    try {
      if (subscription) {
        await unsubscribe(subscription);
        updateUI(null);
      } else {
        const newSub = await subscribe(reg);
        updateUI(newSub);
      }
    } catch (error) {
      console.error('Ошибка:', error);
      updateStatus(`Ошибка: ${error.message}`, 'red');
    }
  });

  document.getElementById('sendBtn').addEventListener('click', sendTestNotification);
}

async function subscribe(reg) {
  const subscription = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
  });
  
  await fetch('/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription)
  });
  
  return subscription;
}

async function unsubscribe(subscription) {
  await subscription.unsubscribe();
  await fetch('/unsubscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ endpoint: subscription.endpoint })
  });
}

async function sendTestNotification() {
  const title = document.getElementById('titleInput').value;
  const body = document.getElementById('bodyInput').value;
  
  try {
    const response = await fetch('/send-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body })
    });
    
    if (!response.ok) throw new Error('Ошибка сервера');
    updateStatus('Уведомление отправлено!', 'green');
  } catch (error) {
    console.error('Ошибка отправки:', error);
    updateStatus(`Ошибка: ${error.message}`, 'red');
  }
}

function updateUI(subscription) {
  const btn = document.getElementById('subscribeBtn');
  if (subscription) {
    btn.textContent = 'Отписаться';
    updateStatus('Подписка активна', 'green');
  } else {
    btn.textContent = 'Подписаться';
    updateStatus('Не подписано', 'gray');
  }
}

function updateStatus(text, color) {
  const el = document.getElementById('status');
  el.textContent = `Статус: ${text}`;
  el.style.color = color;
}

function urlBase64ToUint8Array(base64String) {
    // Удаляем возможные пробелы и лишние символы
    base64String = base64String.trim();
    
    // Проверка длины ключа
    if (base64String.length !== 87) {
      throw new Error(`Неверная длина ключа: ${base64String.length} (должно быть 87)`);
    }
  
    // Стандартное преобразование
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    try {
      const rawData = atob(base64);
      const outputArray = new Uint8Array(rawData.length);
  
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    } catch (e) {
      throw new Error(`Ошибка декодирования: ${e.message}`);
    }
}
```

**client/sw.js**
```javascript
const CACHE_NAME = 'push-demo-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/icons/icon-192.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('push', (event) => {
  const data = event.data?.json() || {
    title: 'Новое уведомление',
    body: 'У вас новое сообщение',
    icon: '/icons/icon-192.png'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      vibrate: [200, 100, 200],
      data: { url: data.url || '/' }
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

**server/index.js**
```javascript
require('dotenv').config();
const express = require('express');
const webPush = require('web-push');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Инициализация VAPID
webPush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL}`,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// Хранилище подписок
let subscriptions = [];

// API для подписки
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  if (!subscriptions.some(s => s.endpoint === subscription.endpoint)) {
    subscriptions.push(subscription);
    console.log('Добавлена подписка:', subscription.endpoint);
  }
  res.status(201).json({});
});

// API для отписки
app.post('/unsubscribe', (req, res) => {
  const { endpoint } = req.body;
  subscriptions = subscriptions.filter(s => s.endpoint !== endpoint);
  console.log('Удалена подписка:', endpoint);
  res.status(200).json({});
});

// Отправка уведомлений
app.post('/send-notification', (req, res) => {
  const { title, body } = req.body;
  
  const payload = JSON.stringify({
    title: title || 'Тестовое уведомление',
    body: body || 'Это тестовое сообщение',
    icon: '/icons/icon-192.png',
    url: '/'
  });

  const results = [];
  const promises = subscriptions.map(sub => 
    webPush.sendNotification(sub, payload)
      .then(() => results.push({ status: 'success', endpoint: sub.endpoint }))
      .catch(err => {
        console.error('Ошибка отправки:', err);
        results.push({ status: 'error', endpoint: sub.endpoint, error: err.message });
      })
  );

  Promise.all(promises)
    .then(() => res.json({ results }))
    .catch(err => res.status(500).json({ error: err.message }));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
  console.log('VAPID Public Key:', process.env.VAPID_PUBLIC_KEY);
});
```

#### 4. Иконки (поместить в client/icons)
Скачайте пример иконок и разместите в папке

#### 5. Запуск проекта
1. Сгенерируйте VAPID-ключи:
   ```bash
   npx web-push generate-vapid-keys --json
   ```
   Скопируйте вывод в раздел файла

2. Запустите сервер:
   ```bash
   cd server
   node index.js
   ```

3. Откройте в браузере:
   ```
   http://localhost:3000
   ```

4. Тестирование:
   - Нажмите "Подписаться" и разрешите уведомления
   - Отправьте тестовое сообщение через форму
   - Проверьте получение уведомлений даже при закрытой вкладке

#### 6. Дополнительные команды для тестирования
Отправка через curl:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"title":"Тест","body":"Работает!"}' http://localhost:3000/send-notification
```

Проверка Service Worker:
1. Chrome DevTools → Application → Service Workers
2. Проверьте статус регистрации
3. Эмуляция push-событий через "Push" button

Перейдем к рассмотрению базового задания №8
