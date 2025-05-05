|||
|---|---|
|ДИСЦИПЛИНА|Фронтенд и бэкенд разработка|
|ИНСТИТУТ|ИПТИП|
|КАФЕДРА|Индустриального программирования|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|
|ПРЕПОДАВАТЕЛЬ|Астафьев Рустам Уралович|
|СЕМЕСТР|2 семестр, 2024/2025 уч. год|

---

### **Практическое занятие 25: Работа с NoSQL базами данных в приложениях**

---

#### **Введение в NoSQL и MongoDB**  
NoSQL (Not Only SQL) — это класс систем управления базами данных, отличающихся от традиционных реляционных СУБД отсутствием жесткой схемы данных и возможностью горизонтального масштабирования. В отличие от SQL-баз, где данные хранятся в таблицах с фиксированными столбцами, NoSQL использует документно-ориентированные, ключ-значение, графовые или колоночные модели.  

MongoDB — одна из самых популярных документоориентированных NoSQL-систем, где данные хранятся в виде BSON-документов (бинарный JSON). Это позволяет гибко изменять структуру данных без необходимости изменения схемы, что особенно полезно в agile-разработке и при работе с неструктурированной информацией.  

#### **Установка и настройка MongoDB**  
Перед началом работы необходимо установить MongoDB. Существует два основных варианта: локальная установка или использование облачного сервиса (MongoDB Atlas).  

1. **Локальная установка (для разработки)**  
   - На Windows: скачать инсталлятор с [официального сайта](https://www.mongodb.com/try/download/community) и следовать инструкциям.  
   - На Linux (Ubuntu/Debian):  
     ```bash
     sudo apt-get install mongodb
     sudo systemctl start mongodb
     ```  
   После установки сервер MongoDB будет доступен на `mongodb://localhost:27017`.  

2. **Облачное решение (MongoDB Atlas)**  
   - Регистрация на [MongoDB Atlas](https://www.mongodb.com/atlas).  
   - Создание кластера (бесплатный tier `M0`).  
   - Настройка пользователя и IP-whitelist.  
   - Получение строки подключения, например:  
     ```plaintext
     mongodb+srv://<username>:<password>@cluster0.mongodb.net/test?retryWrites=true&w=majority
     ```  

#### **Подключение MongoDB к Node.js-приложению**  
Для работы с MongoDB в Node.js используется библиотека `mongoose` — ODM (Object Data Modeling), которая предоставляет удобный API для взаимодействия с базой.  

1. **Инициализация проекта**  
   Создаем новый проект и устанавливаем зависимости:  
   ```bash
   npm init -y
   npm install mongoose express
   ```  

2. **Подключение к базе данных**  
   Создаем файл `server.js` и подключаем MongoDB:  
   ```javascript
   const mongoose = require('mongoose');
   const express = require('express');
   const app = express();

   // Подключение к MongoDB
   mongoose.connect('mongodb://localhost:27017/mydatabase', {
       useNewUrlParser: true,
       useUnifiedTopology: true
   })
   .then(() => console.log('Connected to MongoDB'))
   .catch(err => console.error('Connection error:', err));

   app.use(express.json());

   app.listen(3000, () => {
       console.log('Server is running on http://localhost:3000');
   });
   ```  

   Если используется MongoDB Atlas, строка подключения будет выглядеть так:  
   ```javascript
   mongoose.connect('mongodb+srv://user:password@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority');
   ```  

#### **Определение модели данных**  
Mongoose использует **схемы** (Schemas) для описания структуры документов. На основе схем создаются **модели** (Models), которые обеспечивают взаимодействие с коллекциями в MongoDB.  

Пример модели для сущности "Пользователь":  
```javascript
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 18 },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
```  

Здесь:  
- `required: true` — поле обязательно для заполнения.  
- `unique: true` — значение должно быть уникальным в коллекции.  
- `default` — значение по умолчанию.  

#### **CRUD-операции в MongoDB**  

##### **1. Создание документа (Create)**  
Добавление нового пользователя:  
```javascript
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});
```  

Пример HTTP-запроса (Postman или Fetch):  
```bash
POST /users
Content-Type: application/json

{
    "name": "Иван Петров",
    "email": "ivan@example.com",
    "age": 25
}
```  

##### **2. Чтение данных (Read)**  
Получение всех пользователей:  
```javascript
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
```  

Поиск по условию (например, пользователи старше 20 лет):  
```javascript
const users = await User.find({ age: { $gt: 20 } });
```  

##### **3. Обновление данных (Update)**  
Изменение данных пользователя:  
```javascript
app.patch('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Возвращает обновленный документ
        );
        if (!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});
```  

##### **4. Удаление данных (Delete)**  
Удаление пользователя:  
```javascript
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
```  

#### **Интеграция с фронтендом**  
Для демонстрации взаимодействия с фронтендом можно использовать Fetch API:  

```javascript
// Получение списка пользователей
fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => console.log(data));
```  

#### **Оптимизация и дополнительные возможности**  
- **Индексы** — ускоряют поиск по часто используемым полям:  
  ```javascript
  userSchema.index({ email: 1 }); // Создание индекса
  ```  
- **Агрегации** — сложные запросы с группировкой:  
  ```javascript
  const stats = await User.aggregate([
      { $group: { _id: null, averageAge: { $avg: "$age" } } }
  ]);
  ```  

#### **Заключение**  
На данном занятии была рассмотрена работа с MongoDB в контексте бэкенд-разработки. Основные этапы включали:  
- Настройку MongoDB (локально или в облаке).  
- Подключение к Node.js через Mongoose.  
- Реализацию CRUD-операций.  
- Интеграцию с REST API.  
