<template>
  <div class="user-profile">
    <h1>👤 Профиль пользователя</h1>
    
    <!-- Показываем ID пользователя из параметров маршрута -->
    <div v-if="$route.params.id" class="user-info">
      <h2>Профиль пользователя #{{ $route.params.id }}</h2>
      <p>Это страница конкретного пользователя</p>
    </div>
    
    <div v-else class="current-user">
      <h2>Ваш профиль</h2>
      <p>Email: user@example.com</p>
      <p>Дата регистрации: 2024-01-01</p>
    </div>

    <!-- Навигация между разделами профиля -->
    <nav class="profile-tabs">
      <router-link to="/profile/info" class="tab">Информация</router-link>
      <router-link to="/profile/posts" class="tab">Посты</router-link>
      <router-link to="/profile/friends" class="tab">Друзья</router-link>
    </nav>

    <!-- Отображаем вложенные маршруты -->
    <div class="tab-content">
      <router-view></router-view>
    </div>

    <!-- Кнопки навигации -->
    <div class="navigation-buttons">
      <button @click="goBack" class="btn">Назад</button>
      <button @click="goHome" class="btn">На главную</button>
      <button @click="goToSettings" class="btn">Настройки</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'UserProfile',
  
  setup() {
    const router = useRouter()

    const goBack = () => {
      router.back()
    }

    const goHome = () => {
      router.push('/')
    }

    const goToSettings = () => {
      router.push('/settings')
    }

    return {
      goBack,
      goHome,
      goToSettings
    }
  },

  // Хуки навигации
  beforeRouteEnter(to, from, next) {
    console.log('Заходим в профиль пользователя')
    next()
  },

  beforeRouteUpdate(to, from, next) {
    console.log('Обновляем параметры маршрута профиля')
    next()
  }
}
</script>

<style scoped>
.user-profile {
  max-width: 800px;
  margin: 0 auto;
}

.profile-tabs {
  display: flex;
  gap: 10px;
  margin: 20px 0;
  border-bottom: 2px solid #eee;
}

.tab {
  padding: 10px 20px;
  text-decoration: none;
  color: #333;
  border-bottom: 3px solid transparent;
}

.tab.router-link-active {
  border-bottom-color: #007bff;
  color: #007bff;
}

.tab-content {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 5px;
  min-height: 200px;
}

.navigation-buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
</style>