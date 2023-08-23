<template>
  <div>
    <div>
      <h3>Printful</h3>
      <button @click="actionInc()">Press Me</button>
      <h5>Counter: {{ store.state.counter }}</h5>
      <h3>Double Counter:</h3>
      {{ doubleCounter }}
      <h3>Name:</h3>
      {{ store.state.name }}
      <input :value="store.state.name" @input="updateValue($event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ActionTypes, MutationTypes, useStore } from '@/store/store'
import { computed } from 'vue'

const store = useStore()

const actionInc = () => {
  store.dispatch(ActionTypes.INC_COUNTER, 2)
}

const doubleCounter = computed(() => store.getters.doubleCounter)
const updateValue = (e: Event) => {
  store.commit(MutationTypes.UPDATE_NAME, (e.target as HTMLInputElement).value)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 42px 0 0;
}
</style>
