<template>
  <button class="btn" type="button" @click="onClick">
    {{ title }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  onClick: () => void
  color?: 'green' | 'purple' | 'red'
}>()

const selectedColor = computed(() => {
  if (props.color === 'green') {
    return {
      backgroundColor: '#059669',
      color: '#fff',
      hover: '#15803d'
    }
  }
  if (props.color === 'purple') {
    return {
      backgroundColor: '#7e22ce',
      color: '#fff',
      hover: '#7e22ce'
    }
  }

  if (props.color === 'red') {
    return {
      backgroundColor: '#dc2626',
      color: '#fff',
      hover: '#b91c1c'
    }
  }

  return {
    backgroundColor: '#e2e8f0',
    color: '#0f172a',
    hover: '#cbd5e1'
  }
})
</script>

<style scoped>
.btn {
  border: none;
  cursor: pointer;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  color: v-bind('`${selectedColor.color}`');
  background-color: v-bind('`${selectedColor.backgroundColor}`');
}

.btn:hover {
  background-color: v-bind('`${selectedColor.hover}`');
}
</style>
