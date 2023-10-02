<script setup lang="ts">
import type { Post } from '../entities/Post.ts'

defineProps<{
  posts: Post[]
}>()
</script>
<template>
  <div class="container">
    <div v-for="post in posts" :key="post.url">
      <a-image
        :width="200"
        class="image"
        :src="`https://vhuwoggcvtrqkjktqzyj.supabase.co/storage/v1/object/public/images/${post.url}`"
        :alt="post.caption"
      />
      <p>{{ post.caption }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}
.image {
  margin: 5px;
  width: 200px;
}
</style>
