<script lang="ts" setup>
import type { Post } from '@/entities/Post.ts'

const { VITE_IMG_BASE_URL } = import.meta.env

defineProps<{
  post: Post
}>()
</script>

<template>
  <a-card hoverable style="width: 240px" class="card">
    <template #cover>
      <img alt="example" :src="`${VITE_IMG_BASE_URL}${post.url}`" />
    </template>
    <a-card-meta title="vlad">
      <template #description>{{ post.caption }}</template>
    </a-card-meta>
  </a-card>
</template>

<style scoped></style>
