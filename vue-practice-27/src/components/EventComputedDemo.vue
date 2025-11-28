<template>
  <div class="demo-container">
    <h2>Пример 3: События и вычисляемые свойства</h2>

    <!-- Таймер изучения -->
    <div class="timer-section">
      <h3>Таймер изучения</h3>
      <div class="timer-display">
        {{ formatTime(elapsedTime) }}
      </div>
      <div class="timer-controls">
        <button @click="startTimer" :disabled="isRunning" class="timer-button start">
          Старт
        </button>
        <button @click="pauseTimer" :disabled="!isRunning" class="timer-button pause">
          Пауза
        </button>
        <button @click="resetTimer" class="timer-button reset">
          Сброс
        </button>
      </div>
    </div>

    <!-- Список сессий изучения -->
    <div class="sessions-section">
      <h3>Сессии изучения</h3>
      
      <div v-if="studySessions.length === 0" class="no-sessions">
        <p>Сессий пока нет. Запустите таймер!</p>
      </div>

      <div v-else class="sessions-list">
        <div 
          v-for="session in sortedSessions" 
          :key="session.id"
          class="session-item"
        >
          <div class="session-info">
            <span class="session-date">{{ formatDate(session.date) }}</span>
            <span class="session-duration">{{ formatTime(session.duration) }}</span>
          </div>
          <button @click="removeSession(session.id)" class="delete-session">
            ×
          </button>
        </div>
      </div>

      <!-- Статистика сессий -->
      <div class="sessions-stats">
        <p>Всего сессий: {{ totalSessions }}</p>
        <p>Общее время: {{ formatTime(totalStudyTime) }}</p>
        <p>Средняя продолжительность: {{ formatTime(averageSessionTime) }}</p>
      </div>
    </div>

    <!-- Быстрые действия с модификаторами событий -->
    <div class="quick-actions">
      <h3>Быстрые действия</h3>
      <div class="action-buttons">
        <!-- Модификатор .prevent предотвращает действие по умолчанию -->
        <button @click.prevent="addQuickSession(30)" class="action-button">
          +30 мин
        </button>
        <button @click.prevent="addQuickSession(60)" class="action-button">
          +1 час
        </button>
        <!-- Модификатор .once срабатывает только один раз -->
        <button @click.once="addOneTimeSession" class="action-button special">
          Одноразовая сессия
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onUnmounted } from 'vue'

export default {
  name: 'EventComputedDemo',
  
  setup() {
    // Таймер
    const elapsedTime = ref(0)
    const isRunning = ref(false)
    let timerInterval = null

    // Сессии изучения
    const studySessions = ref([])

    // Вычисляемые свойства для статистики
    const totalSessions = computed(() => studySessions.value.length)

    const totalStudyTime = computed(() => 
      studySessions.value.reduce((total, session) => total + session.duration, 0)
    )

    const averageSessionTime = computed(() => {
      if (totalSessions.value === 0) return 0
      return Math.round(totalStudyTime.value / totalSessions.value)
    })

    const sortedSessions = computed(() => 
      [...studySessions.value].sort((a, b) => new Date(b.date) - new Date(a.date))
    )

    // Методы таймера
    const startTimer = () => {
      isRunning.value = true
      timerInterval = setInterval(() => {
        elapsedTime.value += 1
      }, 1000)
    }

    const pauseTimer = () => {
      isRunning.value = false
      if (timerInterval) {
        clearInterval(timerInterval)
        timerInterval = null
      }
    }

    const resetTimer = () => {
      pauseTimer()
      
      // Сохраняем сессию если прошло больше 30 секунд
      if (elapsedTime.value >= 30) {
        studySessions.value.push({
          id: Date.now(),
          date: new Date().toISOString(),
          duration: elapsedTime.value
        })
      }
      
      elapsedTime.value = 0
    }

    // Методы для сессий
    const removeSession = (sessionId) => {
      studySessions.value = studySessions.value.filter(session => session.id !== sessionId)
    }

    const addQuickSession = (minutes) => {
      const duration = minutes * 60 // переводим в секунды
      studySessions.value.push({
        id: Date.now(),
        date: new Date().toISOString(),
        duration: duration
      })
    }

    const addOneTimeSession = () => {
      addQuickSession(45)
      alert('Одноразовая сессия добавлена! Эта кнопка больше не сработает.')
    }

    // Вспомогательные методы
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString('ru-RU')
    }

    // Очистка при размонтировании компонента
    onUnmounted(() => {
      if (timerInterval) {
        clearInterval(timerInterval)
      }
    })

    return {
      elapsedTime,
      isRunning,
      studySessions,
      totalSessions,
      totalStudyTime,
      averageSessionTime,
      sortedSessions,
      startTimer,
      pauseTimer,
      resetTimer,
      removeSession,
      addQuickSession,
      addOneTimeSession,
      formatTime,
      formatDate
    }
  }
}
</script>

<style scoped>
.demo-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
}

.timer-section {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.timer-display {
  font-size: 3rem;
  font-weight: bold;
  margin: 20px 0;
  color: #007bff;
}

.timer-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.timer-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.timer-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.timer-button.start {
  background-color: #28a745;
  color: white;
}

.timer-button.pause {
  background-color: #ffc107;
  color: black;
}

.timer-button.reset {
  background-color: #dc3545;
  color: white;
}

.sessions-section {
  margin-bottom: 30px;
}

.sessions-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.session-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.session-info {
  display: flex;
  flex-direction: column;
}

.session-date {
  font-size: 14px;
  color: #666;
}

.session-duration {
  font-weight: bold;
  color: #007bff;
}

.delete-session {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #dc3545;
}

.no-sessions {
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
}

.sessions-stats {
  padding: 15px;
  background-color: #e9ecef;
  border-radius: 5px;
}

.quick-actions {
  text-align: center;
}

.action-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-button {
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.action-button.special {
  background-color: #17a2b8;
}
</style>