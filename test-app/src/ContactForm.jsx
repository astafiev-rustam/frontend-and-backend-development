import { useState, useEffect } from 'react';

function ContactForm() {
  // Состояние для данных формы
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Состояние для ошибок валидации
  const [errors, setErrors] = useState({});
  // Состояние для общей валидности формы
  const [isFormValid, setIsFormValid] = useState(false);

  // useEffect для валидации при каждом изменении formData
  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};

      // Валидация имени - обязательно, минимум 2 символа
      if (!formData.name.trim()) {
        newErrors.name = 'Имя обязательно для заполнения';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Имя должно содержать минимум 2 символа';
      }

      // Валидация email - проверка формата
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) {
        newErrors.email = 'Email обязателен для заполнения';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Введите корректный email адрес';
      }

      // Валидация сообщения - обязательно, минимум 10 символов
      if (!formData.message.trim()) {
        newErrors.message = 'Сообщение обязательно для заполнения';
      } else if (formData.message.trim().length < 10) {
        newErrors.message = 'Сообщение должно содержать минимум 10 символов';
      }

      // Обновляем состояния ошибок и валидности
      setErrors(newErrors);
      setIsFormValid(Object.keys(newErrors).length === 0);
    };

    validateForm();
  }, [formData]); // Зависимость от formData - валидация при каждом изменении

  // Обработчик изменения полей ввода
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Обновляем formData, сохраняя предыдущие значения
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // В реальном приложении здесь был бы API запрос
      console.log('Данные для отправки:', formData);
      alert('Форма успешно отправлена!');
      
      // Сброс формы после отправки
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Форма обратной связи</h2>
      
      {/* Поле имени */}
      <div className="form-group">
        <label htmlFor="name">Имя *</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          placeholder="Введите ваше имя"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      {/* Поле email */}
      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          placeholder="example@mail.com"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      {/* Поле телефона (необязательное) */}
      <div className="form-group">
        <label htmlFor="phone">Телефон</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+7 (999) 999-99-99"
        />
      </div>

      {/* Поле сообщения */}
      <div className="form-group">
        <label htmlFor="message">Сообщение *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className={errors.message ? 'error' : ''}
          placeholder="Введите ваше сообщение..."
        />
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>

      {/* Кнопка отправки */}
      <button 
        type="submit" 
        disabled={!isFormValid}
        className={!isFormValid ? 'disabled' : ''}
      >
        Отправить сообщение
      </button>
    </form>
  );
}

export default ContactForm;