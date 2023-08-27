<template>
  <div class="modal" @click="handleModalClick">
    <div id="swatch">
      <input
        id="color"
        type="color"
        :value="color"
        :onchange="
          (event: Event) => {
            handleObjColorChange(
              (event.target as HTMLInputElement).value,
              store,
              selectedObjId,
              closeModal
            )
          }
        "
      />
      <div class="info">
        <input
          type="text"
          id="hex"
          :value="color"
          @input="handleInputChange"
          @keypress.enter="handleColorSave"
        />
        <div class="info-btn">
          <Button color="red" title="Close" @click="closeModal" />
          <Button color="purple" title="Save" @click="handleColorSave" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'
import { useStore } from '@/store/store'
import handleObjColorChange from '@/utils/handleObjColorChange'
import { computed, ref } from 'vue'

const props = defineProps<{
  isOpened: boolean
  selectedObjId: string
  closeModal: () => void
}>()
const store = useStore()

const selectedObj = computed(() => {
  return store.state.canvasObject.front.find((item) => item.id === props.selectedObjId)
})

const color = ref(selectedObj?.value?.fill || '#000000')

const handleInputChange = (event: Event) => {
  color.value = (event.target as HTMLInputElement).value
}

const handleColorSave = () => {
  handleObjColorChange(color.value, store, props.selectedObjId)
  props.closeModal()
}

const handleModalClick = (event: MouseEvent) => {
  const { target } = event

  if (target instanceof HTMLElement && target.classList.contains('modal')) {
    props.closeModal()
  }
}
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
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  opacity: v-bind('`${isOpened ? 1 : 0}`');
  background-color: rgba(0, 0, 0, 0.5);
  visibility: v-bind('`${isOpened ? "visible" : "hidden"}`');
}

#swatch {
  display: flex;
  background: white;
  flex-direction: column;
  box-shadow: 1em 1em 1em rgba(0, 0, 0, 0.1);
}

.info {
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info-btn {
  gap: 1em;
  display: flex;
  justify-content: space-between;
}

#swatch input {
  text-transform: uppercase;
  border: 1 none;
  font-size: 2rem;
}

.info button {
  background: #eee;
  border: 0;
  border-radius: 0.25em;
  color: #666;
  cursor: pointer;
  font-size: 1em;
  padding: 0.5em;
  margin: 0.5em 0;
  width: 100%;
}

.info input {
  border: none;
  margin-bottom: 1rem;
  border-bottom: 2px solid #6366f1;
}

input[type='color'] {
  border: 0;
  padding: 0;
  width: 15em;
  height: 15em;
  cursor: pointer;
  background: none;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}
</style>
