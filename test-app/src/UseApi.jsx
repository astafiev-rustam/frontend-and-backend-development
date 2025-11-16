import { useState, useEffect, useCallback } from 'react';

// Кастомный хук для работы с API
function useApi(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для выполнения запроса
  const fetchData = useCallback(async (abortController) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        ...options,
        signal: abortController?.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);

    } catch (err) {
      // Игнорируем ошибки отмены запроса
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [url]); // Только url как зависимость

  // Выполняем запрос при изменении URL
  useEffect(() => {
    const abortController = new AbortController();
    
    // Выполняем запрос только если URL существует
    if (url) {
      fetchData(abortController);
    }

    // Функция очистки - отменяем запрос при размонтировании
    return () => {
      abortController.abort();
    };
  }, [url, fetchData]); // fetchData стабильна благодаря useCallback

  // Функция для повторного выполнения запроса
  const refetch = useCallback(() => {
    const abortController = new AbortController();
    fetchData(abortController);
    return () => abortController.abort();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

export default useApi;