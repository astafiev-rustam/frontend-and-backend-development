// ProgressDashboard.jsx - демонстрация разных вариантов прогресс-бара
import ProgressBar from './ProgressBar';
import './ProgressDashboard.css'; // Добавим файл со стилями

function ProgressDashboard() {
  const overallProgress = 65;
  const frontendProgress = 80;
  const backendProgress = 50;
  const databaseProgress = 30;
  
  // Прогресс по неделям
  const weeklyProgress = [90, 75, 60, 45, 30, 15];

  return (
    <div className="progress-dashboard">
      <h2>Мой прогресс в изучении</h2>
      
      {/* Основной прогресс-бар */}
      <ProgressBar 
        progress={overallProgress}
        label="Общий прогресс"
        color="#2196F3"
        height={25}
      />

      {/* Прогресс-бар для фронтенда */}
      <ProgressBar 
        progress={frontendProgress}
        label="Фронтенд разработка"
        color="#4CAF50"
        showPercentage={true}
      />

      {/* Прогресс-бар для бэкенда */}
      <ProgressBar 
        progress={backendProgress}
        label="Бэкенд разработка"
        color="#FF9800"
        showPercentage={true}
      />

      {/* Прогресс-бар для баз данных */}
      <ProgressBar 
        progress={databaseProgress}
        label="Базы данных"
        color="#F44336"
        height={15}
        showPercentage={false}
      />

      {/* Прогресс по неделям - исправленная версия */}
      <div className="weekly-progress">
        <h3>Прогресс по неделям:</h3>
        <div className="weekly-bars">
          {weeklyProgress.map((progress, index) => (
            <div key={index} className="week-item">
              <span className="week-label">Неделя {index + 1}</span>
              <ProgressBar 
                progress={progress} 
                height={12} 
                showPercentage={false} 
                color="#9C27B0"
              />
              <span className="week-percentage">{progress}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProgressDashboard;