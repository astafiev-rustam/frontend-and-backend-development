<template>
  <div class="demo-container">
    <h2>Пример 1: Реактивность и v-model</h2>
    
    <p>Директива v-model создает двустороннее связывание между элементом формы и данными компонента.</p>
    
    <!-- Простое текстовое поле с v-model -->
    <div class="input-group">
      <label>Введите ваше имя:</label>
      <input 
        v-model="userName" 
        placeholder="Например: Иван"
        class="text-input"
      >
      <p>Привет, <strong>{{ userName }}</strong>!</p>
    </div>

    <!-- Textarea с v-model -->
    <div class="input-group">
      <label>Опишите ваши интересы:</label>
      <textarea 
        v-model="userBio" 
        placeholder="Расскажите о себе..."
        class="text-area"
        rows="3"
      ></textarea>
      <p>Длина текста: {{ userBio.length }} символов</p>
    </div>

    <!-- Select с v-model -->
    <div class="input-group">
      <label>Выберите технологию:</label>
      <select v-model="selectedTech" class="select-input">
        <option value="vue">Vue.js</option>
        <option value="react">React</option>
        <option value="angular">Angular</option>
      </select>
      <p>Вы выбрали: {{ getTechName(selectedTech) }}</p>
    </div>

    <!-- Чекбокс с v-model -->
    <div class="input-group">
      <label>
        <input type="checkbox" v-model="isSubscribed">
        Получать уведомления
      </label>
      <p v-if="isSubscribed">Вы подписаны на уведомления ✓</p>
      <p v-else>Вы не подписаны на уведомления</p>
    </div>

    <!-- Группа радио-кнопок -->
    <div class="input-group">
      <label>Уровень опыта:</label>
      <div>
        <label>
          <input type="radio" v-model="experienceLevel" value="beginner">
          Начинающий
        </label>
        <label>
          <input type="radio" v-model="experienceLevel" value="intermediate">
          Средний
        </label>
        <label>
          <input type="radio" v-model="experienceLevel" value="advanced">
          Продвинутый
        </label>
      </div>
      <p>Ваш уровень: {{ getExperienceText(experienceLevel) }}</p>
    </div>

    <!-- Отладочная информация -->
    <div class="debug-info">
      <h3>Текущее состояние данных:</h3>
      <pre>{{ JSON.stringify({
        userName,
        userBio,
        selectedTech,
        isSubscribed,
        experienceLevel
      }, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ReactiveDemo',
  
  setup() {
    // ref создает реактивную переменную
    // Когда значение меняется, Vue автоматически обновляет шаблон
    const userName = ref('')
    const userBio = ref('')
    const selectedTech = ref('vue')
    const isSubscribed = ref(false)
    const experienceLevel = ref('beginner')

    // Методы для форматирования данных
    const getTechName = (tech) => {
      const techMap = {
        'vue': 'Vue.js',
        'react': 'React',
        'angular': 'Angular'
      }
      return techMap[tech] || tech
    }

    const getExperienceText = (level) => {
      const levelMap = {
        'beginner': 'Начинающий разработчик',
        'intermediate': 'Разработчик со средним опытом',
        'advanced': 'Опытный разработчик'
      }
      return levelMap[level] || level
    }

    // Возвращаем все переменные и методы, чтобы они были доступны в шаблоне
    return {
      userName,
      userBio,
      selectedTech,
      isSubscribed,
      experienceLevel,
      getTechName,
      getExperienceText
    }
  }
}
</script>

<style scoped>
.demo-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.text-input, .text-area, .select-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.debug-info {
  margin-top: 30px;
  padding: 15px;
  background-color: #e9ecef;
  border-radius: 4px;
}

pre {
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}
</style>