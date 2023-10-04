<script lang="ts" setup>
import type { Post } from '@/entities/Post.ts'

defineProps<{
  post: Post
}>()
</script>

<template>
  <a-card hoverable style="width: 240px" class="card">
    <template #cover>
      <img
        alt="example"
        :src="`https://vhuwoggcvtrqkjktqzyj.supabase.co/storage/v1/object/public/images/${post.url}`"
      />
    </template>
    <a-card-meta title="vlad">
      <template #description>{{ post.caption }}</template>
    </a-card-meta>
  </a-card>
</template>

<style scoped></style>
