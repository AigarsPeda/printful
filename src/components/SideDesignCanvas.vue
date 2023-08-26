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
import { MutationEnum } from '@/store/mutation/mutation.types'
import type { RectType } from '@/store/state'
import { useStore } from '@/store/store'
import addBoundingBoxToCanvas from '@/utils/addBoundingBoxToCanvas'
import checkBoundingBox from '@/utils/checkBoundingBox'
import loadBgImageToCanvas from '@/utils/loadBgImageToCanvas'
import loadSateToCanvas from '@/utils/loadSateToCanvas'
import removeObjWithoutIdFromCanvas from '@/utils/removeObjWithoutIdFromCanvas'
import updateCanvaObjectPosition from '@/utils/updateCanvaObjectPosition'
import updateCanvasObjScale from '@/utils/updateCanvasObjScale'
import { fabric } from 'fabric'
import { computed, ref, watch } from 'vue'

type StateType = {
  canvasDimensions: {
    width: number
    height: number
  }
}

const props = defineProps<{
  bgImage: string
  canvasId: string
  rects: RectType[]
  isReverse?: boolean
  isBoundingBox?: boolean
  isContentEditable?: boolean
  canvasDimensions: {
    width: number
    height: number
  }
}>()

const state = ref<StateType>({
  canvasDimensions: {
    width: props.canvasDimensions.width,
    height: props.canvasDimensions.height
  }
})

const store = useStore()
const canva = computed(() => {
  return store.state.canvas.find((item) => item.id === props.canvasId)
})

const handleCreated = (fabricCanvas: fabric.Canvas) => {
  const imgUrl = (str: string) => {
    return new URL(str, import.meta.url)
  }

  store.commit(MutationEnum.SAVE_CANVAS, {
    id: props.canvasId,
    canvas: fabricCanvas,
    isReverse: props.isReverse
  })

  updateCanvaObjectPosition(fabricCanvas, store)
  loadBgImageToCanvas(imgUrl(`${props.bgImage}`), fabricCanvas)
  loadSateToCanvas(fabricCanvas, props.rects, props.isContentEditable)

  if (props.isBoundingBox) {
    const boundingBox = addBoundingBoxToCanvas(fabricCanvas, true, {
      width: state.value.canvasDimensions.width / 2,
      height: state.value.canvasDimensions.height / 2
    })

    // state.value.boundingBox = boundingBox
    store.commit(MutationEnum.SAVE_BOUNDING_BOX, {
      id: props.canvasId,
      boundingBox
    })

    checkBoundingBox(fabricCanvas, {
      top: boundingBox.top,
      left: boundingBox.left,
      width: state.value.canvasDimensions.width / 2,
      height: state.value.canvasDimensions.height / 2
    })

    updateCanvasObjScale(fabricCanvas, store)
  }
}

watch(props, () => {
  if (!canva.value?.canva) return

  removeObjWithoutIdFromCanvas(canva.value?.canva)
  loadSateToCanvas(canva.value?.canva, props.rects, props.isContentEditable)
})
</script>

<style scoped></style>
