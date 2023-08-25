<template>
  <div class="modal">
    <div class="modal-content">
      <h1>Color Modal</h1>
      <input
        type="color"
        :value="selectedObj?.fill"
        :onchange="(event: Event) => handleObjColorChange(event, store, selectedObjId, closeModal)"
      />

      <div>
        <Button color="red" title="Close" @click="closeModal" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'
import { useStore } from '@/store/store'
import { computed } from 'vue'
import handleObjColorChange from '@/utils/handleObjColorChange'

const props = defineProps<{
  isOpened: boolean
  selectedObjId: string
  closeModal: () => void
}>()

const store = useStore()

const selectedObj = computed(() => {
  return store.state.canvasObject.front.find((item) => item.id === props.selectedObjId)
})
</script>

<style scoped>
.modal {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  opacity: v-bind('`${isOpened ? 1 : 0}`');
  background-color: rgba(0, 0, 0, 0.5);
  visibility: v-bind('`${isOpened ? "visible" : "hidden"}`');
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 500px;
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
}

.modal-content h1 {
  margin: 0;
}

.modal-content input {
  cursor: pointer;
  margin: 1rem 0;
  width: 10rem;
  height: 10rem;
  border: none;
}
</style>
