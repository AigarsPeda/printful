<template>
  <div>
    <div>
      <AppHeader :msg="`T shirt designer`" />
      <Design />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import Design from '@/components/Design.vue'
</script>

<style scoped></style>
