|||
|---|---|
|ДИСЦИПЛИНА|Фронтенд и бэкенд разработка|
|ИНСТИТУТ|ИПТИП|
|КАФЕДРА|Индустриального программирования|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|
|ПРЕПОДАВАТЕЛЬ|Астафьев Рустам Уралович|
|СЕМЕСТР|1 семестр, 2025/2026 уч. год|

Ссылка на материал: <br>
https://github.com/astafiev-rustam/frontend-and-backend-development/tree/practice-1-8

---

# Практическое занятие 8: Основы языка CSS

---

Об основах языка CSS было рассказно в лекциях по дисциплине. Освежить память можно посредством знакоства с презентациией лекции или ознакомьтесь с материалом по ссылке:<br>
https://htmlacademy.ru/courses/299/

## Базовая структура сайта проекта

Пошагово выполним добавление стилевых компонентов и подключи элементы таблицы стилей к файлам предыдущего практического занятия.

### ЭТАП 1. Организация локального и удалённого репозиториев

1. Добавьте в директорию проекта папку ```style```, в которой разместите файл ```styles.css```.
Таким образом, текущее дерево проекта будет выглядеть так:
```bash
.
│   index.html
│
├───images
│       goods1.jpg
│       goods2.jpg
│       goods3.jpg
│       photo.png
│
├───pages
│       contacts.html
│       goods.html
│       news.html
│       practices.html
│
└───style
        styles.css
```

2. Подключите файл стилей в каждый из файлов .html для задания стилевых настроек в каждом элементе.

Для ```index.html```:
```html
<link rel="stylesheet" href="style/styles.css">
```

Для файлов в папке ```pages```:
```html
<link rel="stylesheet" href="../style/styles.css">
```

3. Для всех используемых тегов задайте в файле соответствующие стилевые настройки. Предусмотрите уникальное размещение отдельных объектов и финализируйте полученный результат.

Для начала модернизируем файл ```index.html``` с использованием классов для удобной и качественной настройки стилей:

```html
<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Семестровая работа</title>
        <link rel="stylesheet" href="style/styles.css">
    </head>
    <body>
        <div class="page-container">
            <div class="header">Хэдер</div>
            <div class="nav">
                <ul class="nav-list">
                    <li class="nav-item"><a class="nav-link" href="index.html">Главная</a></li>
                    <li class="nav-item"><a class="nav-link" href="pages/news.html">Новости</a></li>
                    <li class="nav-item"><a class="nav-link" href="pages/practices.html">Практики</a></li> 
                    <li class="nav-item"><a class="nav-link" href="pages/goods.html">Товары</a></li>
                    <li class="nav-item"><a class="nav-link" href="pages/contacts.html">Контакты</a></li>
                </ul>
            </div>
            <div class="content">
                <div class="profile-header">
                    <h1 class="profile-title">Информация об авторе</h1>
                    <img class="profile-photo" src="images/photo.png" alt="Фото автора">
                    <h2 class="profile-name">Иванов Иван Иванович</h2>
                    <p class="profile-group">ЭФБО-00-00</p>
                </div>
                
                <div class="about-me">
                    <p>Обо мне: Я родился в Москве в 70-м на краю города. Глупость рано ударила в голову. В четыре активно ругался.
                    Потом школа, форма, драки, клей. Так я становился сильней. Воровал деньги в раздевалке.</p>
                </div>
                
                <div class="skills-container">
                    <div class="skill-tag">Навык 1</div>
                    <div class="skill-tag">Навык 2</div>
                    <div class="skill-tag">Навык 3</div>
                    <div class="skill-tag">Навык 4</div>
                </div>
                
                <div class="experience-section">
                    <h2 class="section-title">Мой опыт работы</h2>
                    <div class="experience-card">
                        <h3 class="experience-title">Опыт 1</h3>
                        <p class="experience-desc">Работал фантазёром. Сочинял и праздновал.</p>
                    </div>
                    <div class="experience-card">
                        <h3 class="experience-title">Опыт 2</h3>
                        <p class="experience-desc">Работал воровством. Воровал и продавал.</p>
                    </div>
                    <div class="experience-card">
                        <h3 class="experience-title">Опыт 3</h3>
                        <p class="experience-desc">Работал рэпером. Читал и пел.</p>
                    </div>
                </div>
            </div>
            <div class="footer">Футер</div>    
        </div>
    </body>
</html>
```

После этого добавим изменения и финализируем файл ```style.css```:

```css
/* ===== БАЗОВЫЕ СТИЛИ ===== */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Современный шрифт для лучшей читаемости */
    margin: 0; /* Убираем стандартные отступы браузера */
    padding: 0; /* Убираем стандартные внутренние отступы */
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); /* Красивый градиентный фон всей страницы */
    min-height: 100vh; /* Минимальная высота равна высоте окна браузера */
}

/* ===== КОНТЕЙНЕР СТРАНИЦЫ ===== */
.page-container {
    max-width: 1200px; /* Максимальная ширина контента */
    margin: 0 auto; /* Центрирование контейнера по горизонтали */
    background: white; /* Белый фон для основного содержимого */
    min-height: 100vh; /* Минимальная высота равна высоте окна браузера */
    box-shadow: 0 0 30px rgba(0,0,0,0.1); /* Легкая тень вокруг всего контента */
}

/* ===== ШАПКА ===== */
.header {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); /* Темный градиентный фон */
    color: white; /* Белый цвет текста */
    text-align: center; /* Выравнивание текста по центру */
    padding: 30px; /* Внутренние отступы со всех сторон */
    font-size: 28px; /* Размер шрифта */
    font-weight: 300; /* Легкое начертание шрифта */
    letter-spacing: 2px; /* Расстояние между буквами */
}

/* ===== НАВИГАЦИЯ ===== */
.nav {
    background: #2c3e50; /* Темно-синий фон навигации */
    padding: 20px 0; /* Вертикальные отступы */
}

.nav-list {
    list-style: none; /* Убираем маркеры списка */
    margin: 0; /* Убираем внешние отступы */
    padding: 0; /* Убираем внутренние отступы */
    display: flex; /* Горизонтальное расположение элементов */
    justify-content: center; /* Выравнивание по центру */
    gap: 25px; /* Расстояние между элементами навигации */
}

.nav-item {
    margin: 0; /* Убираем отступы у пунктов меню */
}

.nav-link {
    color: white; /* Белый цвет текста ссылок */
    text-decoration: none; /* Убираем подчеркивание ссылок */
    padding: 12px 25px; /* Отступы внутри ссылок */
    border-radius: 25px; /* Скругленные углы (капсульная форма) */
    transition: all 0.3s ease; /* Плавные анимации при изменении */
    font-weight: 500; /* Средняя жирность шрифта */
}

.nav-link:hover {
    background: rgba(255,255,255,0.1); /* Полупрозрачный белый фон при наведении */
    transform: translateY(-2px); /* Легкое поднятие элемента при наведении */
}

/* ===== ОСНОВНОЙ КОНТЕНТ ===== */
.content {
    padding: 40px; /* Внутренние отступы контента */
    max-width: 900px; /* Максимальная ширина контента */
    margin: 0 auto; /* Центрирование контента */
}

/* ===== ГЛАВНАЯ СТРАНИЦА ===== */
.profile-header {
    text-align: center; /* Выравнивание по центру */
    margin-bottom: 40px; /* Отступ снизу */
}

.profile-title {
    font-size: 32px; /* Размер шрифта заголовка */
    color: #2c3e50; /* Темно-синий цвет текста */
    margin-bottom: 10px; /* Отступ снизу */
    font-weight: 300; /* Легкое начертание шрифта */
}

.profile-photo {
    width: 220px; /* Фиксированная ширина фото */
    height: 280px; /* Фиксированная высота фото */
    border-radius: 15px; /* Скругленные углы фото */
    object-fit: cover; /* Обрезка фото для сохранения пропорций */
    margin: 20px auto; /* Центрирование и отступы */
    border: 4px solid #667eea; /* Синяя рамка вокруг фото */
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3); /* Тень с синим оттенком */
}

.profile-name {
    font-size: 24px; /* Размер шрифта имени */
    color: #2c3e50; /* Темно-синий цвет текста */
    margin: 10px 0; /* Вертикальные отступы */
    font-weight: 500; /* Средняя жирность шрифта */
}

.profile-group {
    font-size: 18px; /* Размер шрифта группы */
    color: #7f8c8d; /* Серый цвет текста */
    margin: 5px 0; /* Вертикальные отступы */
}

.about-me {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); /* Светлый градиентный фон */
    padding: 25px; /* Внутренние отступы */
    border-radius: 15px; /* Скругленные углы */
    margin: 30px 0; /* Вертикальные отступы */
    border-left: 5px solid #667eea; /* Синяя полоса слева */
    font-size: 16px; /* Размер шрифта текста */
    line-height: 1.8; /* Межстрочный интервал */
}

/* ===== НАВЫКИ ===== */
.skills-container {
    display: flex; /* Горизонтальное расположение навыков */
    justify-content: center; /* Выравнивание по центру */
    flex-wrap: wrap; /* Перенос на новую строку при необходимости */
    gap: 15px; /* Расстояние между навыками */
    margin: 30px 0; /* Вертикальные отступы */
}

.skill-tag {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); /* Голубой градиентный фон */
    color: white; /* Белый цвет текста */
    padding: 12px 25px; /* Внутренние отступы */
    border-radius: 25px; /* Круглые углы (капсульная форма) */
    font-weight: 600; /* Жирный шрифт */
    font-size: 14px; /* Размер шрифта */
    box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3); /* Тень с голубым оттенком */
    transition: all 0.3s ease; /* Плавные анимации при изменении */
}

.skill-tag:hover {
    transform: translateY(-3px); /* Поднятие элемента при наведении */
    box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4); /* Увеличение тени при наведении */
}

/* ===== ОПЫТ РАБОТЫ ===== */
.experience-section {
    margin-top: 50px; /* Отступ сверху */
}

.section-title {
    font-size: 28px; /* Размер шрифта заголовка секции */
    color: #2c3e50; /* Темно-синий цвет текста */
    text-align: center; /* Выравнивание по центру */
    margin-bottom: 30px; /* Отступ снизу */
    font-weight: 300; /* Легкое начертание шрифта */
}

.experience-card {
    background: white; /* Белый фон карточки */
    padding: 25px; /* Внутренние отступы */
    margin: 20px 0; /* Вертикальные отступы */
    border-radius: 12px; /* Скругленные углы */
    box-shadow: 0 5px 20px rgba(0,0,0,0.08); /* Легкая тень */
    border-left: 4px solid #667eea; /* Синяя полоса слева */
    transition: transform 0.3s ease; /* Плавная анимация трансформации */
}

.experience-card:hover {
    transform: translateX(5px); /* Сдвиг вправо при наведении */
}

.experience-title {
    font-size: 20px; /* Размер шрифта заголовка опыта */
    color: #2c3e50; /* Темно-синий цвет текста */
    margin: 0 0 10px 0; /* Отступ снизу */
    font-weight: 600; /* Жирный шрифт */
}

.experience-desc {
    color: #7f8c8d; /* Серый цвет текста */
    line-height: 1.6; /* Межстрочный интервал */
    margin: 0; /* Убираем отступы */
}

/* ===== ФУТЕР ===== */
.footer {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); /* Темный градиентный фон */
    color: white; /* Белый цвет текста */
    text-align: center; /* Выравнивание по центру */
    padding: 30px; /* Внутренние отступы */
    margin-top: 50px; /* Отступ сверху */
}
```

Полученный вид index.html:

![](images/1-1.png)
![](images/1-2.png)

Ссылка:<br>
https://astafiev-rustam.github.io/frontend-and-backend-practice/

---

### ЭТАП 2. Самостоятельная работа

Проведите аналогичные операции для каждой разработанной страницы ```news.html```, ```goods.html```, ```contacts.html``` в соответствие с собственным видением реализации. Обратите внимание, что стилизация элементов и их видение хоть и является индивидуальным, но общие принципы построения интерфейсов в рамках текущей задачи:
- каждый логически и смыслово отличающийся должен отличаться и виузально;
- необходимо соблюдение принципов единства интерфейсов для элементов одинакового назначения.

**ОБРАТИТЕ ВНИМАНИЕ** Использование исключительно id без использования классов не является обязательным, то есть можно использовать известные Вам прочие механизмы настройки стилей, в которых Вы уверены.

### ЭТАП 3. Проверка результата

В результате выполнения поставленной задачи доступ к проекту становится возможен по ссылке через GitHub Pages. С помощью меню можно перемещаться между страницами сайта, каждая из которых открывается и отображается в соответствие с настройками.

**Пример реализации:**<br>
https://astafiev-rustam.github.io/frontend-and-backend-practice/

**Скриншоты примера:**<br>
![](images/3-1.png)
![](images/3-2.png)
![](images/3-3.png)

## Базовое задание

В качестве результата по итогам занятия необходимо прикрепить ссылку в соответствующий раздел рабочей области в СДО.