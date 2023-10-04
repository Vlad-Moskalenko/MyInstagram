<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { supabase } from '../supabase'
import { useAuthStore } from '../stores/auth'
import PostCard from './PostCard.vue'

import type { Post } from '@/entities/Post'

const auth = useAuthStore()
const posts = ref<Post[]>([])

const fetchData = async () => {
  const { data } = await supabase
    .from('following_followers')
    .select('following_id')
    .eq('follower_id', auth.user.id)

  const owner_ids: number[] | undefined = data?.map((f) => f.following_id)

  if (owner_ids) {
    const { data } = await supabase
      .from('posts')
      .select()
      .in('owner_id', owner_ids)
      .order('created_at', { ascending: false })
    if (data) posts.value = data
  }
}

onMounted(() => {
  fetchData()
})
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
