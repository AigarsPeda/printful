<template>
  <canvas id="canvas" ref="canvasReference" :width="dimensions.width" :height="dimensions.height" />
</template>

<script setup lang="ts">
defineProps<{
  bgImage: string
  dimensions: {
    width: number
    height: number
  }
}>()

import { fabric } from 'fabric'
import { ref, onMounted } from 'vue'

const canvasReference = ref()
const emit = defineEmits(['canvas-created', 'mouse:dblclick'])

onMounted(() => {
  const canvas = new fabric.Canvas(canvasReference.value)
  emit('canvas-created', canvas)
  canvas.on('mouse:dblclick', () => {
    emit('mouse:dblclick')
  })
})
</script>

<style scoped>
canvas {
  background-color: aliceblue;
}
</style>
