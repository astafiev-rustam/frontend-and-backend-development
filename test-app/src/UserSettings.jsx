// UserSettings.jsx - компонент настроек пользователя
import useLocalStorage from './useLocalStorage';

function UserSettings() {
  // Используем наш кастомный хук для разных настроек
  const [username, setUsername] = useLocalStorage('username', 'Гость');
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [notifications, setNotifications] = useLocalStorage('notifications', true);

  return (
    <div className="user-settings">
      <h2>Настройки пользователя</h2>
      
      <div className="setting-group">
        <label>Имя пользователя:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Введите ваше имя"
        />
      </div>

      <div className="setting-group">
        <label>Тема оформления:</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Светлая</option>
          <option value="dark">Темная</option>
          <option value="auto">Авто</option>
        </select>
      </div>

      <div className="setting-group">
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          Включить уведомления
        </label>
      </div>

      <div className="current-settings">
        <h3>Текущие настройки:</h3>
        <p>Имя: {username}</p>
        <p>Тема: {theme}</p>
        <p>Уведомления: {notifications ? 'Включены' : 'Выключены'}</p>
      </div>
    </div>
  );
}

export default UserSettings;