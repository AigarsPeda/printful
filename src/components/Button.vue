<script setup lang="ts">
defineProps<{
  title: string
  onClick: () => void
}>()
</script>

<template>
  <button class="btn" type="button" @click="onClick">
    {{ title }}
  </button>
</template>

<style scoped>
.btn {
  border: none;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #9333ea;
  transition: all 0.3s ease-in-out;
}

.btn:hover {
  background-color: #7e22ce;
}
</style>
