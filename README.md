|||
|---|---|
|ДИСЦИПЛИНА|Фронтенд и бэкенд разработка|
|ИНСТИТУТ|ИПТИП|
|КАФЕДРА|Индустриального программирования|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|
|ПРЕПОДАВАТЕЛЬ|Астафьев Рустам Уралович|
|СЕМЕСТР|2 семестр, 2024/2025 уч. год|

---

### **Практическое занятие 14: JWT токены**

---

#### Введение

На прошлом занятии мы познакомились с процессом аутентификации и узнали, как токены помогают управлять доступом пользователей. Сегодня мы углубимся в тему JWT (JSON Web Tokens) — одного из самых популярных типов токенов, который широко используется в современных веб-приложениях. Мы разберем, что такое JWT, как они устроены, и как их можно использовать для реализации безопасной аутентификации.

JWT — это мощный инструмент, который позволяет передавать информацию между клиентом и сервером в компактном и безопасном формате. В этом занятии мы изучим структуру JWT, принципы их работы, а также рассмотрим практические примеры использования.

---

#### Что такое JWT?

JWT (JSON Web Token) — это стандарт для создания токенов, который позволяет передавать данные между сторонами в виде JSON-объекта. JWT состоит из трех частей: заголовка, полезной нагрузки и подписи. Эти части кодируются в формат Base64 и объединяются через точку, образуя компактную строку.

Пример JWT:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYzMzAyNzIyMn0.5f5z5x5y5z5x5y5z5x5y5z5x5y5z5x5y5z5x5y5z
```

**Заголовок (Header):**
Содержит информацию о типе токена (JWT) и алгоритме шифрования, который используется для создания подписи. Например:
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Полезная нагрузка (Payload):**
Содержит данные о пользователе, такие как его идентификатор, роль, срок действия токена и другие claims (утверждения). Например:
```json
{
  "userId": 1,
  "username": "user1",
  "iat": 1633027222,
  "exp": 1633030822
}
```

**Подпись (Signature):**
Используется для проверки подлинности токена. Подпись создается путем шифрования заголовка и полезной нагрузки с использованием секретного ключа и алгоритма, указанного в заголовке.

---

#### Как работают JWT?

1. **Генерация токена:**
   После успешной аутентификации сервер создает JWT, подписывает его с использованием секретного ключа и отправляет клиенту.

2. **Использование токена:**
   Клиент сохраняет JWT (например, в localStorage или куках) и отправляет его с каждым запросом к защищенным ресурсам.

3. **Проверка токена:**
   Сервер проверяет подпись JWT и, если она верна, извлекает данные из полезной нагрузки. Это позволяет серверу идентифицировать пользователя без необходимости хранения состояния.

---

#### Преимущества JWT

1. **Stateless:**
   JWT не требуют хранения состояния на сервере, что упрощает масштабирование приложения.

2. **Компактность:**
   JWT представляют собой компактные строки, которые легко передавать по сети.

3. **Гибкость:**
   JWT могут содержать любые данные, что делает их универсальным инструментом для аутентификации и передачи информации.

4. **Безопасность:**
   Подпись JWT обеспечивает защиту от подделки токенов.

---

#### Пример реализации аутентификации с использованием JWT

---

### Шаг 1: Настройка бэкенда

1. Создайте новую директорию для проекта и инициализируйте Node.js проект:
   ```bash
   npm init -y
   ```

2. Установите необходимые зависимости:
   ```bash
   npm install express jsonwebtoken body-parser cors dotenv
   ```
   - `cors`: для обработки CORS-запросов (чтобы фронтенд мог взаимодействовать с бэкендом).

3. Создайте файл `.env` и добавьте секретный ключ для JWT:
   ```
   JWT_SECRET=your_secret_key
   ```

4. Создайте файл `server.js` и настройте базовый сервер:
   ```javascript
   const express = require('express');
   const bodyParser = require('body-parser');
   const jwt = require('jsonwebtoken');
   const cors = require('cors');
   const dotenv = require('dotenv');

   dotenv.config();
   const app = express();
   const PORT = 3000;

   app.use(bodyParser.json());
   app.use(cors());

   let users = []; // "База данных" пользователей

   app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
   });
   ```

---

### Шаг 2: Реализация маршрутов

1. **Регистрация пользователя (`/register`):**
   - Принимает username и password.
   - Сохраняет пользователя в массиве `users`.
   ```javascript
   app.post('/register', (req, res) => {
       const { username, password } = req.body;

       if (users.find(u => u.username === username)) {
           return res.status(400).json({ message: 'User already exists' });
       }

       const newUser = { id: users.length + 1, username, password };
       users.push(newUser);

       res.status(201).json({ message: 'User registered successfully' });
   });
   ```

2. **Аутентификация пользователя (`/login`):**
   - Принимает username и password.
   - Проверяет наличие пользователя в массиве `users`.
   - Генерирует JWT токен, если данные верны.
   ```javascript
   app.post('/login', (req, res) => {
       const { username, password } = req.body;

       const user = users.find(u => u.username === username && u.password === password);

       if (user) {
           const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
           res.json({ token });
       } else {
           res.status(401).json({ message: 'Invalid credentials' });
       }
   });
   ```

3. **Защищенный маршрут (`/protected`):**
   - Проверяет JWT токен.
   - Возвращает данные, если токен валиден.
   ```javascript
   const authenticateJWT = (req, res, next) => {
       const authHeader = req.headers.authorization;

       if (authHeader) {
           const token = authHeader.split(' ')[1];

           jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
               if (err) {
                   return res.sendStatus(403);
               }

               req.user = user;
               next();
           });
       } else {
           res.sendStatus(401);
       }
   };

   app.get('/protected', authenticateJWT, (req, res) => {
       res.json({ message: 'This is a protected route', user: req.user });
   });
   ```

---

### Шаг 3: Создание фронтенда

1. Создайте файл `index.html` в корне проекта:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>JWT Auth Example</title>
   </head>
   <body>
       <h1>JWT Authentication Example</h1>

       <div>
           <h2>Register</h2>
           <form id="registerForm">
               <input type="text" id="registerUsername" placeholder="Username" required>
               <input type="password" id="registerPassword" placeholder="Password" required>
               <button type="submit">Register</button>
           </form>
           <p id="registerMessage"></p>
       </div>

       <div>
           <h2>Login</h2>
           <form id="loginForm">
               <input type="text" id="loginUsername" placeholder="Username" required>
               <input type="password" id="loginPassword" placeholder="Password" required>
               <button type="submit">Login</button>
           </form>
           <p id="loginMessage"></p>
       </div>

       <div>
           <h2>Protected Data</h2>
           <button id="fetchProtectedData">Fetch Protected Data</button>
           <p id="protectedData"></p>
       </div>

       <script src="app.js"></script>
   </body>
   </html>
   ```

2. Создайте файл `app.js` для фронтенда:
   ```javascript
   let token = null;

   document.getElementById('registerForm').addEventListener('submit', async (e) => {
       e.preventDefault();
       const username = document.getElementById('registerUsername').value;
       const password = document.getElementById('registerPassword').value;

       const response = await fetch('http://localhost:3000/register', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ username, password })
       });

       const result = await response.json();
       document.getElementById('registerMessage').textContent = result.message || 'Registration failed';
   });

   document.getElementById('loginForm').addEventListener('submit', async (e) => {
       e.preventDefault();
       const username = document.getElementById('loginUsername').value;
       const password = document.getElementById('loginPassword').value;

       const response = await fetch('http://localhost:3000/login', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ username, password })
       });

       const result = await response.json();
       if (response.ok) {
           token = result.token;
           document.getElementById('loginMessage').textContent = 'Login successful!';
       } else {
           document.getElementById('loginMessage').textContent = result.message || 'Login failed';
       }
   });

   document.getElementById('fetchProtectedData').addEventListener('click', async () => {
       if (!token) {
           document.getElementById('protectedData').textContent = 'Please login first';
           return;
       }

       const response = await fetch('http://localhost:3000/protected', {
           headers: { 'Authorization': `Bearer ${token}` }
       });

       const result = await response.json();
       if (response.ok) {
           document.getElementById('protectedData').textContent = JSON.stringify(result);
       } else {
           document.getElementById('protectedData').textContent = 'Access denied';
       }
   });
   ```

---

### Шаг 4: Тестирование

1. Запустите сервер:
   ```bash
   node server.js
   ```

2. Откройте файл `index.html` в браузере.

3. Протестируйте:
   - Регистрацию нового пользователя.
   - Вход в систему.
   - Доступ к защищенным данным.

---

#### Советы по работе с JWT

1. **Храните секретный ключ безопасно:**
   Никогда не храните секретный ключ в коде приложения. Используйте переменные окружения или специализированные сервисы для хранения секретов.

2. **Ограничивайте срок действия токенов:**
   Устанавливайте короткий срок действия access токенов (например, 1 час) и используйте refresh токены для их обновления.

3. **Проверяйте подпись токена:**
   Всегда проверяйте подпись JWT на сервере, чтобы убедиться в его подлинности.

4. **Используйте HTTPS:**
   Всегда используйте HTTPS для защиты данных в transit.

---

#### Заключение

Сегодня мы изучили JWT — мощный инструмент для реализации аутентификации в современных веб-приложениях. Мы разобрали структуру JWT, принципы их работы и рассмотрели пример реализации аутентификации с использованием JWT на Node.js. Перейдем к условию Базового задания №5.
