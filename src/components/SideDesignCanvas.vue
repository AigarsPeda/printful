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
import updateCanvasObjPositionAfterDrag from '@/utils/updateCanvasObjPositionAfterDrag'
import { fabric } from 'fabric'
import { computed, ref, watch } from 'vue'

type StateType = {
  canvasDimensions: {
    width: number
    height: number
  }
  // canvas: fabric.Canvas | null
}

const props = defineProps<{
  bgImage: string
  canvasId: string
  rects: RectType[]
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

  loadBgImageToCanvas(imgUrl(`${props.bgImage}`), fabricCanvas)
  loadSateToCanvas(fabricCanvas, props.rects, props.isContentEditable)

  store.commit(MutationEnum.SAVE_CANVAS, {
    id: props.canvasId,
    canvas: fabricCanvas
  })

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

    updateCanvasObjPositionAfterDrag(fabricCanvas)
  }
}

// if canvasContent is updated add the new object to the canvas
watch(props, () => {
  if (!canva.value?.canva) return

  removeObjWithoutIdFromCanvas(canva.value?.canva)
  loadSateToCanvas(canva.value?.canva, props.rects, props.isContentEditable)
})
</script>

<style scoped></style>
