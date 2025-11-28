<template>
  <div class="demo-container">
    <h2>Пример 2: Условный рендеринг и списки</h2>

    <!-- Форма для добавления технологий -->
    <div class="add-form">
      <input 
        v-model="newTechName" 
        placeholder="Введите название технологии"
        class="text-input"
        @keyup.enter="addTechnology"
      >
      <button @click="addTechnology" class="add-button">
        Добавить
      </button>
    </div>

    <!-- Переключение видимости с v-show -->
    <div class="controls">
      <button @click="showCompleted = !showCompleted" class="toggle-button">
        {{ showCompleted ? 'Скрыть' : 'Показать' }} завершенные
      </button>
      <button @click="sortBy = sortBy === 'name' ? 'date' : 'name'" class="toggle-button">
        Сортировать по: {{ sortBy === 'name' ? 'названию' : 'дате' }}
      </button>
    </div>

    <!-- Условный рендеринг с v-if -->
    <div v-if="technologies.length === 0" class="empty-state">
      <p>Список технологий пуст. Добавьте первую технологию!</p>
    </div>

    <!-- Отображение списка с v-for -->
    <div v-else class="tech-list">
      <div 
        v-for="tech in sortedTechnologies" 
        :key="tech.id"
        class="tech-item"
        :class="{ completed: tech.completed }"
      >
        <div class="tech-info">
          <h3>{{ tech.name }}</h3>
          <span class="tech-date">Добавлено: {{ formatDate(tech.createdAt) }}</span>
        </div>
        
        <div class="tech-actions">
          <!-- v-show для переключения видимости -->
          <button 
            v-show="!tech.completed"
            @click="completeTechnology(tech.id)"
            class="complete-button"
          >
            Завершить
          </button>
          
          <button 
            @click="removeTechnology(tech.id)"
            class="remove-button"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>

    <!-- Статистика -->
    <div class="stats">
      <h3>Статистика:</h3>
      <p>Всего технологий: {{ technologies.length }}</p>
      <p>Активных: {{ activeCount }}</p>
      <p>Завершенных: {{ completedCount }}</p>
      
      <!-- Условный рендеринг с v-if/v-else -->
      <div v-if="completedCount > 0" class="progress-section">
        <p>Прогресс: {{ progressPercentage }}%</p>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
      </div>
      <div v-else>
        <p>Начните изучать технологии чтобы увидеть прогресс!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'ConditionalListDemo',
  
  setup() {
    // Реактивные данные
    const newTechName = ref('')
    const technologies = ref([])
    const showCompleted = ref(true)
    const sortBy = ref('date')

    // Вычисляемые свойства
    const activeCount = computed(() => 
      technologies.value.filter(tech => !tech.completed).length
    )

    const completedCount = computed(() => 
      technologies.value.filter(tech => tech.completed).length
    )

    const progressPercentage = computed(() => {
      if (technologies.value.length === 0) return 0
      return Math.round((completedCount.value / technologies.value.length) * 100)
    })

    const sortedTechnologies = computed(() => {
      const techsToShow = showCompleted.value 
        ? technologies.value 
        : technologies.value.filter(tech => !tech.completed)
      
      return [...techsToShow].sort((a, b) => {
        if (sortBy.value === 'name') {
          return a.name.localeCompare(b.name)
        } else {
          return new Date(b.createdAt) - new Date(a.createdAt)
        }
      })
    })

    // Методы
    const addTechnology = () => {
      if (!newTechName.value.trim()) return
      
      technologies.value.push({
        id: Date.now(),
        name: newTechName.value.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      })
      
      newTechName.value = ''
    }

    const removeTechnology = (id) => {
      technologies.value = technologies.value.filter(tech => tech.id !== id)
    }

    const completeTechnology = (id) => {
      const tech = technologies.value.find(tech => tech.id === id)
      if (tech) {
        tech.completed = true
      }
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('ru-RU')
    }

    return {
      newTechName,
      technologies,
      showCompleted,
      sortBy,
      activeCount,
      completedCount,
      progressPercentage,
      sortedTechnologies,
      addTechnology,
      removeTechnology,
      completeTechnology,
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

.add-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.text-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-button, .toggle-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tech-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tech-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
}

.tech-item.completed {
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.tech-info h3 {
  margin: 0 0 5px 0;
}

.tech-date {
  font-size: 12px;
  color: #666;
}

.tech-actions {
  display: flex;
  gap: 5px;
}

.complete-button {
  padding: 5px 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.remove-button {
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
}

.stats {
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #28a745;
  transition: width 0.3s ease;
}
</style>