|||
|---|---|
|ДИСЦИПЛИНА|Фронтенд и бэкенд разработка|
|ИНСТИТУТ|ИПТИП|
|КАФЕДРА|Индустриального программирования|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|
|ПРЕПОДАВАТЕЛЬ|Астафьев Рустам Уралович|
|СЕМЕСТР|2 семестр, 2024/2025 уч. год|

---

### **Практическое занятие 16: Отслеживание состояний и модели авторизации**

**Введение**  
Веб-приложениям необходимо отслеживать состояние пользователя: вошел ли он в систему, какие у него права, какие данные ему доступны. Для этого используются различные модели авторизации, чаще всего — **сессии на основе cookies**. В этом занятии мы разберем, как работать с сессиями, управлять состоянием пользователя и обеспечивать безопасность.  

---

### **1. Основы отслеживания состояния**  
Когда пользователь входит в систему, сервер должен "запомнить" его, чтобы не требовать повторной авторизации при каждом запросе. Самый простой способ — **сессии на основе cookies**.  

#### **Как это работает?**  
1. Пользователь вводит логин и пароль.  
2. Сервер проверяет данные и создает **сессию** (запись в базе данных или памяти).  
3. Сервер отправляет в ответ **cookie с идентификатором сессии** (например, `sessionId=abc123`).  
4. Браузер автоматически прикрепляет этот cookie к каждому следующему запросу.  
5. Сервер проверяет cookie и определяет, кто совершает запрос.  

---

### **2. Практическая часть: Реализация сессий**  

Давайте разберёмся, почему пример может не работать, и предоставим полностью рабочий вариант с пошаговой проверкой.

### Полностью рабочий пример: сессии на Express

**1. Убедимся в правильной структуре проекта:**
```
session-auth/
├── server.js
├── public/
│   ├── index.html
│   └── script.js
```

**2. Исправленный server.js:**
```javascript
const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

// Мидлвары
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Конфигурация сессии
app.use(session({
    secret: 'your_secret_key_here',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Для разработки на localhost
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 часа
    }
}));

// Маршруты
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Простая проверка (в реальном приложении - проверка в БД)
    if (username === 'admin' && password === '12345') {
        req.session.user = { username };
        return res.json({ success: true });
    }
    res.status(401).json({ success: false });
});

app.get('/check-auth', (req, res) => {
    if (req.session.user) {
        return res.json({ authenticated: true, user: req.session.user });
    }
    res.json({ authenticated: false });
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Ошибка выхода');
        }
        res.clearCookie('connect.sid');
        res.json({ success: true });
    });
});

app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
    console.log('Для теста используйте:');
    console.log('Логин: admin');
    console.log('Пароль: 12345');
});
```

**3. Исправленный public/index.html:**
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Авторизация</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        .form-group { margin-bottom: 15px; }
        input { padding: 8px; width: 100%; box-sizing: border-box; }
        button { padding: 10px 15px; background: #4CAF50; color: white; border: none; cursor: pointer; }
        button:hover { background: #45a049; }
        .hidden { display: none; }
        .error { color: red; }
    </style>
</head>
<body>
    <div id="auth-section">
        <h2>Вход в систему</h2>
        <div class="form-group">
            <input type="text" id="username" placeholder="Логин">
        </div>
        <div class="form-group">
            <input type="password" id="password" placeholder="Пароль">
        </div>
        <button id="login-btn">Войти</button>
        <p id="error-message" class="error hidden"></p>
    </div>

    <div id="profile-section" class="hidden">
        <h2>Профиль</h2>
        <p>Добро пожаловать, <span id="username-display"></span>!</p>
        <button id="logout-btn">Выйти</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

**4. Исправленный public/script.js:**
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById('auth-section');
    const profileSection = document.getElementById('profile-section');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const errorMessage = document.getElementById('error-message');
    
    // Проверяем авторизацию при загрузке
    checkAuth();
    
    // Обработчик входа
    loginBtn.addEventListener('click', async () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });
            
            const data = await response.json();
            
            if (data.success) {
                checkAuth();
            } else {
                showError('Неверные учетные данные');
            }
        } catch (err) {
            showError('Ошибка соединения');
        }
    });
    
    // Обработчик выхода
    logoutBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                credentials: 'include'
            });
            
            const data = await response.json();
            
            if (data.success) {
                authSection.classList.remove('hidden');
                profileSection.classList.add('hidden');
            }
        } catch (err) {
            showError('Ошибка при выходе');
        }
    });
    
    // Проверка авторизации
    async function checkAuth() {
        try {
            const response = await fetch('/check-auth', {
                credentials: 'include'
            });
            
            const data = await response.json();
            
            if (data.authenticated) {
                document.getElementById('username-display').textContent = data.user.username;
                authSection.classList.add('hidden');
                profileSection.classList.remove('hidden');
            }
        } catch (err) {
            console.error('Ошибка проверки авторизации:', err);
        }
    }
    
    // Показать ошибку
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 3000);
    }
});
```

**5. Пошаговая проверка работоспособности:**

1. Установите зависимости:
```bash
npm init -y
npm install express express-session
```

2. Запустите сервер:
```bash
node server.js
```

3. Откройте в браузере:
```
http://localhost:3000
```

4. Используйте для входа:
```
Логин: admin
Пароль: 12345
```

**6. Что делать если не работает:**

1. Проверьте в DevTools (F12):
   - Вкладка Network → смотрите статус запросов (должно быть 200)
   - Вкладка Application → Cookies → должна быть кука connect.sid

2. Проверьте:
   - Все файлы сохранены в правильной структуре
   - Нет ошибок в консоли браузера
   - Сервер запущен и нет ошибок в терминале

3. Если куки не устанавливаются:
   - Попробуйте другой браузер
   - Проверьте настройки браузера (должны разрешаться сторонние куки)
   - Убедитесь что адрес localhost (не 127.0.0.1)

**7. Ключевые моменты реализации:**

1. Обязательные параметры:
```javascript
app.use(session({
    secret: 'complex_key_here', // Должен быть длинным и сложным
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // true только для HTTPS
        httpOnly: true,
        sameSite: 'lax'
    }
}));
```

2. Важные заголовки запросов:
```javascript
fetch('/login', {
    credentials: 'include' // Обязательно для работы с куками
});
```

3. Очистка сессии при выходе:
```javascript
req.session.destroy();
res.clearCookie('connect.sid');
```

Перейдем к знакомству с Базовым заданием №6
