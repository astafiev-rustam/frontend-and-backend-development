import { useState, useEffect } from 'react';

function UserProfile() {
  // Три состояния: данные, загрузка, ошибка
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect для загрузки данных при монтировании компонента
  useEffect(() => {
    // Асинхронная функция для запроса данных
    const fetchUser = async () => {
      try {
        // Сбрасываем состояния перед началом загрузки
        setLoading(true);
        setError(null);
        
        // Имитация запроса к API (можно заменить на реальный endpoint)
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        
        // Проверяем успешность ответа
        if (!response.ok) {
          throw new Error('Не удалось загрузить данные пользователя');
        }
        
        // Парсим JSON и обновляем состояние
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        // Обрабатываем ошибки
        setError(err.message);
      } finally {
        // Выключаем индикатор загрузки в любом случае
        setLoading(false);
      }
    };

    // Вызываем функцию загрузки
    fetchUser();
  }, []); // Пустой массив = загрузка только при первом рендере

  // Показываем индикатор загрузки
  if (loading) {
    return (
      <div className="user-profile loading">
        <p>Загрузка профиля...</p>
      </div>
    );
  }

  // Показываем сообщение об ошибке
  if (error) {
    return (
      <div className="user-profile error">
        <p>Ошибка: {error}</p>
        <button onClick={() => window.location.reload()}>
          Попробовать снова
        </button>
      </div>
    );
  }

  // Рендерим данные пользователя
  return (
    <div className="user-profile">
      <h2>Профиль пользователя</h2>
      <div className="user-info">
        <p><strong>Имя:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Телефон:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
      </div>
    </div>
  );
}

export default UserProfile;