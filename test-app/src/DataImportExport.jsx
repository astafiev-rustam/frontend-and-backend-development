import { useState, useEffect } from 'react';

function DataImportExport() {
  const [technologies, setTechnologies] = useState([]);
  const [status, setStatus] = useState('');

  // Загрузка данных из localStorage при старте
  useEffect(() => {
    const savedData = localStorage.getItem('techTrackerData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setTechnologies(parsedData);
        setStatus(`Загружено ${parsedData.length} технологий из памяти`);
      } catch (error) {
        setStatus('Ошибка загрузки данных из памяти');
      }
    }
  }, []);

  // Автосохранение при изменении technologies
  useEffect(() => {
    if (technologies.length > 0) {
      localStorage.setItem('techTrackerData', JSON.stringify(technologies));
    }
  }, [technologies]);

  // Экспорт данных в JSON файл
  const handleExport = () => {
    const exportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      technologies: technologies,
      stats: {
        total: technologies.length,
        completed: technologies.filter(t => t.status === 'completed').length,
        inProgress: technologies.filter(t => t.status === 'in-progress').length
      }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `tech-tracker-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setStatus(`Экспортировано ${technologies.length} технологий`);
  };

  // Импорт данных из JSON файла
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const fileContent = e.target.result;
        const importedData = JSON.parse(fileContent);
        
        // Проверяем структуру файла
        if (!importedData.technologies || !Array.isArray(importedData.technologies)) {
          throw new Error('Неверный формат файла');
        }

        // Валидация каждой технологии
        const validTechnologies = importedData.technologies.filter(tech => 
          tech && tech.id && tech.title && tech.description
        );

        if (validTechnologies.length === 0) {
          throw new Error('В файле нет валидных технологий');
        }

        // Добавляем импортированные технологии
        setTechnologies(prev => {
          const newTech = validTechnologies.filter(newTech => 
            !prev.some(existingTech => existingTech.id === newTech.id)
          );
          return [...prev, ...newTech];
        });

        setStatus(`Импортировано ${validTechnologies.length} технологий`);
        
      } catch (error) {
        setStatus(`Ошибка импорта: ${error.message}`);
      }
    };

    reader.onerror = () => {
      setStatus('Ошибка чтения файла');
    };

    reader.readAsText(file);
    
    // Сбрасываем input чтобы можно было выбрать тот же файл снова
    event.target.value = '';
  };

  // Добавление тестовой технологии
  const addSampleTechnology = () => {
    const newTech = {
      id: Date.now(),
      title: `Технология ${technologies.length + 1}`,
      description: 'Описание технологии для демонстрации',
      status: 'not-started',
      category: 'frontend',
      createdAt: new Date().toISOString()
    };
    
    setTechnologies(prev => [...prev, newTech]);
    setStatus('Добавлена тестовая технология');
  };

  // Очистка всех данных
  const clearAllData = () => {
    setTechnologies([]);
    localStorage.removeItem('techTrackerData');
    setStatus('Все данные очищены');
  };

  // Изменение статуса технологии
  const toggleStatus = (techId) => {
    setTechnologies(prev => 
      prev.map(tech => {
        if (tech.id === techId) {
          const statuses = ['not-started', 'in-progress', 'completed'];
          const currentIndex = statuses.indexOf(tech.status);
          const nextStatus = statuses[(currentIndex + 1) % statuses.length];
          
          return { ...tech, status: nextStatus };
        }
        return tech;
      })
    );
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '20px auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Импорт/Экспорт данных</h1>
      
      {/* Статус */}
      {status && (
        <div style={{
          padding: '10px',
          margin: '10px 0',
          backgroundColor: status.includes('Ошибка') ? '#ffebee' : '#e8f5e8',
          border: `1px solid ${status.includes('Ошибка') ? '#f44336' : '#4caf50'}`,
          borderRadius: '4px'
        }}>
          {status}
        </div>
      )}

      {/* Управление данными */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        flexWrap: 'wrap',
        marginBottom: '20px'
      }}>
        <button
          onClick={addSampleTechnology}
          style={{
            padding: '10px 15px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          + Добавить тестовую технологию
        </button>

        <button
          onClick={handleExport}
          disabled={technologies.length === 0}
          style={{
            padding: '10px 15px',
            backgroundColor: technologies.length === 0 ? '#ccc' : '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: technologies.length === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          📥 Экспорт в JSON ({technologies.length})
        </button>

        <label style={{
          padding: '10px 15px',
          backgroundColor: '#ff9800',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'inline-block'
        }}>
          📤 Импорт из JSON
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </label>

        <button
          onClick={clearAllData}
          disabled={technologies.length === 0}
          style={{
            padding: '10px 15px',
            backgroundColor: technologies.length === 0 ? '#ccc' : '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: technologies.length === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          🗑️ Очистить все
        </button>
      </div>

      {/* Список технологий */}
      <div>
        <h2>Технологии ({technologies.length})</h2>
        
        {technologies.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            Технологий пока нет. Добавьте первую или импортируйте данные.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {technologies.map(tech => (
              <div
                key={tech.id}
                style={{
                  padding: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0' }}>{tech.title}</h3>
                    <p style={{ margin: '0 0 10px 0', color: '#666' }}>
                      {tech.description}
                    </p>
                    <div style={{ fontSize: '14px', color: '#888' }}>
                      Категория: {tech.category} • ID: {tech.id}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleStatus(tech.id)}
                    style={{
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      backgroundColor: 
                        tech.status === 'completed' ? '#4caf50' :
                        tech.status === 'in-progress' ? '#ff9800' : '#f44336',
                      color: 'white',
                      fontSize: '12px'
                    }}
                  >
                    {tech.status === 'completed' ? '✅ Завершено' :
                     tech.status === 'in-progress' ? '🔄 В процессе' : '⏳ Не начато'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Статистика */}
      {technologies.length > 0 && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#e3f2fd',
          borderRadius: '4px'
        }}>
          <h3>Статистика:</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div>Всего: <strong>{technologies.length}</strong></div>
            <div>Завершено: <strong>{technologies.filter(t => t.status === 'completed').length}</strong></div>
            <div>В процессе: <strong>{technologies.filter(t => t.status === 'in-progress').length}</strong></div>
            <div>Не начато: <strong>{technologies.filter(t => t.status === 'not-started').length}</strong></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataImportExport;