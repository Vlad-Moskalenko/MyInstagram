<script setup lang="ts">
import type { Post } from '../entities/Post.ts'

defineProps<{
  posts: Post[]
}>()
</script>
<template>
  <div class="container">
    <a-image
      :width="200"
      class="image"
      v-for="post in posts"
      :src="post.url"
      alt=""
      :key="post.id"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  gap: 5px;
  flex-wrap: wrap;
}
.image {
  margin: 5px;
  width: 200px;
}
</style>
