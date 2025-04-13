const VAPID_PUBLIC_KEY = 'BANyYVYp6Ne3cULh5y8QE9NWuPXtTpwPUc3DJllSANezWTM-jkKu8Ma29JbMveNJyv_bA_B3u_wSuQi2j1cyUtg'
const VAPID_PRIVATE_KEY='VH6lg8zKldw7AxC6zB1vcUmOXP6DAzItk4LtmeVWCj4'
const VAPID_EMAIL='your@email.com'
const PORT='3000'

// В начале app.js
console.log('VAPID Key:', VAPID_PUBLIC_KEY);
console.log('Key length:', VAPID_PUBLIC_KEY.length);

if (VAPID_PUBLIC_KEY.length !== 87 || !VAPID_PUBLIC_KEY.startsWith('B')) {
  alert('ОШИБКА: Неверный формат VAPID ключа! Проверьте консоль.');
  console.error('Ключ должен быть 87 символов и начинаться с "B"');
}

// Проверка поддержки
if (!('serviceWorker' in navigator)) {
  updateStatus('Service Worker не поддерживается', 'red');
  document.getElementById('subscribeBtn').disabled = true;
}

// Инициализация
document.addEventListener('DOMContentLoaded', init);

async function init() {
  try {
    const reg = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker зарегистрирован');
    
    const subscription = await reg.pushManager.getSubscription();
    updateUI(subscription);
    
    setupEventHandlers(reg, subscription);
  } catch (error) {
    console.error('Ошибка инициализации:', error);
    updateStatus(`Ошибка: ${error.message}`, 'red');
  }
}

function setupEventHandlers(reg, subscription) {
  document.getElementById('subscribeBtn').addEventListener('click', async () => {
    try {
      if (subscription) {
        await unsubscribe(subscription);
        updateUI(null);
      } else {
        const newSub = await subscribe(reg);
        updateUI(newSub);
      }
    } catch (error) {
      console.error('Ошибка:', error);
      updateStatus(`Ошибка: ${error.message}`, 'red');
    }
  });

  document.getElementById('sendBtn').addEventListener('click', sendTestNotification);
}

async function subscribe(reg) {
  const subscription = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
  });
  
  await fetch('/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription)
  });
  
  return subscription;
}

async function unsubscribe(subscription) {
  await subscription.unsubscribe();
  await fetch('/unsubscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ endpoint: subscription.endpoint })
  });
}

async function sendTestNotification() {
  const title = document.getElementById('titleInput').value;
  const body = document.getElementById('bodyInput').value;
  
  try {
    const response = await fetch('/send-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body })
    });
    
    if (!response.ok) throw new Error('Ошибка сервера');
    updateStatus('Уведомление отправлено!', 'green');
  } catch (error) {
    console.error('Ошибка отправки:', error);
    updateStatus(`Ошибка: ${error.message}`, 'red');
  }
}

function updateUI(subscription) {
  const btn = document.getElementById('subscribeBtn');
  if (subscription) {
    btn.textContent = 'Отписаться';
    updateStatus('Подписка активна', 'green');
  } else {
    btn.textContent = 'Подписаться';
    updateStatus('Не подписано', 'gray');
  }
}

function updateStatus(text, color) {
  const el = document.getElementById('status');
  el.textContent = `Статус: ${text}`;
  el.style.color = color;
}

function urlBase64ToUint8Array(base64String) {
    // Удаляем возможные пробелы и лишние символы
    base64String = base64String.trim();
    
    // Проверка длины ключа
    if (base64String.length !== 87) {
      throw new Error(`Неверная длина ключа: ${base64String.length} (должно быть 87)`);
    }
  
    // Стандартное преобразование
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    try {
      const rawData = atob(base64);
      const outputArray = new Uint8Array(rawData.length);
  
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    } catch (e) {
      throw new Error(`Ошибка декодирования: ${e.message}`);
    }
}