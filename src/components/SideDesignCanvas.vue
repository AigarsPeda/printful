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
import type { RectType } from '@/store/state'
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

const props = defineProps<{
  bgImage: string
  rects: RectType[]
}>()

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

  loadBgImageToCanvas(imgUrl(`${props.bgImage}`), state.value.canvas)
  loadSateToCanvas(state.value.canvas, props.rects, false)
}

// if canvasContent is updated add the new object to the canvas
watch(props, () => {
  if (!state.value.canvas) return

  removeObjWithoutIdFromCanvas(state.value.canvas)
  loadSateToCanvas(state.value.canvas, props.rects, false)
})
</script>

<style scoped></style>
