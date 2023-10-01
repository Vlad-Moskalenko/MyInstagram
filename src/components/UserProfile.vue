<script setup lang="ts">
import type ImageGallery from './ImageGallery.vue'
import type UserBar from './UserBar.vue'
import { posts } from '../data/posts.js'
</script>

<template>
  <UserBar
    :key="$route.params.username"
    username="Vlad"
    :userInfo="{
      posts: 4,
      followers: 100,
      following: 200
    }"
  />
  <ImageGallery :posts="posts" />
</template>
<style scoped></style>
