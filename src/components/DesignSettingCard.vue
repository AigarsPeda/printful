<template>
  <div class="design-setting-card-container">
    <button class="design-setting-card_color" @click="openModal">Change color</button>
    <div>
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
  color: '#111827';
  padding: 0.5rem 1rem;
  background-color: #d1d5db;
  transition: all 0.3s ease-in-out;
}

.design-setting-card_color {
  border: none;
  color: '#111827';
  cursor: pointer;
  margin-right: 1rem;
  background-color: v-bind('`${item?.fill}`');
}

.design-setting-card {
  display: flex;
  margin-top: 0.5rem;
  flex-direction: column;
}

.design-setting-card label {
  font-weight: 500;
  color: '#111827';
  text-align: left;
  font-size: 0.8rem;
}
</style>
