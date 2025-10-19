|||
|---|---|
|ДИСЦИПЛИНА|Фронтенд и бэкенд разработка|
|ИНСТИТУТ|ИПТИП|
|КАФЕДРА|Индустриального программирования|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|
|ПРЕПОДАВАТЕЛЬ|Астафьев Рустам Уралович|
|СЕМЕСТР|1 семестр, 2025/2026 уч. год|

Ссылка на материал: <br>
https://github.com/astafiev-rustam/frontend-and-backend-development/tree/practice-1-15

---

# Практическое занятие 15: Комбинирование методов адаптивной вёрстки

В рамках данного занятия будут использоваться основные подходы к адаптивной вёрстке, о которой речь велась на лекциях.

Для восполнения знаний по данной теме рекомендуется повторить материалы лекции. Дополнительно можно ознакомиться с материалом по ссылке:
https://habr.com/ru/companies/simpleone/articles/881168/

## Пример в проекте
В качестве примера рассмотрим следующую модернизацию нашего проекта на примере главной страницы.

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Главная - StudentDev Portfolio</title>
    <link rel="stylesheet" href="styles/styles.css">
</head>
<body>
    <div class="page">
        <!-- Header -->
        <header class="header">
            <div class="container">
                <div class="header__content">
                    <h1 class="header__title">Алексей Петров</h1>
                    <p class="header__subtitle">Студент-разработчик</p>
                </div>
            </div>
        </header>

        <!-- Navigation -->
        <nav class="nav">
            <div class="container">
                <ul class="nav__list">
                    <li class="nav__item nav__item--active">
                        <a href="index.html" class="nav__link">Главная</a>
                    </li>
                    <li class="nav__item">
                        <a href="pages/projects.html" class="nav__link">Проекты</a>
                    </li>
                    <li class="nav__item">
                        <a href="pages/diary.html" class="nav__link">Дневник</a>
                    </li>
                    <li class="nav__item">
                        <a href="pages/contacts.html" class="nav__link">Контакты</a>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="main">
            <div class="container">
                <!-- Hero Section -->
                <section class="hero">
                    <div class="hero__content">
                        <div class="hero__image">
                            <img src="images/photo.jpg" alt="Фото студента" class="hero__photo">
                        </div>
                        <div class="hero__info">
                            <h2 class="hero__greeting">Привет! Я студент</h2>
                            <p class="hero__description">
                                Факультет информационных технологий, группа ИТ-21-1<br>
                                Увлекаюсь веб-разработкой и созданием современных интерфейсов
                            </p>
                            <button class="button button--primary hero__button">
                                Скачать резюме
                            </button>
                        </div>
                    </div>
                </section>

                <!-- Skills Section -->
                <section class="skills">
                    <h2 class="section-title">Мои навыки</h2>
                    <div class="skills__grid">
                        <div class="skill">
                            <div class="skill__header">
                                <span class="skill__name">HTML/CSS</span>
                                <span class="skill__percent">90%</span>
                            </div>
                            <div class="skill__progress">
                                <div class="skill__progress-bar" style="width: 90%"></div>
                            </div>
                        </div>
                        <div class="skill">
                            <div class="skill__header">
                                <span class="skill__name">JavaScript</span>
                                <span class="skill__percent">80%</span>
                            </div>
                            <div class="skill__progress">
                                <div class="skill__progress-bar" style="width: 80%"></div>
                            </div>
                        </div>
                        <div class="skill">
                            <div class="skill__header">
                                <span class="skill__name">Bootstrap</span>
                                <span class="skill__percent">85%</span>
                            </div>
                            <div class="skill__progress">
                                <div class="skill__progress-bar" style="width: 85%"></div>
                            </div>
                        </div>
                        <div class="skill">
                            <div class="skill__header">
                                <span class="skill__name">React</span>
                                <span class="skill__percent">60%</span>
                            </div>
                            <div class="skill__progress">
                                <div class="skill__progress-bar" style="width: 60%"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Projects Preview -->
                <section class="projects-preview">
                    <h2 class="section-title">Лучшие проекты</h2>
                    <div class="projects-preview__grid">
                        <article class="project-card">
                            <div class="project-card__image">
                                <img src="images/project1.jpg" alt="Личный сайт">
                            </div>
                            <div class="project-card__content">
                                <h3 class="project-card__title">Личный сайт</h3>
                                <p class="project-card__description">
                                    Адаптивный сайт-портфолио на HTML и CSS
                                </p>
                                <div class="project-card__tags">
                                    <span class="tag">HTML</span>
                                    <span class="tag">CSS</span>
                                    <span class="tag">JavaScript</span>
                                </div>
                            </div>
                        </article>
                        <article class="project-card">
                            <div class="project-card__image">
                                <img src="images/project2.jpg" alt="Todo приложение">
                            </div>
                            <div class="project-card__content">
                                <h3 class="project-card__title">Todo приложение</h3>
                                <p class="project-card__description">
                                    Приложение для управления задачами
                                </p>
                                <div class="project-card__tags">
                                    <span class="tag">JavaScript</span>
                                    <span class="tag">LocalStorage</span>
                                </div>
                            </div>
                        </article>
                        <article class="project-card">
                            <div class="project-card__image">
                                <img src="images/project3.jpg" alt="Интернет-магазин">
                            </div>
                            <div class="project-card__content">
                                <h3 class="project-card__title">Интернет-магазин</h3>
                                <p class="project-card__description">
                                    Прототип магазина с корзиной товаров
                                </p>
                                <div class="project-card__tags">
                                    <span class="tag">React</span>
                                    <span class="tag">API</span>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            </div>
        </main>

        <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <div class="footer__content">
                    <p class="footer__copyright">&copy; 2025 StudentDev Portfolio</p>
                    <div class="footer__links">
                        <a href="mailto:student@edu.ru" class="footer__link">student@edu.ru</a>
                        <a href="https://github.com" class="footer__link">GitHub</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</body>
</html>
```

styles.css:

```css
/* CSS Variables */
:root {
    /* Colors */
    --primary-color: #2563eb;
    --primary-dark: #1d4ed8;
    --primary-light: #3b82f6;
    --secondary-color: #64748b;
    --accent-color: #f59e0b;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --error-color: #ef4444;
    
    /* Text Colors */
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --text-light: #94a3b8;
    --text-white: #ffffff;
    
    /* Background Colors */
    --bg-body: #f8fafc;
    --bg-card: #ffffff;
    --bg-header: #1e293b;
    --bg-footer: #1e293b;
    
    /* Gradients */
    --gradient-primary: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    --gradient-dark: linear-gradient(135deg, var(--bg-header), #334155);
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    
    /* Border Radius */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    
    /* Spacing */
    --space-xs: 0.5rem;
    --space-sm: 0.75rem;
    --space-md: 1rem;
    --space-lg: 1.5rem;
    --space-xl: 2rem;
    --space-2xl: 3rem;
    
    /* Transitions */
    --transition: all 0.3s ease;
}

/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: var(--text-primary);
    background-color: var(--bg-body);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-md);
}

/* Page Layout */
.page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Header */
.header {
    background: var(--gradient-dark);
    color: var(--text-white);
    padding: var(--space-xl) 0;
    text-align: center;
}

.header__content {
    max-width: 600px;
    margin: 0 auto;
}

.header__title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: var(--space-xs);
}

.header__subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
}

/* Navigation */
.nav {
    background: var(--primary-color);
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: var(--shadow-md);
}

.nav__list {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: var(--space-lg);
    padding: var(--space-md) 0;
}

.nav__item {
    margin: 0;
}

.nav__link {
    display: block;
    padding: var(--space-sm) var(--space-md);
    color: var(--text-white);
    text-decoration: none;
    border-radius: var(--radius-md);
    transition: var(--transition);
    font-weight: 500;
}

.nav__link:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
}

.nav__item--active .nav__link {
    background: rgba(255, 255, 255, 0.2);
    font-weight: 600;
}

/* Main Content */
.main {
    flex: 1;
    padding: var(--space-2xl) 0;
}

/* Section Title */
.section-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    text-align: center;
    margin-bottom: var(--space-2xl);
}

/* Hero Section */
.hero {
    margin-bottom: var(--space-2xl);
}

.hero__content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--space-2xl);
    align-items: center;
    background: var(--bg-card);
    padding: var(--space-2xl);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
}

.hero__image {
    text-align: center;
}

.hero__photo {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--primary-color);
    box-shadow: var(--shadow-lg);
}

.hero__greeting {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-md);
}

.hero__description {
    font-size: 1.1rem;
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: var(--space-lg);
}

.hero__button {
    font-size: 1.1rem;
    padding: var(--space-md) var(--space-lg);
}

/* Skills Section */
.skills {
    margin-bottom: var(--space-2xl);
}

.skills__grid {
    display: grid;
    gap: var(--space-lg);
    max-width: 600px;
    margin: 0 auto;
}

.skill {
    background: var(--bg-card);
    padding: var(--space-lg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
}

.skill__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-sm);
}

.skill__name {
    font-weight: 600;
    color: var(--text-primary);
}

.skill__percent {
    font-weight: 600;
    color: var(--primary-color);
}

.skill__progress {
    height: 8px;
    background: #e2e8f0;
    border-radius: var(--radius-sm);
    overflow: hidden;
}

.skill__progress-bar {
    height: 100%;
    background: var(--primary-color);
    border-radius: var(--radius-sm);
    transition: width 1s ease-in-out;
}

/* Projects Preview */
.projects-preview {
    margin-bottom: var(--space-2xl);
}

.projects-preview__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-lg);
}

/* Project Card */
.project-card {
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    transition: var(--transition);
}

.project-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}

.project-card__image {
    height: 200px;
    overflow: hidden;
}

.project-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
}

.project-card:hover .project-card__image img {
    transform: scale(1.05);
}

.project-card__content {
    padding: var(--space-lg);
}

.project-card__title {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-sm);
}

.project-card__description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: var(--space-md);
}

.project-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    margin-bottom: var(--space-md);
}

.project-card__button {
    width: 100%;
}

/* Tag Component */
.tag {
    display: inline-block;
    padding: var(--space-xs) var(--space-sm);
    background: var(--primary-light);
    color: var(--text-white);
    border-radius: var(--radius-sm);
    font-size: 0.8rem;
    font-weight: 500;
}

/* Button Component */
.button {
    display: inline-block;
    padding: var(--space-sm) var(--space-lg);
    border: none;
    border-radius: var(--radius-md);
    font-weight: 600;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    transition: var(--transition);
    font-family: inherit;
}

.button--primary {
    background: var(--primary-color);
    color: var(--text-white);
}

.button--primary:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
}

.button--outline {
    background: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
}

.button--outline:hover {
    background: var(--primary-color);
    color: var(--text-white);
    transform: translateY(-2px);
}

/* Projects Page Specific Styles */
.projects__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-2xl);
    flex-wrap: wrap;
    gap: var(--space-md);
}

.projects__filters {
    display: flex;
    gap: var(--space-sm);
    flex-wrap: wrap;
}

.filter {
    padding: var(--space-sm) var(--space-md);
    background: var(--bg-card);
    border: 2px solid #e2e8f0;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: var(--transition);
    font-weight: 500;
}

.filter:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
}

.filter--active {
    background: var(--primary-color);
    color: var(--text-white);
    border-color: var(--primary-color);
}

.projects__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: var(--space-lg);
}

/* Diary Page Specific Styles */
.timeline {
    max-width: 800px;
    margin: 0 auto var(--space-2xl);
}

.timeline__item {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: var(--space-lg);
    padding: var(--space-lg);
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-md);
    box-shadow: var(--shadow-md);
    position: relative;
}

.timeline__item::before {
    content: '';
    position: absolute;
    left: 170px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #e2e8f0;
}

.timeline__date {
    font-weight: 600;
    color: var(--text-primary);
}

.timeline__content {
    position: relative;
}

.timeline__title {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-xs);
}

.timeline__description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: var(--space-sm);
}

.timeline__status {
    display: inline-block;
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-sm);
    font-size: 0.8rem;
    font-weight: 600;
}

.timeline__status--completed {
    background: var(--success-color);
    color: white;
}

.timeline__status--in-progress {
    background: var(--warning-color);
    color: white;
}

.timeline__status--planned {
    background: var(--secondary-color);
    color: white;
}

/* Courses Section */
.courses {
    margin-bottom: var(--space-2xl);
}

.courses__title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-lg);
    text-align: center;
}

.courses__grid {
    display: grid;
    gap: var(--space-lg);
    max-width: 600px;
    margin: 0 auto;
}

.course {
    background: var(--bg-card);
    padding: var(--space-lg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
}

.course__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-sm);
}

.course__name {
    font-weight: 600;
    color: var(--text-primary);
}

.course__percent {
    font-weight: 600;
    color: var(--primary-color);
}

.course__progress {
    height: 8px;
    background: #e2e8f0;
    border-radius: var(--radius-sm);
    overflow: hidden;
}

.course__progress-bar {
    height: 100%;
    background: var(--primary-color);
    border-radius: var(--radius-sm);
    transition: width 1s ease-in-out;
}

/* Add Entry Form */
.add-entry {
    background: var(--bg-card);
    padding: var(--space-2xl);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    max-width: 600px;
    margin: 0 auto;
}

.add-entry__title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-lg);
    text-align: center;
}

.add-entry__form {
    display: grid;
    gap: var(--space-lg);
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-label {
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-xs);
}

.form-input,
.form-textarea {
    padding: var(--space-md);
    border: 2px solid #e2e8f0;
    border-radius: var(--radius-md);
    font-family: inherit;
    font-size: 1rem;
    transition: var(--transition);
}

.form-input:focus,
.form-textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-textarea {
    resize: vertical;
    min-height: 100px;
}

/* Contacts Page Specific Styles */
.contacts__content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: var(--space-2xl);
    max-width: 1000px;
    margin: 0 auto;
}

.contact-form {
    background: var(--bg-card);
    padding: var(--space-2xl);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
}

.form {
    display: grid;
    gap: var(--space-lg);
}

.form__group {
    display: flex;
    flex-direction: column;
}

.form__label {
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-xs);
}

.form__input,
.form__textarea {
    padding: var(--space-md);
    border: 2px solid #e2e8f0;
    border-radius: var(--radius-md);
    font-family: inherit;
    font-size: 1rem;
    transition: var(--transition);
}

.form__input:focus,
.form__textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form__textarea {
    resize: vertical;
    min-height: 120px;
}

.form__button {
    font-size: 1.1rem;
    padding: var(--space-md) var(--space-lg);
}

.contact-info {
    background: var(--bg-card);
    padding: var(--space-2xl);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    height: fit-content;
}

.contact-info__title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-lg);
    text-align: center;
}

.contact-info__items {
    display: grid;
    gap: var(--space-lg);
}

.contact-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-md);
    padding: var(--space-lg);
    background: #f8fafc;
    border-radius: var(--radius-lg);
    transition: var(--transition);
}

.contact-item:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.contact-item__icon {
    font-size: 1.5rem;
    flex-shrink: 0;
}

.contact-item__content {
    flex: 1;
}

.contact-item__title {
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-xs);
}

.contact-item__value {
    color: var(--text-secondary);
}

/* Footer */
.footer {
    background: var(--gradient-dark);
    color: var(--text-white);
    padding: var(--space-xl) 0;
    margin-top: auto;
}

.footer__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-md);
}

.footer__copyright {
    margin: 0;
    opacity: 0.9;
}

.footer__links {
    display: flex;
    gap: var(--space-lg);
}

.footer__link {
    color: var(--text-light);
    text-decoration: none;
    transition: var(--transition);
}

.footer__link:hover {
    color: var(--text-white);
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        padding: 0 var(--space-sm);
    }
    
    .header__title {
        font-size: 2rem;
    }
    
    .nav__list {
        flex-direction: column;
        gap: var(--space-xs);
        align-items: center;
    }
    
    .hero__content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: var(--space-lg);
    }
    
    .hero__photo {
        width: 150px;
        height: 150px;
    }
    
    .projects__header {
        flex-direction: column;
        align-items: stretch;
    }
    
    .projects__filters {
        justify-content: center;
    }
    
    .projects__grid,
    .projects-preview__grid {
        grid-template-columns: 1fr;
    }
    
    .timeline__item {
        grid-template-columns: 1fr;
        gap: var(--space-md);
    }
    
    .timeline__item::before {
        display: none;
    }
    
    .contacts__content {
        grid-template-columns: 1fr;
    }
    
    .footer__content {
        flex-direction: column;
        text-align: center;
    }
    
    .footer__links {
        justify-content: center;
    }
}

@media (max-width: 480px) {
    :root {
        --space-xl: 1.5rem;
        --space-2xl: 2rem;
    }
    
    .section-title {
        font-size: 1.5rem;
    }
    
    .hero__greeting {
        font-size: 1.5rem;
    }
    
    .button {
        width: 100%;
    }
}
```

## Самостоятельная работа
В рамках самостоятельной работы необходимо реализовать средства адаптивности и для остальных страниц проекта (по аналогии с главной страницей).

Обратите внимание, что адаптирование изображений будет выступать в качестве следующих тем, в том числе анализ доступности и метрики.