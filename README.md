|||
|---|---|
|ДИСЦИПЛИНА|Фронтенд и бэкенд разработка|
|ИНСТИТУТ|ИПТИП|
|КАФЕДРА|Индустриального программирования|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|
|ПРЕПОДАВАТЕЛЬ|Астафьев Рустам Уралович|
|СЕМЕСТР|2 семестр, 2024/2025 уч. год|

---

### **Практическое занятие 21-22: Работа со сборщиками приложений. Docker и разработка**

Данная тема рассчитана на два практических занятия, поэтому практики 21 и 22 дублируют друг друга

---

## **Введение**  

Современная разработка программного обеспечения требует не только написания кода, но и обеспечения его стабильной работы в различных окружениях. Разработчики часто сталкиваются с проблемами, когда приложение работает на их компьютере, но перестаёт функционировать на сервере или у коллег. Это может быть связано с различиями в версиях языков программирования, библиотек, операционных систем или конфигураций.  

Для решения этой проблемы используются **контейнеры** — изолированные среды, которые содержат всё необходимое для запуска приложения: код, зависимости, системные инструменты и настройки. **Docker** — это ведущая платформа для работы с контейнерами, позволяющая быстро разворачивать приложения и масштабировать их.  

На этом занятии мы разберём, как Docker помогает в разработке фронтенд- и бэкенд-приложений, научимся создавать Docker-образы, запускать контейнеры и управлять ими с помощью Docker Compose.  

---  

## **1. Установка Docker и базовые команды**  

Перед началом работы необходимо установить Docker. Инструкции для разных ОС можно найти на [официальном сайте](https://docs.docker.com/get-docker/). После установки проверим, что Docker работает:  

```bash
docker --version
```  

Если Docker установлен корректно, можно запустить тестовый контейнер:  

```bash
docker run hello-world
```  

Эта команда скачает образ `hello-world` из Docker Hub (реестра образов) и запустит его. Если всё работает, мы увидим приветственное сообщение.  

---  

## **2. Docker-образ для фронтенд-приложения**  

### 1. Структура проекта
```
simple-docker-example/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
└── frontend/
    ├── Dockerfile
    ├── index.html
    └── script.js
```

### 2. Базовые файлы

#### `docker-compose.yml`
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
  
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
```

### 3. Бэкенд (Node.js)

#### `backend/Dockerfile`
```dockerfile
FROM node:14-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]
```

#### `backend/package.json`
```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

#### `backend/index.js`
```javascript
const express = require('express');
const app = express();
const PORT = 5000;

app.get('/api', (req, res) => {
  res.send('Hello from Backend!');
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
```

### 4. Фронтенд (чистый HTML/JS)

#### `frontend/Dockerfile`
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

#### `frontend/index.html`
```html
<!DOCTYPE html>
<html>
<head>
    <title>Simple Docker Example</title>
</head>
<body>
    <h1>Frontend</h1>
    <div id="response"></div>
    <script src="script.js"></script>
</body>
</html>
```

#### `frontend/script.js`
```javascript
fetch('http://backend:5000/api')
  .then(response => response.text())
  .then(data => {
    document.getElementById('response').textContent = data;
  });
```

### 5. Инструкция по запуску

1. Убедитесь, что Docker установлен и запущен
2. В корне проекта выполните:
```bash
docker-compose up --build
```
3. Откройте в браузере:
   - Фронтенд: http://localhost:3000
   - Бэкенд: http://localhost:5000/api

---  

## **Заключение**  

Docker значительно упрощает разработку, тестирование и развёртывание приложений. Мы научились:  
- Создавать Docker-образы для фронтенда и бэкенда.  
- Запускать контейнеры вручную и через Docker Compose.  
- Оптимизировать образы для production.  

Перейдем к знакомству с Базовым заданием №9
