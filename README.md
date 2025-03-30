|||
|---|---|
|ДИСЦИПЛИНА|Фронтенд и бэкенд разработка|
|ИНСТИТУТ|ИПТИП|
|КАФЕДРА|Индустриального программирования|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|
|ПРЕПОДАВАТЕЛЬ|Астафьев Рустам Уралович|
|СЕМЕСТР|2 семестр, 2024/2025 уч. год|

---

### **Практическое занятие 15: Кэширование и файлы cookie**

**Введение**  
Веб-приложения часто работают с данными, которые не должны загружаться заново при каждом запросе. Например, стили сайта, логотип или настройки пользователя могут сохраняться на стороне клиента или сервера, чтобы ускорить загрузку и улучшить пользовательский опыт. Два ключевых механизма для этого — **кэширование** и **файлы cookie**.  

Кэширование позволяет временно хранить данные (например, статические файлы) на клиенте или сервере, чтобы сократить количество запросов к бэкенду. Cookies же чаще используются для хранения небольших фрагментов информации, связанных с пользователем: токенов авторизации, предпочтений языка или данных сессии.  

**Файлы cookie: основы**  
Cookie — это небольшие текстовые данные (до 4 КБ), которые сервер отправляет браузеру, а браузер автоматически прикрепляет к последующим запросам. Они могут содержать, например, идентификатор сессии или настройки темы интерфейса.  

В JavaScript с cookie можно работать через свойство `document.cookie`. Например, чтобы установить cookie с именем `theme` и значением `dark`, можно написать:  

```javascript
document.cookie = "theme=dark; path=/; max-age=3600";  
```  

Здесь `path=/` означает, что cookie доступен на всех страницах сайта, а `max-age=3600` устанавливает срок жизни в 1 час.  

Если нужно прочитать все cookies, можно обратиться к `document.cookie`:  

```javascript
console.log(document.cookie); // Выведет строку вида "theme=dark; sessionId=abc123"  
```  

Для удаления cookie достаточно установить его с истёкшим сроком:  

```javascript
document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";  
```  

**Безопасность cookie**  
По умолчанию cookie уязвимы к атакам, например, XSS (кражей через JavaScript). Чтобы снизить риски, используют флаги:  
- `HttpOnly` — запрещает доступ к cookie из JavaScript (защита от XSS).  
- `Secure` — передача только по HTTPS.  
- `SameSite` — запрещает отправку cookie в запросах с других сайтов (защита от CSRF).  

Пример cookie, защищённого от XSS:  

```javascript
// Серверный код (Node.js + Express)  
res.cookie('sessionId', 'abc123', {  
  httpOnly: true,  
  secure: true,  
  sameSite: 'strict'  
});  
```  

**Кэширование на стороне клиента**  
Браузер может кэшировать статические файлы (CSS, JS, изображения), чтобы не загружать их повторно. За это отвечают HTTP-заголовки, которые сервер отправляет с ответом:  
- `Cache-Control: max-age=3600` — кэшировать на 1 час.  
- `ETag` — уникальный хэш файла для проверки изменений.  

Пример настройки кэширования в Nginx для статических файлов:  

```nginx
location /static/ {  
  expires 1y;  
  add_header Cache-Control "public";  
}  
```  

Если файл изменится, браузер получит новую версию благодаря уникальному URL (например, `/static/app.js?v=2`).  

**Серверное кэширование**  
Сервер может кэшировать ответы API или часто запрашиваемые данные, чтобы снизить нагрузку на базу данных. Популярное решение — **Redis**.  

Пример кэширования в Node.js с Redis:  

```javascript
const redis = require('redis');  
const client = redis.createClient();  

// Пытаемся получить данные из кэша  
client.get('cached_data', (err, reply) => {  
  if (reply) {  
    console.log('Данные из кэша:', reply);  
  } else {  
    // Если в кэше пусто, загружаем из БД и сохраняем  
    const data = fetchDataFromDB();  
    client.setex('cached_data', 3600, JSON.stringify(data)); // Кэш на 1 час  
  }  
});  
```  

---

### **Кросс-платформенный пример: Веб-приложение с кэшированием и cookies**

---

## **1. Структура проекта**
```
project/
├── server.js         # Бэкенд (Node.js)
├── cache/            # Файловый кэш API-ответов
├── public/
│   ├── index.html    # Фронтенд
│   ├── script.js
│   └── styles.css
```

---

## **2. Серверная часть (`server.js`)**

```javascript
const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const cacheDir = path.join(__dirname, 'cache');

// Создаем папку для кэша, если её нет
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir);
}

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// Функция для кэширования данных в файлы
function getCachedData(key, ttlSeconds = 30) {
  const cacheFile = path.join(cacheDir, `${key}.json`);

  // Если файл существует и не устарел
  if (fs.existsSync(cacheFile)) {
    const stats = fs.statSync(cacheFile);
    const now = new Date().getTime();
    const fileAge = (now - stats.mtimeMs) / 1000;

    if (fileAge < ttlSeconds) {
      const cachedData = fs.readFileSync(cacheFile, 'utf-8');
      return JSON.parse(cachedData);
    }
  }

  // Генерируем новые данные
  const newData = { 
    items: [1, 2, 3], 
    timestamp: Date.now(),
    source: 'Файловый кэш'
  };

  // Сохраняем в файл
  fs.writeFileSync(cacheFile, JSON.stringify(newData));

  // Удаляем файл после истечения TTL
  setTimeout(() => {
    if (fs.existsSync(cacheFile)) {
      fs.unlinkSync(cacheFile);
    }
  }, ttlSeconds * 1000);

  return newData;
}

// API для получения данных
app.get('/api/data', (req, res) => {
  const data = getCachedData('api_data');
  res.json(data);
});

// API для сохранения темы
app.post('/theme', (req, res) => {
  const theme = req.body.theme;
  res.cookie('theme', theme, {
    maxAge: 86400000, // 1 день
    httpOnly: true,
    sameSite: 'strict'
  });
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
  console.log('Кэш хранится в папке:', cacheDir);
});
```

---

## **3. Фронтенд (`public/index.html`)**

```html
<!DOCTYPE html>
<html lang="ru" data-theme="light">
<head>
  <meta charset="UTF-8">
  <title>Кэширование без Redis</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <h1>Демонстрация кэширования</h1>
  <div class="controls">
    <button id="toggle-theme">Сменить тему</button>
    <button id="refresh-data">Обновить данные</button>
  </div>
  <div id="data-container"></div>
  <script src="/script.js"></script>
</body>
</html>
```

---

## **4. Стили (`public/styles.css`)**

```css
body {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  transition: background 0.3s, color 0.3s;
}

body[data-theme="light"] {
  background: #f5f5f5;
  color: #333;
}

body[data-theme="dark"] {
  background: #222;
  color: #fff;
}

button {
  padding: 8px 16px;
  margin: 0 10px 10px 0;
  cursor: pointer;
}

#data-container {
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
}

body[data-theme="light"] #data-container {
  background: #fff;
  border: 1px solid #ddd;
}

body[data-theme="dark"] #data-container {
  background: #333;
  border: 1px solid #444;
}
```

---

## **5. Клиентский скрипт (`public/script.js`)**

```javascript
// Загрузка темы из cookie
function loadTheme() {
  const themeCookie = document.cookie.split('; ')
    .find(row => row.startsWith('theme='));
  
  if (themeCookie) {
    const theme = themeCookie.split('=')[1];
    document.documentElement.setAttribute('data-theme', theme);
  }
}

// Обновление данных
async function updateData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  
  document.getElementById('data-container').innerHTML = `
    <h3>Данные API</h3>
    <p><strong>Источник:</strong> ${data.source}</p>
    <p><strong>Время генерации:</strong> ${new Date(data.timestamp).toLocaleTimeString()}</p>
    <pre>${JSON.stringify(data.items, null, 2)}</pre>
  `;
}

// Смена темы
document.getElementById('toggle-theme').addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  
  fetch('/theme', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ theme: newTheme })
  });
});

// Кнопка обновления данных
document.getElementById('refresh-data').addEventListener('click', updateData);

// Инициализация
loadTheme();
updateData();

// Автообновление каждые 5 секунд
setInterval(updateData, 5000);
```

---

## **6. Запуск приложения**

1. Установите зависимости:
   ```bash
   npm init -y
   npm install express cookie-parser
   ```

2. Запустите сервер:
   ```bash
   node server.js
   ```

3. Откройте в браузере:
   ```
   http://localhost:3000
   ```

---

## **7. Дополнительные улучшения**

1. **Оптимизация статики**:
   Добавьте в `server.js`:
   ```javascript
   app.use((req, res, next) => {
     if (req.url.endsWith('.js') || req.url.endsWith('.css')) {
       res.set('Cache-Control', 'public, max-age=86400');
     }
     next();
   });
   ```

2. **Логирование**:
   ```javascript
   app.use((req, res, next) => {
     console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
     next();
   });
   ```

3. **Обработка ошибок**:
   ```javascript
   process.on('uncaughtException', (err) => {
     console.error('Необработанная ошибка:', err);
   });
   ```

   **Заключение**  
Кэширование и cookies — важные механизмы для оптимизации и персонализации веб-приложений. Cookies удобны для хранения пользовательских данных, но требуют внимания к безопасности. Кэширование ускоряет загрузку, но важно правильно настраивать сроки жизни данных.  

На практике стоит комбинировать оба подхода: например, использовать cookie для сессий, а Redis — для кэширования API. В следующем занятии мы разберём, как управлять состоянием пользователя и реализовывать авторизацию.  
