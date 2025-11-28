<template>
  <div>
    <h2>Поиск пользователей</h2>
    
    <!-- Используем кастомный v-model -->
    <SearchInput 
      v-model="searchQuery"
      label="Поиск по имени:"
      placeholder="Введите имя пользователя..."
      @search="performSearch"
      @reset="resetSearch"
    />
    
    <p>Текущий запрос: "{{ searchQuery }}"</p>
    
    <div v-if="searchResults.length">
      <h3>Результаты поиска:</h3>
      <ul>
        <li v-for="user in searchResults" :key="user.id">
          {{ user.name }} - {{ user.email }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SearchInput from './SearchInput.vue'
import { ref, computed } from 'vue'

export default {
  components: {
    SearchInput
  },
  
  setup() {
    const searchQuery = ref('')
    const users = ref([
      { id: 1, name: 'Анна', email: 'anna@test.com' },
      { id: 2, name: 'Борис', email: 'boris@test.com' },
      { id: 3, name: 'Виктор', email: 'victor@test.com' }
    ])
    
    const searchResults = computed(() => {
      if (!searchQuery.value) return []
      return users.value.filter(user => 
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })
    
    const performSearch = () => {
      console.log('Выполняем поиск:', searchQuery.value)
    }
    
    const resetSearch = () => {
      searchQuery.value = ''
    }
    
    return {
      searchQuery,
      searchResults,
      performSearch,
      resetSearch
    }
  }
}
</script>