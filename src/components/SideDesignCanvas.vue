<template>
  <div>
    <FabricCanvas
      @canvas-created="handleCreated"
      bgImage="@/assets/images/front.jpg"
      :dimensions="state.canvasDimensions"
    />
  </div>
</template>

<script setup lang="ts">
import FabricCanvas from '@/components/FabricCanvas.vue'
import { useStore } from '@/store/store'
import loadBgImageToCanvas from '@/utils/loadBgImageToCanvas'
import loadSateToCanvas from '@/utils/loadSateToCanvas'
import removeObjWithoutIdFromCanvas from '@/utils/removeObjWithoutIdFromCanvas'
import { fabric } from 'fabric'
import { ref, watch } from 'vue'

type StateType = {
  canvasDimensions: {
    width: number
    height: number
  }
  canvas: fabric.Canvas | null
  boundingBox: fabric.Rect | null
}

const store = useStore()

const state = ref<StateType>({
  canvasDimensions: {
    width: 175,
    height: 250
  },
  canvas: null,
  boundingBox: null
})

const handleCreated = (fabricCanvas: fabric.Canvas) => {
  state.value.canvas = fabricCanvas

  const imgUrl = (str: string) => {
    return new URL(str, import.meta.url)
  }

  loadBgImageToCanvas(imgUrl(`../assets/images/back.jpg`), state.value.canvas)
  loadSateToCanvas(state.value.canvas, store.state.canvasObject.back, false)
}

// if canvasContent is updated add the new object to the canvas
watch(store.state.canvasObject, () => {
  if (!state.value.canvas) return

  removeObjWithoutIdFromCanvas(state.value.canvas)
  loadSateToCanvas(state.value.canvas, store.state.canvasObject.back)
})
</script>

<style scoped></style>
