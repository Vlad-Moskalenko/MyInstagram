<script setup lang="ts">
import { onMounted } from 'vue'
import type AppContainer from './components/AppContainer.vue'
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()

onMounted(() => {
  auth.getUser()
})
</script>

<template>
  <AppContainer>
    <RouterView />
  </AppContainer>
</template>
