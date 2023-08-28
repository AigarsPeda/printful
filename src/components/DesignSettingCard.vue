<template>
  <div class="design-setting-card-container">
    <div>
      <button class="design-setting-card_color_btn" @click="openModal">Change color</button>
      <div class="design-setting-card">
        <label> Left: {{ item.left }} </label>
        <input
          type="range"
          :value="item.left"
          :min="boundingBox?.left"
          :max="(boundingBox?.left || 0) + (boundingBox?.width || 0) - item.width"
          @input="
            handlePotionUpdate(
              {
                id: itemId,
                top: item?.top || 0,
                left: eventToNumber($event)
              },
              store
            )
          "
        />
      </div>
      <div class="design-setting-card">
        <label> Top: {{ item.top }} </label>
        <input
          type="range"
          :value="item.top"
          :min="boundingBox?.top || 0"
          :max="(boundingBox?.top || 0) + (boundingBox?.height || 0) - item?.height"
          @input="
            handlePotionUpdate(
              {
                id: itemId,
                left: item.left,
                top: eventToNumber($event)
              },
              store
            )
          "
        />
      </div>
    </div>
  </div>
  <ColorModal :closeModal="closeModal" :isOpened="isModalVisible" :selectedObjId="itemId" />
</template>

<script setup lang="ts">
import ColorModal from '@/components/ColorModal.vue'
import { useStore } from '@/store/store'
import eventToNumber from '@/utils/eventToNumber'
import handlePotionUpdate from '@/utils/handlePotionUpdate'
import { computed, ref } from 'vue'

const props = defineProps<{
  itemId: string
}>()

const store = useStore()
const isModalVisible = ref(false)
const boundingBox = computed(
  () => store.state.boundingBoxes.find((b) => b.id === 'front')?.boundingBox || null
)

const item = computed(() => {
  return (
    store.state.canvasObject.front.find((i) => i.id === props.itemId) || {
      id: '',
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      fill: ''
    }
  )
})

const openModal = () => {
  isModalVisible.value === false ? (isModalVisible.value = true) : (isModalVisible.value = false)
}

const closeModal = () => {
  isModalVisible.value = false
}
</script>

<style scoped>
.design-setting-card-container {
  display: flex;
  padding: 1rem;
  color: '#111827';
  border-radius: 10px;
  margin: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  background-color: #f3f4f6;
  transition: all 0.3s ease-in-out;
  box-shadow: #d1d5db 0px 2px 8px 0px;
}

.design-setting-card_color_btn {
  border: none;
  cursor: pointer;
  color: '#111827';
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  background-color: v-bind('`${item?.fill}`');
}

.design-setting-card_color_btn:hover {
  background-color: v-bind('`${item?.fill}99`');
}

.design-setting-card {
  display: flex;
  margin: 1rem 0;
  flex-direction: column;
}

.design-setting-card label {
  font-weight: 500;
  color: '#111827';
  text-align: left;
  font-size: 0.8rem;
}

input[type='range'] {
  outline: 0;
  height: 5px;
  width: 300px;
  margin: 0 auto;
  display: block;
  appearance: none;
  border-radius: 5px;
  -webkit-appearance: none;
  background-color: #d1d5db;
}
input[type='range']::-webkit-slider-thumb {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  border-radius: 50%;
  -webkit-appearance: none;
  border: 2px solid white;
  transition: 0.3s ease-in-out;
  background-color: v-bind('`${item?.fill}`');
}
​ input[type='range']::-webkit-slider-thumb:hover {
  background-color: white;
  border: 2px solid v-bind('`${item?.fill}`');
}
input[type='range']::-webkit-slider-thumb:active {
  transform: scale(1.6);
}
</style>
