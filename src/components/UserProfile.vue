<script setup lang="ts">
import { ref, onMounted, watch, reactive } from 'vue'
import { useRoute } from 'vue-router'

import { supabase } from '@/supabase'
import { useAuthStore } from '@/stores/auth'
import ImageGallery from './ImageGallery.vue'
import UserBar from './UserBar.vue'
import AppSpinner from './AppSpinner.vue'

import type { Post } from '../entities/Post'
import type { AuthUser } from '../entities/Auth'
import type { UserInfo } from '@/entities/User'

const auth = useAuthStore()
const posts = ref<Post[]>([])
const user = ref<AuthUser | null>(null)
const userInfo = ref<UserInfo>({
  posts: 0,
  followers: 0,
  following: 0
})
const isLoading = ref(false)
const isFollowing = ref(false)
const route = useRoute()

onMounted(() => {
  fetchData()
})

watch(auth.user, () => {
  fetchIsFollowing()
})

const addNewPost = (post: Post) => {
  posts.value.unshift(post)
}

const updateIsFollowing = (follow: boolean) => {
  isFollowing.value = follow
}

const fetchData = async () => {
  isLoading.value = true

  const { data: userData } = await supabase
    .from('users')
    .select()
    .eq('name', route.params.username)
    .single()

  if (!userData) {
    isLoading.value = false
    return (user.value = null)
  }

  user.value = userData

  const { data: postsData } = await supabase
    .from('posts')
    .select()
    .eq('owner_id', user.value?.id)

  if (postsData) {
    posts.value = postsData
  }
  await fetchIsFollowing()
  await fetchFollowersCount()

  userInfo.value = {
    followers: await fetchFollowersCount(),
    following: await fetchFollowingCount(),
    posts: posts.value.length
  }

  isLoading.value = false
}

const fetchIsFollowing = async () => {
  if (auth.user.id && auth.user.id !== user.value?.id) {
    const { data } = await supabase
      .from('following_followers')
      .select()
      .eq('follower_id', user.value?.id)
      .eq('following_id', auth.user.id)
      .single()

    if (data) isFollowing.value = true
  }
}

const fetchFollowingCount = async (): Promise<number> => {
  const { count } = await supabase
    .from('following_followers')
    .select('*', { count: 'exact' })
    .eq('following_id', user.value?.id)

  return count || 0
}

const fetchFollowersCount = async (): Promise<number> => {
  const { count } = await supabase
    .from('following_followers')
    .select('*', { count: 'exact' })
    .eq('follower_id', user.value?.id)

  return count || 0
}
</script>

<template>
  <div v-if="!isLoading">
    <UserBar
      v-if="user"
      :key="$route.params.username"
      :user="user"
      :addNewPost="addNewPost"
      :userInfo="userInfo"
      :isFollowing="isFollowing"
      :updateIsFollowing="updateIsFollowing"
    />
    <ATypographyTitle v-else :level="2">User Not Found</ATypographyTitle>
    <ImageGallery :posts="posts" />
  </div>
  <AppSpinner v-else />
</template>
<style scoped></style>
