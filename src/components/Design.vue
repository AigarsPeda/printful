<template>
  <div class="design-container">
    <div class="design-button-list-container">
      <ul>
        <li v-for="(item, index) in frontCanvasObject">
          <DesignSettingCard :itemId="item.id" :position="{ left: item.left, top: item.top }" />
        </li>
      </ul>
      <div class="design-option-button-container">
        <Button
          color="purple"
          title="Add design"
          @click="handleAddObjToCanvas(store, (lengthCanvasObject + 1).toString())"
        />
      </div>
    </div>
    <div class="design-canvas-container">
      <div>
        <SideDesignCanvas
          isBoundingBox
          canvasId="front"
          isContentEditable
          bgImage="../assets/images/front.jpg"
          :rects="frontCanvasObject"
          :canvasDimensions="{
            width: canvasDimensions.width,
            height: canvasDimensions.height
          }"
        />
      </div>
      <div class="design-canvas-side-container">
        <SideDesignCanvas
          canvasId="back"
          bgImage="../assets/images/back.jpg"
          :rects="store.state.canvasObject.back"
          :canvasDimensions="{
            width: canvasDimensions.width / 2,
            height: canvasDimensions.height / 2
          }"
        />
        <div class="design-canvas-side-container_side">
          <SideDesignCanvas
            isReverse
            canvasId="sideR"
            bgImage="../assets/images/side.jpg"
            :rects="store.state.canvasObject.sideR"
            :canvasDimensions="{
              width: canvasDimensions.width / 4,
              height: canvasDimensions.height / 4
            }"
          />
          <SideDesignCanvas
            canvasId="sideL"
            bgImage="../assets/images/side-l.jpg"
            :rects="store.state.canvasObject.sideL"
            :canvasDimensions="{
              width: canvasDimensions.width / 4,
              height: canvasDimensions.height / 4
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'
import DesignSettingCard from '@/components/DesignSettingCard.vue'
import SideDesignCanvas from '@/components/SideDesignCanvas.vue'
import { useStore } from '@/store/store'
import handleAddObjToCanvas from '@/utils/handleAddObjToCanvas'
import { computed } from 'vue'

const store = useStore()

const frontCanvasObject = computed(() => store.getters.getFrontCanva)
const canvasDimensions = computed(() => store.getters.getMainCanvasDimensions)
const lengthCanvasObject = computed(() => store.getters.getLengthCanvasObject)
</script>

<style scoped>
.design-container {
  display: flex;
}

.design-button-list-container {
  display: flex;
  cursor: pointer;
  border-radius: 5px;
  align-items: center;
  padding: 0.5rem 0.5rem;
  flex-direction: column;
  background-color: #f9fafb;
}

.design-button-list-container ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.design-button-list-container li {
  margin-bottom: 10px;
}

.design-canvas-container {
  display: flex;
  margin-left: 20px;
  align-items: center;
  justify-content: space-between;
}

.design-canvas-side-container {
  display: flex;
  height: 100%;
  margin-left: 20px;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}

.design-canvas-side-container_side {
  display: flex;
}
</style>
