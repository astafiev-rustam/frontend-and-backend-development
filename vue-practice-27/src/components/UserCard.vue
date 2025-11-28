<template>
  <div class="user-card" :class="user.role">
    <h3>{{ user.name }}</h3>
    <p>Email: {{ user.email }}</p>
    <p>Роль: {{ user.role }}</p>
    <p>Статус: {{ isActive ? 'Активен' : 'Неактивен' }}</p>
    
    <!-- Слот для дополнительного контента -->
    <slot name="actions"></slot>
    
    <!-- Слот по умолчанию -->
    <slot>
      <p>Нет дополнительной информации</p>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  
  // Определяем пропсы, которые компонент принимает
  props: {
    user: {
      type: Object,
      required: true,
      // Валидация объекта
      validator: (value) => {
        return value.name && value.email
      }
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  
  // Локальное состояние компонента
  data() {
    return {
      localClicks: 0
    }
  },
  
  methods: {
    handleClick() {
      this.localClicks++
      // Отправляем событие родителю
      this.$emit('user-clicked', this.user)
    }
  }
}
</script>

<style scoped>
.user-card {
  border: 1px solid #ddd;
  padding: 16px;
  margin: 10px;
  border-radius: 8px;
}

.user-card.admin {
  border-color: #ff6b6b;
  background-color: #fff5f5;
}

.user-card.user {
  border-color: #4ecdc4;
  background-color: #f0fff4;
}
</style>