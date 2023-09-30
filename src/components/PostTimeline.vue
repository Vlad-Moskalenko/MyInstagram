<script lang="ts" setup>
import type PostCard from './PostCard.vue'
import { posts } from '../data/posts.js'
</script>
<template>
  <div class="container">
    <PostCard v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
