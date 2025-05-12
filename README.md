|||
|---|---|
|ДИСЦИПЛИНА|Фронтенд и бэкенд разработка|
|ИНСТИТУТ|ИПТИП|
|КАФЕДРА|Индустриального программирования|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|
|ПРЕПОДАВАТЕЛЬ|Астафьев Рустам Уралович|
|СЕМЕСТР|2 семестр, 2024/2025 уч. год|

---

### **Практическое занятие 28: Разработка веб-приложений. Социальные сети и форумы**

---

## **Введение в разработку социальных платформ**

Современные социальные сети и форумы — это сложные веб-приложения, сочетающие в себе множество функций: от системы авторизации до механизмов взаимодействия между пользователями. В отличие от лендингов, здесь важна не только визуальная составляющая, но и продуманная архитектура, безопасность и масштабируемость. Сегодня мы разберём ключевые аспекты создания такой платформы, начиная с проектирования базовых функций и заканчивая реализацией интерактивных элементов.

---

## **Проектирование структуры приложения**

Перед тем как приступить к написанию кода, необходимо определить основные компоненты системы. Для социальной сети или форума это:

1. **Пользователи и авторизация**  
   - Регистрация и вход  
   - Профили с аватарами  
   - Система ролей (администратор, модератор, пользователь)  

2. **Контент и взаимодействие**  
   - Создание постов/тем  
   - Комментарии и лайки  
   - Подписки на других пользователей  

3. **Дополнительные функции**  
   - Уведомления  
   - Поиск по контенту  
   - Личные сообщения  

Для наглядности создадим упрощённую схему базы данных. Например, таблица `users` будет содержать информацию о пользователях, а таблица `posts` — их публикации. Связь между ними организуем через внешние ключи.

---

## **Настройка серверной части**

Серверная часть может быть реализована на Node.js (Express) или Python (Django/FastAPI). Рассмотрим пример на Node.js:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/social_network');

// Модель пользователя
const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String,
  avatar: String
});

// Регистрация
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).send('Пользователь создан');
});

// Авторизация
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send('Пользователь не найден');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Неверный пароль');

  const token = jwt.sign({ id: user._id }, 'secret_key');
  res.json({ token });
});

app.listen(3000, () => console.log('Сервер запущен на порту 3000'));
```

Этот код реализует базовые функции: регистрацию и авторизацию с использованием JWT для аутентификации.  

---

## **Создание клиентской части**

Клиентская часть будет взаимодействовать с сервером через API. Используем HTML, CSS и JavaScript (можно добавить React для более сложных интерфейсов).

### **Пример страницы профиля**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Профиль пользователя</title>
  <style>
    .profile {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
    }
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  </style>
</head>
<body>
  <div class="profile">
    <img src="avatar.jpg" alt="Аватар" class="avatar">
    <h1 id="username">Имя пользователя</h1>
    <button id="editProfile">Редактировать профиль</button>
    <div class="posts">
      <!-- Посты будут загружаться здесь -->
    </div>
  </div>

  <script>
    // Загрузка данных профиля
    async function loadProfile() {
      const response = await fetch('/api/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      document.getElementById('username').textContent = data.username;
    }

    loadProfile();
  </script>
</body>
</html>
```

---

## **Реализация ключевых функций**

### **1. Система постов**
```javascript
// На сервере
app.get('/posts', async (req, res) => {
  const posts = await Post.find().populate('author');
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const { text } = req.body;
  const post = new Post({ text, author: req.user.id });
  await post.save();
  res.status(201).json(post);
});
```

### **2. Комментарии и лайки**
```javascript
// Модель комментария
const Comment = mongoose.model('Comment', {
  text: String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
```

### **3. Уведомления в реальном времени**
Для этого можно использовать WebSocket (например, библиотеку Socket.io):

```javascript
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('newComment', (comment) => {
    io.emit('notification', `Новый комментарий: ${comment.text}`);
  });
});
```

---

## **Оптимизация и безопасность**

1. **Защита данных**  
   - Валидация входящих данных  
   - Хеширование паролей  
   - Ограничение частоты запросов  

2. **Производительность**  
   - Пагинация для постов  
   - Кеширование запросов  
   - Оптимизация изображений  

3. **Масштабируемость**  
   - Использование балансировщика нагрузки  
   - Разделение сервисов (микросервисная архитектура)  

---

## **Заключение**

Сегодня мы разобрали основные принципы создания социальной сети или форума. Конечно, в реальном проекте придётся учитывать больше нюансов: модерацию контента, рекомендательные системы, аналитику поведения пользователей. Однако этот фундамент позволит вам развивать проект в любом направлении.  

**Что можно улучшить:**  
- Добавить рекомендации друзей  
- Реализовать истории  
- Внедрить машинное обучение для персонализации ленты  

Перейдем к рассмотрению семестрового задания №3
