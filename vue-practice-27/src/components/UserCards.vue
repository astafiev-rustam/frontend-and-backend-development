<template>
  <div>
    <h2>Список пользователей</h2>
    
    <!-- Передаем данные через пропсы -->
    <UserCard 
      :user="adminUser" 
      :is-active="true"
      @user-clicked="handleUserClick"
    >
      <!-- Именованный слот -->
      <template #actions>
        <button @click="editUser(adminUser)">Редактировать</button>
      </template>
      
      <!-- Слот по умолчанию -->
      <p>Администратор системы</p>
    </UserCard>
    
    <UserCard 
      v-for="user in users" 
      :key="user.id"
      :user="user"
      @user-clicked="handleUserClick"
    />
  </div>
</template>

<script>
import UserCard from './UserCard.vue'

export default {
  components: {
    UserCard
  },
  
  data() {
    return {
      adminUser: {
        id: 1,
        name: 'Анна Иванова',
        email: 'anna@example.com',
        role: 'admin'
      },
      users: [
        {
          id: 2,
          name: 'Петр Сидоров',
          email: 'petr@example.com',
          role: 'user'
        }
      ]
    }
  },
  
  methods: {
    handleUserClick(user) {
      console.log('Клик по пользователю:', user)
    },
    
    editUser(user) {
      console.log('Редактирование:', user)
    }
  }
}
</script>