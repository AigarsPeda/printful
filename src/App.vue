<template>
  <div>
    <div>
      <AppHeader :msg="`T shirt designer ${lengthCanvasObject}`" />
      <div class="app-container">
        <div class="app-container_btn">
          <ul>
            <li v-for="(item, index) in store.state.canvasObject">
              <DesignSettingCard
                :key="index"
                :item="item"
                :boundingBox="boundingBoxRef"
                :handlePotionUpdate="handlePotionUpdate"
                :position="{ left: item.left, top: item.top }"
              />
            </li>
          </ul>
        </div>
        <div>
          <FabricCanvas
            :dimensions="canvasDimensions"
            @mouse:dblclick="handleClick"
            @canvas-created="handleCreated"
            bgImage="@/assets/images/front.jpg"
          />
          <div class="btn-container">
            <Button color="purple" title="Add design" @click="handleClick" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import Button from '@/components/Button.vue'
import DesignSettingCard from '@/components/DesignSettingCard.vue'
import FabricCanvas from '@/components/FabricCanvas.vue'
import { MutationEnum } from '@/store/mutation/mutation.types'
import { useStore } from '@/store/store'
import { type CustomRectI } from '@/types/fabric.types'
import addBoundingBoxToCanvas from '@/utils/addBoundingBoxToCanvas'
import checkBoundingBox from '@/utils/checkBoundingBox'
import loadBgImageToCanvas from '@/utils/loadBgImageToCanvas'
import loadSateToCanvas from '@/utils/loadSateToCanvas'
import { fabric } from 'fabric'
import { computed, ref, watch } from 'vue'

const store = useStore()
const canvas = ref<fabric.Canvas>()
const boundingBoxRef = ref<fabric.Rect>()
const canvasDimensions = ref({ width: 350, height: 500 })

const lengthCanvasObject = computed(() => store.getters.getLengthCanvasObject)

const handleCreated = (fabricCanvas: fabric.Canvas) => {
  canvas.value = fabricCanvas

  const imgUrl = (str: string) => {
    return new URL(str, import.meta.url)
  }

  loadBgImageToCanvas(imgUrl(`./assets/images/front.jpg`), canvas.value)
  loadSateToCanvas(canvas.value, store.state.canvasObject)
  const boundingBox = addBoundingBoxToCanvas(canvas.value, true, {
    width: canvasDimensions.value.width / 2,
    height: canvasDimensions.value.height / 2
  })

  boundingBoxRef.value = boundingBox

  checkBoundingBox(canvas.value, {
    top: boundingBox.top,
    left: boundingBox.left,
    width: canvasDimensions.value.width / 2,
    height: canvasDimensions.value.height / 2
  })

  canvas.value.on('object:modified', function (modifiedObj) {
    const obj = modifiedObj.target as CustomRectI

    store.commit(MutationEnum.UPDATE_RECT_POSITION, {
      id: obj.id,
      top: obj.top || 0,
      left: obj.left || 0
    })
  })

  console.log('boundingBoxRef', boundingBoxRef.value)
}

const handlePotionUpdate = (obj: { id: string; top: number; left: number }) => {
  const objCanvas = canvas.value?.getObjects()

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

  canvas.value?.renderAll()
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

  const obj = canvas.value.getObjects() as CustomRectI[]
  const ids = obj?.map((o) => o.id)
  const filterNewVal = store.state.canvasObject.filter((o) => !ids?.includes(o.id))

  loadSateToCanvas(canvas.value, filterNewVal)
})
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
