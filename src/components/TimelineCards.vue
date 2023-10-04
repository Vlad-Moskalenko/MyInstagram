<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { supabase } from '../supabase'
import { useAuthStore } from '../stores/auth'
import PostCard from './PostCard.vue'
import AppObserver from './AppObserver.vue'

import type { Post } from '@/entities/Post'

const auth = useAuthStore()
const posts = ref<Post[]>([])
const owner_ids = ref<number[] | undefined>([])
const lastCardIndex = ref(4)
const reachEnd = ref(false)

const fetchData = async () => {
  const { data } = await supabase
    .from('following_followers')
    .select('following_id')
    .eq('follower_id', auth.user.id)

  owner_ids.value = data?.map((f) => f.following_id)

  if (owner_ids.value) {
    const { data } = await supabase
      .from('posts')
      .select()
      .in('owner_id', owner_ids.value)
      .range(0, lastCardIndex.value)
      .order('created_at', { ascending: false })
    if (data) posts.value = data
  }
}

const fetchNextSet = async () => {
  if (!reachEnd.value) {
    if (owner_ids.value) {
      const { data } = await supabase
        .from('posts')
        .select()
        .in('owner_id', owner_ids.value)
        .range(lastCardIndex.value + 1, lastCardIndex.value + 5)
        .order('created_at', { ascending: false })
      if (data?.length) posts.value = [...posts.value, ...data]
      lastCardIndex.value = lastCardIndex.value + 5

      if (!data?.length) reachEnd.value = true
    }
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="container">
    <PostCard v-for="post in posts" :key="post.id" :post="post" />
    <AppObserver v-if="posts.length" @intersect="fetchNextSet" />
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
