import { useParams, Link } from 'react-router-dom';

function UserProfile() {
  // Получаем параметр userId из URL
  const { userId } = useParams();
  
  // В реальном приложении здесь был бы запрос к API
  // Сейчас используем mock данные
  const users = {
    1: { id: 1, name: 'Анна', role: 'Фронтенд разработчик', progress: 75 },
    2: { id: 2, name: 'Иван', role: 'Бэкенд разработчик', progress: 60 },
    3: { id: 3, name: 'Мария', role: 'Fullstack разработчик', progress: 85 }
  };

  const user = users[userId];

  // Если пользователь не найден
  if (!user) {
    return (
      <div className="page">
        <h1>Пользователь не найден</h1>
        <p>Пользователь с ID {userId} не существует.</p>
        <Link to="/">Вернуться на главную</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Профиль пользователя</h1>
      <div className="user-info">
        <h2>{user.name}</h2>
        <p><strong>Должность:</strong> {user.role}</p>
        <p><strong>Прогресс:</strong> {user.progress}%</p>
      </div>
      
      <div className="user-actions">
        <Link to="/" className="back-link">← Назад к списку</Link>
      </div>
    </div>
  );
}

export default UserProfile;