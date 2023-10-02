<script setup lang="ts">
import UserProfile from '@/components/UserProfile.vue'
</script>
<template>
  <UserProfile :key="$route.params.username" />
</template>
<style scoped></style>
