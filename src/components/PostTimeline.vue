<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import TimelineCards from './TimelineCards.vue'

import type AppSpinner from './AppSpinner.vue'

const auth = useAuthStore()
</script>
<template>
  <div v-if="!auth.isLoadingUser">
    <TimelineCards v-if="auth.user.email" />
    <h2 v-else>Log in to to see post</h2>
  </div>
  <AppSpinner v-else />
</template>
