<script lang="ts" setup>
import type { Post } from '@/entities/Post.ts'

defineProps<{
  post: Post
}>()
</script>

<template>
  <a-card hoverable style="width: 240px" class="card">
    <template #cover>
      <img alt="example" :src="post.url" />
    </template>
    <a-card-meta :title="post.username">
      <template #description>{{ post.username }}</template>
    </a-card-meta>
  </a-card>
</template>

<style scoped></style>
