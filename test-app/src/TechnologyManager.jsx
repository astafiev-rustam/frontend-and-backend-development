// В компоненте, где используется TechnologyForm (например, App.js или TechnologyManager.js)
import { useState } from 'react';
import TechnologyForm from './TechnologyForm';

function TechnologyManager() {
  const [technologies, setTechnologies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTech, setEditingTech] = useState(null);

  // Обработчик сохранения технологии
  const handleSaveTechnology = (techData) => {
    if (editingTech) {
      // Редактирование существующей технологии
      setTechnologies(prev => 
        prev.map(tech => 
          tech.id === editingTech.id 
            ? { ...tech, ...techData, updatedAt: new Date().toISOString() }
            : tech
        )
      );
    } else {
      // Добавление новой технологии
      const newTechnology = {
        id: Date.now(), // В реальном приложении ID генерируется на сервере
        ...techData,
        status: 'not-started',
        createdAt: new Date().toISOString(),
        notes: '',
        progress: 0
      };
      setTechnologies(prev => [...prev, newTechnology]);
    }
    
    // Закрываем форму после сохранения
    setShowForm(false);
    setEditingTech(null);
  };

  // Обработчик редактирования
  const handleEdit = (technology) => {
    setEditingTech(technology);
    setShowForm(true);
  };

  // Обработчик отмены
  const handleCancel = () => {
    setShowForm(false);
    setEditingTech(null);
  };

  return (
    <div className="technology-manager">
      <div className="manager-header">
        <h2>Управление технологиями</h2>
        <button 
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          + Добавить технологию
        </button>
      </div>

      {/* Список технологий */}
      <div className="technologies-list">
        {technologies.map(tech => (
          <div key={tech.id} className="technology-item">
            <h3>{tech.title}</h3>
            <p>{tech.description}</p>
            <div className="tech-actions">
              <button onClick={() => handleEdit(tech)}>
                Редактировать
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Форма добавления/редактирования */}
      {showForm && (
        <div className="form-modal">
          <div className="modal-content">
            <TechnologyForm
              onSave={handleSaveTechnology}
              onCancel={handleCancel}
              initialData={editingTech || {}}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TechnologyManager;