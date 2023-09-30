<script setup lang="ts">
import type UserBar from './UserBar.vue'
</script>
<template>
  <UserBar
    username="Vlad"
    :userInfo="{
      posts: 4,
      followers: 100,
      following: 200
    }"
  />
</template>
<style scoped></style>
