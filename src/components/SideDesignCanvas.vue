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
import { store } from '@/store/store'
import addBoundingBoxToCanvas from '@/utils/addBoundingBoxToCanvas'
import checkBoundingBox from '@/utils/checkBoundingBox'
import loadBgImageToCanvas from '@/utils/loadBgImageToCanvas'
import loadSateToCanvas from '@/utils/loadSateToCanvas'
import removeObjWithoutIdFromCanvas from '@/utils/removeObjWithoutIdFromCanvas'
import updateCanvasObjPositionAfterDrag from '@/utils/updateCanvasObjPositionAfterDrag'
import { fabric } from 'fabric'
import { ref, watch } from 'vue'

type StateType = {
  canvasDimensions: {
    width: number
    height: number
  }

  canvas: fabric.Canvas | null
}

const props = defineProps<{
  bgImage: string
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
  },
  canvas: null
})

const handleCreated = (fabricCanvas: fabric.Canvas) => {
  state.value.canvas = fabricCanvas

  const imgUrl = (str: string) => {
    return new URL(str, import.meta.url)
  }

  loadBgImageToCanvas(imgUrl(`${props.bgImage}`), state.value.canvas)
  loadSateToCanvas(state.value.canvas, props.rects, props.isContentEditable)

  if (props.isBoundingBox) {
    const boundingBox = addBoundingBoxToCanvas(state.value.canvas, true, {
      width: state.value.canvasDimensions.width / 2,
      height: state.value.canvasDimensions.height / 2
    })

    store.commit(MutationEnum.SAVE_CANVAS, {
      id: 'front',
      canvas: state.value.canvas
    })

    // state.value.boundingBox = boundingBox
    store.commit(MutationEnum.SAVE_BOUNDING_BOX, {
      id: 'front',
      boundingBox
    })

    checkBoundingBox(state.value.canvas, {
      top: boundingBox.top,
      left: boundingBox.left,
      width: state.value.canvasDimensions.width / 2,
      height: state.value.canvasDimensions.height / 2
    })

    updateCanvasObjPositionAfterDrag(state.value.canvas)
  }
}

// if canvasContent is updated add the new object to the canvas
watch(props, () => {
  if (!state.value.canvas) return

  removeObjWithoutIdFromCanvas(state.value.canvas)
  loadSateToCanvas(state.value.canvas, props.rects, props.isContentEditable)
})
</script>

<style scoped></style>
