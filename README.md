|||
|---|---|
|ДИСЦИПЛИНА|Фронтенд и бэкенд разработка|
|ИНСТИТУТ|ИПТИП|
|КАФЕДРА|Индустриального программирования|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|
|ПРЕПОДАВАТЕЛЬ|Астафьев Рустам Уралович|
|СЕМЕСТР|1 семестр, 2025/2026 уч. год|

Ссылка на материал: <br>
https://github.com/astafiev-rustam/frontend-and-backend-development/tree/practice-1-12

---

# Практическое занятие 12: Bootstrap

О фреймворке подробно было рассказано на лекции по теме. В случае трудностей необходимо изучить материал лекции или изучить документацию фреймворка:

https://getbootstrap.com/docs/5.0/getting-started/introduction/

### ЭТАП 1. Практический пример

Заменим все блоки в `index.html` полностью на компоненты Bootstrap с поддержкой функциональности.

Таким образом, результат реализации следующий:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Главная - Портфолио</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
</head>
<body class="bg-light">
    <div class="container-fluid p-0">
        <!-- Header -->
        <header class="bg-primary text-white py-4">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col">
                        <h1 class="h3 mb-1">Мой Портфолио</h1>
                        <p class="mb-0 opacity-75">Студент разработчик</p>
                    </div>
                    <div class="col-auto">
                        <span class="badge bg-light text-primary">ЭФБО-01-22</span>
                    </div>
                </div>
            </div>
        </header>

        <!-- Navigation -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" href="index.html">
                                <i class="bi bi-house me-1"></i>Главная
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="pages/news.html">
                                <i class="bi bi-newspaper me-1"></i>Новости
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="pages/practices.html">
                                <i class="bi bi-code-slash me-1"></i>Практики
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="pages/goods.html">
                                <i class="bi bi-cart me-1"></i>Товары
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="pages/contacts.html">
                                <i class="bi bi-telephone me-1"></i>Контакты
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="container my-4">
            <!-- Profile Section -->
            <section class="mb-5">
                <div class="card shadow-sm">
                    <div class="card-body p-4">
                        <div class="row align-items-center">
                            <div class="col-md-3 text-center mb-3 mb-md-0">
                                <img src="images/photo.png" alt="Фото студента" class="img-fluid rounded-circle" style="width: 150px; height: 150px; object-fit: cover;">
                            </div>
                            <div class="col-md-9">
                                <h2 class="card-title h4 text-primary">Иванов Иван Иванович</h2>
                                <p class="card-text text-muted mb-2">
                                    <i class="bi bi-bookmark-check-fill text-primary"></i>
                                    Студент группы ЭФБО-01-22
                                </p>
                                <p class="card-text">
                                    Факультет информационных технологий, специальность "Веб-разработка"
                                </p>
                                <div class="d-flex gap-2 flex-wrap">
                                    <span class="badge bg-primary">HTML/CSS</span>
                                    <span class="badge bg-success">JavaScript</span>
                                    <span class="badge bg-info">Bootstrap</span>
                                    <span class="badge bg-warning">React</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- About Section -->
            <section class="mb-5">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h3 class="card-title h5 mb-0">
                            <i class="bi bi-person-circle text-primary"></i>
                            Обо мне
                        </h3>
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            Я увлекаюсь веб-разработкой и изучаю современные технологии. 
                            В свободное время занимаюсь созданием пет-проектов и изучаю новые фреймворки.
                        </p>
                        <p class="card-text">
                            Мои основные интересы: фронтенд разработка, UX/UI дизайн и мобильная разработка.
                            Стремлюсь к созданию качественных и удобных пользовательских интерфейсов.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Skills Section -->
            <section class="mb-5">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h3 class="card-title h5 mb-0">
                            <i class="bi bi-tools text-primary"></i>
                            Мои навыки
                        </h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <div class="d-flex justify-content-between mb-1">
                                        <span>HTML/CSS</span>
                                        <span class="text-primary">90%</span>
                                    </div>
                                    <div class="progress" style="height: 8px;">
                                        <div class="progress-bar bg-primary" style="width: 90%"></div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="d-flex justify-content-between mb-1">
                                        <span>JavaScript</span>
                                        <span class="text-primary">75%</span>
                                    </div>
                                    <div class="progress" style="height: 8px;">
                                        <div class="progress-bar bg-success" style="width: 75%"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <div class="d-flex justify-content-between mb-1">
                                        <span>Bootstrap</span>
                                        <span class="text-primary">85%</span>
                                    </div>
                                    <div class="progress" style="height: 8px;">
                                        <div class="progress-bar bg-info" style="width: 85%"></div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="d-flex justify-content-between mb-1">
                                        <span>React</span>
                                        <span class="text-primary">70%</span>
                                    </div>
                                    <div class="progress" style="height: 8px;">
                                        <div class="progress-bar bg-warning" style="width: 70%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Projects Section -->
            <section class="mb-5">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h3 class="card-title h5 mb-0">
                            <i class="bi bi-folder-fill text-primary"></i>
                            Мои проекты
                        </h3>
                    </div>
                    <div class="card-body">
                        <div class="row g-3">
                            <div class="col-md-4">
                                <div class="card h-100">
                                    <img src="images/project1.jpg" class="card-img-top" alt="Личный сайт" style="height: 150px; object-fit: cover;">
                                    <div class="card-body">
                                        <h5 class="card-title">Личный сайт</h5>
                                        <p class="card-text small text-muted">
                                            Сайт-портфолио на HTML, CSS и Bootstrap с адаптивным дизайном.
                                        </p>
                                        <div class="mb-2">
                                            <span class="badge bg-primary">HTML</span>
                                            <span class="badge bg-primary">CSS</span>
                                            <span class="badge bg-primary">Bootstrap</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card h-100">
                                    <img src="images/project2.jpg" class="card-img-top" alt="Todo приложение" style="height: 150px; object-fit: cover;">
                                    <div class="card-body">
                                        <h5 class="card-title">Todo приложение</h5>
                                        <p class="card-text small text-muted">
                                            Приложение для управления задачами с использованием JavaScript.
                                        </p>
                                        <div class="mb-2">
                                            <span class="badge bg-success">JavaScript</span>
                                            <span class="badge bg-success">LocalStorage</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card h-100">
                                    <img src="images/project3.jpg" class="card-img-top" alt="Интернет-магазин" style="height: 150px; object-fit: cover;">
                                    <div class="card-body">
                                        <h5 class="card-title">Интернет-магазин</h5>
                                        <p class="card-text small text-muted">
                                            Прототип интернет-магазина с корзиной товаров и фильтрацией.
                                        </p>
                                        <div class="mb-2">
                                            <span class="badge bg-info">React</span>
                                            <span class="badge bg-info">API</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <!-- Footer -->
        <footer class="bg-dark text-white py-4 mt-5">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <p class="mb-0">&copy; 2024 Портфолио студента. Все права защищены.</p>
                    </div>
                    <div class="col-md-6 text-md-end">
                        <a href="pages/contacts.html" class="text-white text-decoration-none me-3">Контакты</a>
                        <a href="#" class="text-white text-decoration-none">Политика конфиденциальности</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```
Получим следующий результат:

![](images/1-1.png)

### ЭТАП2. Самостоятельная работа

В качестве самостоятельной работы необходимо построить страницу "Главная" и "Товары", собрав их полностью на Bootstrap компонентах. Предыдущую версию index.html оставьте в репозитории, переименовав index_v1.html, а товары в goods_v1.html.

## Базовое задание

В качестве результата по итогам занятия необходимо прикрепить ссылку в соответствующий раздел рабочей области в СДО.