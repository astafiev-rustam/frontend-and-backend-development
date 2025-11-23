import { useState, useRef, useEffect } from 'react';

function WorkingAccessibleForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  
  const statusRef = useRef(null);
  const nameRef = useRef(null);

  // Валидация при изменении полей
  useEffect(() => {
    const newErrors = {};
    
    if (name && name.length < 2) {
      newErrors.name = 'Имя должно быть не короче 2 символов';
    }
    
    if (email && !email.includes('@')) {
      newErrors.email = 'Email должен содержать @';
    }
    
    if (message && message.length < 5) {
      newErrors.message = 'Сообщение должно быть не короче 5 символов';
    }
    
    setErrors(newErrors);
  }, [name, email, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!name) newErrors.name = 'Введите имя';
    if (!email) newErrors.email = 'Введите email';
    if (!message) newErrors.message = 'Введите сообщение';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (statusRef.current) {
        statusRef.current.textContent = 'Заполните все обязательные поля';
      }
      // Фокусируемся на первом поле с ошибкой
      if (nameRef.current) {
        nameRef.current.focus();
      }
      return;
    }
    
    // Если есть другие ошибки валидации
    if (Object.keys(errors).length > 0) {
      if (statusRef.current) {
        statusRef.current.textContent = 'Исправьте ошибки в форме';
      }
      return;
    }
    
    // Успешная отправка
    if (statusRef.current) {
      statusRef.current.textContent = 'Форма успешно отправлена!';
    }
    console.log('Отправлены данные:', { name, email, message });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h1>Контактная форма</h1>
      
      {/* Область для скринридера */}
      <div
        ref={statusRef}
        aria-live="assertive"
        style={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
      />
      
      <form onSubmit={handleSubmit} noValidate>
        {/* Поле имени */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
            Ваше имя *
          </label>
          <input
            ref={nameRef}
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.name ? '2px solid red' : '1px solid #ccc',
              fontSize: '16px'
            }}
          />
          {errors.name && (
            <div id="name-error" style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
              {errors.name}
            </div>
          )}
        </div>

        {/* Поле email */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email адрес *
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.email ? '2px solid red' : '1px solid #ccc',
              fontSize: '16px'
            }}
          />
          {errors.email && (
            <div id="email-error" style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
              {errors.email}
            </div>
          )}
        </div>

        {/* Поле сообщения */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>
            Ваше сообщение *
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.message ? '2px solid red' : '1px solid #ccc',
              fontSize: '16px',
              fontFamily: 'inherit'
            }}
          />
          {errors.message && (
            <div id="message-error" style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
              {errors.message}
            </div>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Отправить сообщение
        </button>
      </form>
      
      {/* Визуальный статус */}
      <div 
        aria-live="polite"
        style={{ 
          marginTop: '15px',
          padding: '10px',
          border: '1px solid #ddd',
          backgroundColor: '#f9f9f9',
          display: 'none' // Скрыт визуально, но доступен для скринридеров
        }}
      >
        Статус формы будет отображаться здесь для скринридеров
      </div>
    </div>
  );
}

export default WorkingAccessibleForm;