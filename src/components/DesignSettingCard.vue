<template>
  <div class="design-setting-card-container">
    <div class="design-setting-card_color" />
    <div>
      <div class="design-setting-card">
        <label> Left: {{ position.left }} </label>
        <input
          type="range"
          :value="position.left"
          :min="boundingBox?.left || 0"
          :max="(boundingBox?.left || 0) + (boundingBox?.width || 0) - item.width"
          @input="
            handlePotionUpdate(
              {
                id: item.id,
                top: position.top,
                left: handleRange($event)
              },
              store
            )
          "
        />
      </div>
      <div class="design-setting-card">
        <label> Top: {{ position.top }} </label>
        <input
          type="range"
          :value="position.top"
          :min="boundingBox?.top || 0"
          :max="(boundingBox?.top || 0) + (boundingBox?.height || 0) - item.height"
          @input="
            handlePotionUpdate(
              {
                id: item.id,
                left: position.left,
                top: handleRange($event)
              },
              store
            )
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type RectType } from '@/store/state'
import { store } from '@/store/store'
import handlePotionUpdate from '@/utils/handlePotionUpdate'
import { computed } from 'vue'

defineProps<{
  item: RectType
  position: { left: number; top: number }
}>()

const boundingBox = computed(
  () => store.state.boundingBoxes.find((b) => b.id === 'front')?.boundingBox || null
)

const handleRange = (event: Event) => {
  return parseInt((event.target as HTMLInputElement).value)
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
  width: 2rem;
  height: 2rem;
  color: '#111827';
  margin-right: 1rem;
  background-color: v-bind('`${item.fill}`');
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
