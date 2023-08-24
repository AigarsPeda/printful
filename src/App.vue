<template>
  <div>
    <div>
      <AppHeader :msg="`T shirt designer ${lengthCanvasObject}`" />
      <FrontDesignCanvas />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import { useStore } from '@/store/store'
import { computed } from 'vue'
import FrontDesignCanvas from '@/components/FrontDesignCanvas.vue'

const store = useStore()
const lengthCanvasObject = computed(() => store.getters.getLengthCanvasObject)
</script>

<style scoped></style>
