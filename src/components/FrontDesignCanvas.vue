<template>
  <div class="app-container">
    <div class="app-container_btn">
      <ul>
        <li v-for="(item, index) in store.state.canvasObject">
          <DesignSettingCard
            :key="index"
            :item="item"
            :boundingBox="state.boundingBox"
            :handlePotionUpdate="handlePotionUpdate"
            :position="{ left: item.left, top: item.top }"
          />
        </li>
      </ul>
    </div>
    <div>
      <FabricCanvas
        @mouse:dblclick="handleClick"
        @canvas-created="handleCreated"
        bgImage="@/assets/images/front.jpg"
        :dimensions="state.canvasDimensions"
      />
      <div class="btn-container">
        <Button color="purple" title="Add design" @click="handleClick" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'
import DesignSettingCard from '@/components/DesignSettingCard.vue'
import FabricCanvas from '@/components/FabricCanvas.vue'
import { COLORS } from '@/hardcoded'
import { MutationEnum } from '@/store/mutation/mutation.types'
import { useStore } from '@/store/store'
import { type CustomRectI } from '@/types/fabric.types'
import addBoundingBoxToCanvas from '@/utils/addBoundingBoxToCanvas'
import checkBoundingBox from '@/utils/checkBoundingBox'
import loadBgImageToCanvas from '@/utils/loadBgImageToCanvas'
import loadSateToCanvas from '@/utils/loadSateToCanvas'
import updateCanvasObjPositionAfterDrag from '@/utils/updateCanvasObjPositionAfterDrag'
import { fabric } from 'fabric'
import { computed, ref, watch } from 'vue'

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
    width: 350,
    height: 500
  },
  canvas: null,
  boundingBox: null
})

const lengthCanvasObject = computed(() => store.getters.getLengthCanvasObject)

const handleCreated = (fabricCanvas: fabric.Canvas) => {
  state.value.canvas = fabricCanvas

  const imgUrl = (str: string) => {
    return new URL(str, import.meta.url)
  }

  loadBgImageToCanvas(imgUrl(`../assets/images/front.jpg`), state.value.canvas)
  loadSateToCanvas(state.value.canvas, store.state.canvasObject)
  const boundingBox = addBoundingBoxToCanvas(state.value.canvas, true, {
    width: state.value.canvasDimensions.width / 2,
    height: state.value.canvasDimensions.height / 2
  })

  state.value.boundingBox = boundingBox

  checkBoundingBox(state.value.canvas, {
    top: boundingBox.top,
    left: boundingBox.left,
    width: state.value.canvasDimensions.width / 2,
    height: state.value.canvasDimensions.height / 2
  })

  updateCanvasObjPositionAfterDrag(state.value.canvas)
}

const handlePotionUpdate = (obj: { id: string; top: number; left: number }) => {
  const objCanvas = state.value.canvas?.getObjects()

  if (!objCanvas) return

  const customObj = objCanvas as CustomRectI[]
  const objCanvasFilter = customObj.find((o) => o.id === obj.id)

  if (!objCanvasFilter) return

  objCanvasFilter.set({
    top: obj.top,
    left: obj.left
  })

  store.commit(MutationEnum.UPDATE_RECT_POSITION, {
    id: obj.id,
    top: obj.top || 0,
    left: obj.left || 0
  })

  state.value.canvas?.renderAll()
}

const handleClick = () => {
  if (!state.value.canvas) return

  store.commit(MutationEnum.ADD_RECT, {
    top: 230,
    left: 120,
    width: 50,
    height: 50,
    fill: COLORS[Math.floor(Math.random() * COLORS.length)],
    id: (lengthCanvasObject.value + 1).toString()
  })
}

// if canvasContent is updated add the new object to the canvas
watch(store.state.canvasObject, () => {
  if (!state.value.canvas) return

  const obj = state.value.canvas.getObjects() as CustomRectI[]
  const ids = obj?.map((o) => o.id)
  const filterNewVal = store.state.canvasObject.filter((o) => !ids?.includes(o.id))

  loadSateToCanvas(state.value.canvas, filterNewVal)
})

// const props = defineProps<{
//   title: string
//   onClick: () => void
//   color?: 'green' | 'purple'
// }>()
</script>

<style scoped>
.app-container {
  display: flex;
  padding: 20px;
  justify-content: space-between;
}

.app-container_btn {
  display: flex;
  cursor: pointer;
  border-radius: 5px;
  align-items: center;
  padding: 0.5rem 0.5rem;
  flex-direction: column;
  background-color: #f9fafb;
}

.app-container_btn ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.app-container_btn li {
  margin-bottom: 10px;
}
</style>
