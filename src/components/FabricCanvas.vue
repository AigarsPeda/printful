<script setup lang="ts">
// defineProps<{
//   mouseDblclick: () => void
//   canvasCreated: (canvas: fabric.Canvas) => void
// }>()

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
  <canvas ref="canvasReference" id="canvas" width="500" height="500" />
</template>

<style scoped>
canvas {
  /* width: 100%;
  height: 100%; */
  background-color: aliceblue;
}
</style>
