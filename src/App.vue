<template>
  <div>
    <div>
      <AppHeader :msg="`T shirt designer ${lengthCanvasObject}`" />
      <FabricCanvas
        @canvas-created="handleCreated"
        @mouse:dblclick="handleClick"
        bgImage="@/assets/images/front.jpg"
      />
      <div class="btn-container">
        <Button title="Add design" @click="handleClick" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import Button from '@/components/Button.vue'
import FabricCanvas from '@/components/FabricCanvas.vue'
import { MutationEnum } from '@/store/mutation/mutation.types'
import { useStore } from '@/store/store'
import { type CustomRectI } from '@/types/fabric.types'
import addBoundingBoxToCanvas from '@/utils/addBoundingBoxToCanvas'
import loadBgImageToCanvas from '@/utils/loadBgImageToCanvas'
import { fabric } from 'fabric'
import { computed, ref, watch } from 'vue'
import loadSateToCanvas from './utils/loadSateToCanvas'

const store = useStore()
const canvas = ref<fabric.Canvas>()

const lengthCanvasObject = computed(() => store.getters.getLengthCanvasObject)

const handleCreated = (fabricCanvas: fabric.Canvas) => {
  canvas.value = fabricCanvas

  const imgUrl = (str: string) => {
    return new URL(str, import.meta.url)
  }

  loadBgImageToCanvas(imgUrl(`./assets/images/front.jpg`), canvas.value)
  loadSateToCanvas(canvas.value, store.state.canvasObject)
  addBoundingBoxToCanvas(canvas.value)
}

const handleClick = () => {
  if (!canvas.value) return

  store.commit(MutationEnum.ADD_RECT, {
    top: 230,
    left: 120,
    width: 50,
    height: 50,
    fill: '#059669',
    id: (lengthCanvasObject.value + 1).toString()
  })
}

// if canvasContent is updated add the new object to the canvas
watch(store.state.canvasObject, () => {
  if (!canvas.value) return

  const obj = canvas.value?.getObjects() as CustomRectI[]
  const ids = obj?.map((o) => o.id)
  const filterNewVal = store.state.canvasObject.filter((o) => !ids?.includes(o.id))

  filterNewVal.forEach((rect) => {
    const r = new fabric.Rect(rect)
    canvas.value?.add(r)
  })
})
</script>

<style scoped>
.btn-container {
  margin-top: 20px;
}
</style>
