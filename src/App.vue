<template>
  <div class="hello">
    <div class="bg-gray-300 h-64 w-4/6 mx-auto shadow-md flex flex-col justify-center items-center">
      <h3 class="text-xl font-semibold">Increment Counter</h3>
      <button
        class="bg-red-500 text-blue-900 border rounded-lg px-8 m-4 h-10 text-2xl font-bold focus:outline-none"
        @click="actionInc()"
      >
        Press Me
      </button>
      <h5 class="text-3xl">Counter: {{ store.state.counter }}</h5>
      <h3>Double Counter:</h3>
      {{ doubleCounter }}
      <h3>Name:</h3>
      {{ store.state.name }}
      <input :value="store.state.name" @input="updateValue($event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore, MutationTypes, ActionTypes } from '@/store/store'

const store = useStore()

const actionInc = () => {
  store.dispatch(ActionTypes.INC_COUNTER, 2)
}

const doubleCounter = computed(() => store.getters.doubleCounter)
const updateValue = (e: Event) => {
  // if (!e.target) return
  store.commit(MutationTypes.UPDATE_NAME, (e.target as HTMLInputElement).value)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
