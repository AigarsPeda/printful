<script setup lang="ts">
defineProps<{
  dimensions: {
    width: number
    height: number
  }
  bgImage: string
}>()

import { fabric } from 'fabric'
import { ref, onMounted } from 'vue'

const canvasReference = ref()
const emit = defineEmits(['canvas-created', 'mouse:dblclick'])

onMounted(() => {
  const canvas = new fabric.Canvas(canvasReference.value)
  emit('canvas-created', canvas)
  canvas.on('mouse:dblclick', () => {
    console.log('double click')
    emit('mouse:dblclick')
  })
})
</script>

<template>
  <canvas id="canvas" ref="canvasReference" :width="dimensions.width" :height="dimensions.height" />
</template>

<style scoped>
canvas {
  background-color: aliceblue;
}
</style>
