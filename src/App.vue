<template>
  <div>
    <div>
      <AppHeader msg="T shirt designer" />
      <Placements @canvas-created="handleCreated" @mouse:dblclick="handleClick" />
      <h3>Counter:</h3>
      <div>
        {{ lengthCanvasObject }}
      </div>
      <Button title="Press Me" @click="actionInc" />
      <h5>Counter: {{ store.state.counter }}</h5>
      <h3>Double Counter:</h3>
      {{ doubleCounter }}
      <h3>Name:</h3>
      {{ store.state.name }}
      <div>
        <input :value="store.state.name" @input="updateValue($event)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import Button from '@/components/Button.vue'
import Placements from '@/components/Placements.vue'
import { ActionTypes, MutationTypes, useStore } from '@/store/store'
import { fabric } from 'fabric'
import { computed, ref, watch } from 'vue'

const store = useStore()

const actionInc = () => {
  store.dispatch(ActionTypes.INC_COUNTER, 2)
}

const doubleCounter = computed(() => store.getters.doubleCounter)
const lengthCanvasObject = computed(() => store.getters.getLengthCanvasObject)

const updateValue = (e: Event) => {
  store.commit(MutationTypes.UPDATE_NAME, (e.target as HTMLInputElement).value)
}

const canvas = ref<fabric.Canvas>()

const handleCreated = (fabricCanvas: fabric.Canvas) => {
  canvas.value = fabricCanvas

  store.state.canvasObject.forEach((rect) => {
    const r = new fabric.Rect(rect)

    r.set('id', rect.id)

    canvas.value?.add(r)
  })
}

const handleClick = () => {
  if (!canvas.value) return

  store.commit(MutationTypes.ADD_RECT, {
    top: 0,
    left: 0,
    width: 50,
    height: 50,
    fill: 'green',
    id: (lengthCanvasObject.value + 1).toString()
  })
}

// if canvasContent is updated add the new object to the canvas
watch(store.state.canvasObject, () => {
  if (!canvas.value) return

  const obj = canvas.value?.getObjects()
  const ids = obj?.map((o) => o.id)

  const filterNewVal = store.state.canvasObject.filter((o) => !ids?.includes(o.id))

  filterNewVal.forEach((rect) => {
    const r = new fabric.Rect(rect)
    canvas.value?.add(r)
  })
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 42px 0 0;
}
</style>
