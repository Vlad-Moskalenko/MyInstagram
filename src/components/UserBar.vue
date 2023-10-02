<script setup lang="ts">
import { useRoute } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import UploadPhotoModal from './UploadPhotoModal.vue'

import { supabase } from '@/supabase'
import type { UserInfo } from '@/entities/User.ts'
import type { Post } from '@/entities/Post'
import type { AuthUser } from '@/entities/Auth'

const auth = useAuthStore()
const { params } = useRoute()

const { user, updateIsFollowing } = defineProps<{
  userInfo: UserInfo
  addNewPost: (post: Post) => void
  user: AuthUser
  updateIsFollowing: (follow: boolean) => void
  isFollowing: boolean
}>()

const followUser = () => {
  supabase
    .from('following_followers')
    .insert({
      follower_id: user.id,
      following_id: auth.user.id
    })
    .then(() => updateIsFollowing(true))
}

const unfollowUser = () => {
  supabase
    .from('following_followers')
    .delete()
    .eq('follower_id', user.id)
    .eq('following_id', auth.user.id)
    .then(() => updateIsFollowing(false))
}
</script>
<template>
  <div class="container">
    <div class="text-container">
      <div class="name-container">
        <a-typography-title :level="2">{{ user.name }}</a-typography-title>
        <div v-if="auth.user.email">
          <UploadPhotoModal :addNewPost="addNewPost" v-if="params.username === auth.user.name" />
          <div v-else>
            <a-button v-if="!isFollowing" @click="followUser" type="dashed">Follow</a-button>
            <a-button v-else @click="unfollowUser" type="dashed">Following</a-button>
          </div>
        </div>
      </div>
      <div class="stats-container">
        <a-typography-title :level="5">{{ userInfo.posts }} posts</a-typography-title>
        <a-typography-title :level="5">{{ userInfo.followers }} followers</a-typography-title>
        <a-typography-title :level="5">{{ userInfo.following }} following</a-typography-title>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  padding-bottom: 75px;
}

.text-container {
  width: 100%;
}

.stats-container {
  display: flex;
  align-items: center;
}

.stats-container h5 {
  margin: 0;
  padding: 0;
  margin-right: 30px;
}

.name-container {
  display: flex;
  justify-content: space-between;
}

.name-container input {
  margin-top: 3px;
  margin-left: 90px;
}
</style>
