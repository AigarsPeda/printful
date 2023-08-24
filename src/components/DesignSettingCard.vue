<script setup lang="ts">
import type { RectType } from '@/store/state'

defineProps<{
  item: RectType
  position: { left: number; top: number }
  boundingBox: fabric.Rect | undefined
  handlePotionUpdate: (obj: { id: string; top: number; left: number }) => void
}>()

const handleRange = (event: Event) => {
  return parseInt((event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="design-setting-card-container">
    <div class="design-setting-card_color" />
    <div>
      <div class="design-setting-card_potion">
        <label> Left: {{ position.left }} </label>
        <input
          type="range"
          :min="boundingBox?.left || 0"
          :max="(boundingBox?.left || 0) + (boundingBox?.width || 0) - item.width"
          :value="position.left"
          @input="
            handlePotionUpdate({
              id: item.id,
              top: position.top,
              left: handleRange($event)
            })
          "
        />
      </div>
      <div class="design-setting-card_potion">
        <label> Top: {{ position.top }} </label>
        <input
          type="range"
          :min="boundingBox?.top || 0"
          :max="(boundingBox?.top || 0) + (boundingBox?.height || 0) - item.height"
          :value="position.top"
          @input="
            handlePotionUpdate({
              id: item.id,
              top: handleRange($event),
              left: position.left
            })
          "
        />
      </div>
    </div>
  </div>
</template>

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

.design-setting-card_potion {
  display: flex;
  margin-top: 0.5rem;
  flex-direction: column;
}

.design-setting-card_potion label {
  font-weight: 500;
  color: '#111827';
  text-align: left;
  font-size: 0.8rem;
}
</style>
