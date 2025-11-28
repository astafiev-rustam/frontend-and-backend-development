<template>
  <div class="not-found">
    <h1>404 - Страница не найдена</h1>
    <p>Запрошенная страница не существует.</p>
    <button @click="goHome" class="btn">Вернуться на главную</button>
    
    <div class="debug-info">
      <p>Путь: {{ $route.path }}</p>
      <p>Параметры: {{ $route.params }}</p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'NotFound',
  
  setup() {
    const router = useRouter()
    
    const goHome = () => {
      router.push('/')
    }

    return {
      goHome
    }
  }
}
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px 20px;
}

.debug-info {
  margin-top: 30px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 5px;
  font-family: monospace;
}
</style>