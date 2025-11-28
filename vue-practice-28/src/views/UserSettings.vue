<template>
  <div class="user-settings">
    <h1>⚙️ Настройки</h1>
    
    <div class="settings-tabs">
      <router-link to="/settings/general" class="tab">Основные</router-link>
      <router-link to="/settings/security" class="tab">Безопасность</router-link>
      <router-link to="/settings/notifications" class="tab">Уведомления</router-link>
    </div>

    <div class="settings-content">
      <!-- Параметры маршрута передаются как пропсы -->
      <p>Активная вкладка: {{ currentTab }}</p>
      
      <router-view :current-tab="currentTab"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserSettings',
  
  // Получаем параметр маршрута как пропс
  props: {
    tab: {
      type: String,
      default: 'general'
    }
  },
  
  computed: {
    currentTab() {
      return this.tab || 'general'
    }
  }
}
</script>

<style scoped>
.settings-tabs {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.tab {
  padding: 10px 20px;
  text-decoration: none;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.tab.router-link-active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.settings-content {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 5px;
}
</style>