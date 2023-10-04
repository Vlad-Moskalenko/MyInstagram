<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emits = defineEmits(['intersect'])

const observer = ref<IntersectionObserver | null>(null)
const root = ref<Element | null>(null)

onMounted(() => {
  observer.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      emits('intersect')
    }
  })

  if (root.value) {
    observer.value.observe(root.value)
  }
})
</script>

<template>
  <div ref="root" class="observer"></div>
</template>

<style scoped>
.observer {
  width: 100%;
  height: 10px;
}
</style>
