import { useState, useEffect } from 'react';

// Кастомный хук для работы с localStorage
function useLocalStorage(key, initialValue) {
  // Инициализируем состояние, пытаясь получить значение из localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Пытаемся получить значение по ключу из localStorage
      const item = window.localStorage.getItem(key);
      // Если значение найдено, парсим его из JSON, иначе используем initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // В случае ошибки (например, недоступный localStorage) используем initialValue
      console.error(`Ошибка чтения из localStorage ключа "${key}":`, error);
      return initialValue;
    }
  });

  // Функция для обновления значения в состоянии и localStorage
  const setValue = (value) => {
    try {
      // Разрешаем value быть функцией, как в useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Сохраняем в состояние
      setStoredValue(valueToStore);
      
      // Сохраняем в localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Ошибка записи в localStorage ключа "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;