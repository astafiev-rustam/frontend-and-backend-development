|||
|---|---|
|ДИСЦИПЛИНА|Фронтенд и бэкенд разработка|
|ИНСТИТУТ|ИПТИП|
|КАФЕДРА|Индустриального программирования|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|
|ПРЕПОДАВАТЕЛЬ|Астафьев Рустам Уралович|
|СЕМЕСТР|1 семестр, 2025/2026 уч. год|

Ссылка на материал: <br>
https://github.com/astafiev-rustam/frontend-and-backend-development/tree/practice-1-10

---

# Практическое занятие 10: Разработка форм и модальных окон

## Что такое модальное окно и зачем оно нужно?

**Модальное окно** — это специальный интерфейсный элемент, который появляется поверх основного содержимого страницы и временно блокирует взаимодействие с остальной частью интерфейса. Представьте, что вы читаете книгу, и вдруг вам подсовывают важное уведомление, которое требует вашего внимания прямо сейчас — вот именно так работает модальное окно.

Исторически модальные окна реализовывались сложными комбинациями HTML, CSS и JavaScript. Разработчикам приходилось вручную управлять отображением, анимациями, позиционированием и, что особенно важно, доступностью. Однако с приходом HTML5 появился революционный элемент `<dialog>`, который кардинально упростил создание модальных окон.

## Современный подход: элемент `<dialog>`

Элемент `<dialog>` — это нативная браузерная технология, которая предоставляет встроенную функциональность модальных окон. Почему это так важно? Потому что браузер берет на себя всю сложную работу: управление фокусом, блокировку фонового контента, обработку клавиши ESC и даже базовую анимацию.

## Продолжение работы над проектом

Пошагово выполним преобразование семантики проекта и упростим вёрстку страниц с помощью вышеупомянутых инструментов

В случае возникновения вопросов, подробно с материалами можно ознакомиться в файлах лекций.

### ЭТАП 1. Работа над добавлением модального окна в проект

Отредактируем содержимое файлов проекта так, чтобы кнопка связи на странице контактов открывала модальное окно, которое содержит поля анкеты (имя, телефон, почта, выбор категории обращения, текст обращения).

Таким образом, результат реализации следующий:

```html
<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Контакты</title>
        <link rel="stylesheet" href="../style/styles.css">
        <style>
            /* Стили для модального окна */
            dialog::backdrop {
                background: rgba(0, 0, 0, 0.6);
                animation: fadeIn 0.3s ease;
            }

            dialog {
                border: none;
                border-radius: 12px;
                padding: 0;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                animation: slideIn 0.3s ease;
                max-width: 500px;
                width: 90vw;
                max-height: 90vh;
                overflow-y: auto;
            }

            .modal-header {
                background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
                color: white;
                padding: 1.5rem;
                border-radius: 12px 12px 0 0;
                margin: 0;
            }

            .modal-header h2 {
                margin: 0;
                color: white;
                font-size: 1.5rem;
            }

            .modal-content {
                padding: 2rem;
            }

            .form-group {
                margin-bottom: 1.5rem;
            }

            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 600;
                color: #2c3e50;
            }

            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid #e9ecef;
                border-radius: 6px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
                box-sizing: border-box;
            }

            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: #667eea;
            }

            .form-group textarea {
                min-height: 100px;
                resize: vertical;
            }

            .modal-actions {
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
                margin-top: 2rem;
            }

            .btn {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
                font-weight: 600;
            }

            .btn-primary {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }

            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
            }

            .btn-secondary {
                background: #f8f9fa;
                color: #2c3e50;
                border: 2px solid #e9ecef;
            }

            .btn-secondary:hover {
                background: #e9ecef;
            }

            .required {
                color: #e74c3c;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes slideIn {
                from { 
                    opacity: 0;
                    transform: translateY(-50px) scale(0.9);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }

            /* Адаптивность */
            @media (max-width: 600px) {
                dialog {
                    margin: 1rem;
                    width: calc(100vw - 2rem);
                }
                
                .modal-actions {
                    flex-direction: column;
                }
                
                .btn {
                    width: 100%;
                }
            }
        </style>
    </head>
    <body>
        <div class="page-container">
            <header class="header">
                <h1>Контакты</h1>
            </header>

            <nav class="nav">
                <ul class="nav-list">
                    <li class="nav-item"><a class="nav-link" href="../index.html">Главная</a></li>
                    <li class="nav-item"><a class="nav-link" href="news.html">Новости</a></li>
                    <li class="nav-item"><a class="nav-link" href="practices.html">Практики</a></li> 
                    <li class="nav-item"><a class="nav-link" href="goods.html">Товары</a></li>
                    <li class="nav-item"><a class="nav-link" href="contacts.html">Контакты</a></li>
                </ul>
            </nav>

            <main class="content">
                <section class="contacts-container">
                    <h2 class="section-title">Наши контакты</h2>
                    
                    <article class="contact-info">
                        <h3>Электронная почта</h3>
                        <p>Адрес электронной почты: astafev@mirea.ru</p>
                    </article>
                    
                    <article class="contact-info">
                        <h3>Физический адрес</h3>
                        <p>Адрес: г. Москва, ул. Пушкина, д. Колотушкина</p>
                    </article>

                    <div class="contact-grid">
                        <div class="contact-item">
                            <h3>Телефон</h3>
                            <p>+7 (495) 123-45-67</p>
                        </div>
                        <div class="contact-item">
                            <h3>Время работы</h3>
                            <p>Пн-Пт: 9:00-18:00</p>
                        </div>
                        <div class="contact-item">
                            <h3>Социальные сети</h3>
                            <p>VK, Telegram, WhatsApp</p>
                        </div>
                    </div>
                    
                    <!-- Измененная кнопка для открытия модального окна -->
                    <button class="contact-button" onclick="contactModal.showModal()">Связаться с нами</button>
                </section>
            </main>

            <footer class="footer">
                <p>© 2024 Все права защищены. Контактная информация</p>
            </footer>

            <!-- Модальное окно для формы обратной связи -->
            <dialog id="contactModal">
                <div class="modal-header">
                    <h2>Форма обратной связи</h2>
                </div>
                
                <div class="modal-content">
                    <form id="feedbackForm" method="dialog">
                        <div class="form-group">
                            <label for="name">Имя <span class="required">*</span></label>
                            <input type="text" id="name" name="name" required placeholder="Введите ваше имя">
                        </div>

                        <div class="form-group">
                            <label for="phone">Телефон <span class="required">*</span></label>
                            <input type="tel" id="phone" name="phone" required placeholder="+7 (XXX) XXX-XX-XX">
                        </div>

                        <div class="form-group">
                            <label for="email">Электронная почта <span class="required">*</span></label>
                            <input type="email" id="email" name="email" required placeholder="example@mail.ru">
                        </div>

                        <div class="form-group">
                            <label for="category">Категория обращения <span class="required">*</span></label>
                            <select id="category" name="category" required>
                                <option value="">Выберите категорию</option>
                                <option value="technical">Техническая поддержка</option>
                                <option value="commercial">Коммерческое предложение</option>
                                <option value="cooperation">Сотрудничество</option>
                                <option value="complaint">Жалоба</option>
                                <option value="suggestion">Предложение</option>
                                <option value="other">Другое</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="message">Текст обращения <span class="required">*</span></label>
                            <textarea id="message" name="message" required placeholder="Опишите вашу проблему или вопрос..."></textarea>
                        </div>

                        <div class="modal-actions">
                            <!-- Кнопка отмены с автоматическим закрытием через form method="dialog" -->
                            <button type="submit" class="btn btn-secondary">Отмена</button>
                            <!-- Кнопка отправки с обработкой через JavaScript -->
                            <button type="button" class="btn btn-primary" onclick="submitForm()">Отправить</button>
                        </div>
                    </form>
                </div>
            </dialog>

            <script>
                // Функция для отправки формы
                function submitForm() {
                    const form = document.getElementById('feedbackForm');
                    const formData = new FormData(form);
                    
                    // Простая валидация
                    if (!form.checkValidity()) {
                        form.reportValidity();
                        return;
                    }

                    // Собираем данные формы
                    const data = {
                        name: formData.get('name'),
                        phone: formData.get('phone'),
                        email: formData.get('email'),
                        category: formData.get('category'),
                        message: formData.get('message')
                    };

                    // В реальном приложении здесь был бы AJAX-запрос
                    console.log('Данные формы:', data);
                    
                    // Показываем уведомление об успешной отправке
                    alert('Спасибо! Ваше обращение отправлено. Мы свяжемся с вами в ближайшее время.');
                    
                    // Закрываем модальное окно
                    contactModal.close();
                    
                    // Очищаем форму
                    form.reset();
                }

                // Закрытие модального окна по клику на фон
                document.getElementById('contactModal').addEventListener('click', function(event) {
                    if (event.target === this) {
                        this.close();
                    }
                });

                // Обработка отправки формы через Enter (предотвращаем стандартное поведение)
                document.getElementById('feedbackForm').addEventListener('keypress', function(event) {
                    if (event.key === 'Enter' && event.target.type !== 'textarea') {
                        event.preventDefault();
                    }
                });
            </script>
        </div>
    </body>
</html>
```

Получим следующий результат:
![](images/1-1.png)

### ЭТАП2. Самостоятельная работа

В качестве самостоятельной работы необходимо подробно разобрать механизмы функционирования страницы модального окна и применить технологию к собственному проекту (своему приложению с вызовом своего модального окна).

## Базовое задание

В качестве результата по итогам занятия необходимо прикрепить ссылку в соответствующий раздел рабочей области в СДО.