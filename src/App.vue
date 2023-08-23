<template>
  <div>
    <div>
      <AppHeader :msg="`T shirt designer ${lengthCanvasObject}`" />
      <FabricCanvas @canvas-created="handleCreated" @mouse:dblclick="handleClick" />
      <Button title="Add design" @click="handleClick" />
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
import { fabric } from 'fabric'
import { computed, ref, watch } from 'vue'

const store = useStore()
const canvas = ref<fabric.Canvas>()

const lengthCanvasObject = computed(() => store.getters.getLengthCanvasObject)

const handleCreated = (fabricCanvas: fabric.Canvas) => {
  canvas.value = fabricCanvas

  store.state.canvasObject.forEach((rect) => {
    const r = new fabric.Rect(rect) as CustomRectI
    r.set('id', rect.id)
    canvas.value?.add(r)
  })
}

const handleClick = () => {
  if (!canvas.value) return

  store.commit(MutationEnum.ADD_RECT, {
    top: 0,
    left: 0,
    width: 50,
    height: 50,
    fill: 'green',
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

<style scoped></style>
