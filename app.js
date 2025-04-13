// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    // Загрузка начального контента
    loadContent('home');
    
    // Обработчики кнопок навигации
    document.getElementById('home-btn').addEventListener('click', () => {
        setActiveButton('home-btn');
        loadContent('home');
    });
    
    document.getElementById('about-btn').addEventListener('click', () => {
        setActiveButton('about-btn');
        loadContent('about');
    });
});

// Функция загрузки контента
async function loadContent(page) {
    try {
        const response = await fetch(`/content/${page}.html`);
        const content = await response.text();
        document.getElementById('app-content').innerHTML = content;
    } catch (error) {
        document.getElementById('app-content').innerHTML = `
            <div class="error">
                <h2>Ошибка загрузки</h2>
                <p>Не удалось загрузить содержимое страницы</p>
            </div>
        `;
    }
}

// Функция активации кнопки
function setActiveButton(buttonId) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(buttonId).classList.add('active');
}

// Регистрация Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
          console.log('ServiceWorker зарегистрирован:', registration.scope);
        })
        .catch(function(err) {
          console.log('Ошибка регистрации ServiceWorker:', err);
        });
    });
  }