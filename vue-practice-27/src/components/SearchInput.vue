<template>
  <div class="search-container">
    <label v-if="label">{{ label }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      class="search-input"
      type="text"
    />
    <button 
      v-if="modelValue" 
      @click="$emit('update:modelValue', '')"
      class="clear-btn"
    >
      ×
    </button>
    
    <!-- Дополнительные события -->
    <div class="search-actions">
      <button @click="$emit('search')">Найти</button>
      <button @click="$emit('reset')">Сбросить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  
  // Специальные пропсы для v-model
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Поиск...'
    }
  },
  
  // Можно определить эмитируемые события
  emits: ['update:modelValue', 'search', 'reset']
}
</script>

<style scoped>
.search-container {
  position: relative;
  margin: 20px 0;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.clear-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.search-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
</style>