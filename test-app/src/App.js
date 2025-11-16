import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Добавляем useEffect
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  // Состояние для отслеживания авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Проверяем авторизацию при загрузке и при изменении
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = localStorage.getItem('username') || '';
    setIsLoggedIn(loggedIn);
    setUsername(user);
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <Router>
      <div className="app">
        <nav className="main-nav">
          <h2>Трекер технологий</h2>
          <ul className="nav-links">
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/about">О проекте</Link></li>
            
            {isLoggedIn ? (
              <>
                <li><Link to="/dashboard">Панель управления</Link></li>
                <li className="user-info">
                  <span>Привет, {username}!</span>
                  <button onClick={handleLogout} className="logout-btn">
                    Выйти
                  </button>
                </li>
              </>
            ) : (
              <li><Link to="/login">Войти</Link></li>
            )}
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route 
              path="/login" 
              element={<Login onLogin={handleLogin} />} 
            />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;