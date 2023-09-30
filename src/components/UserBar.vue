<script setup lang="ts">
import type { UserInfo } from '../entities/User.ts'

defineProps<{
  username: string
  userInfo: UserInfo
}>()
</script>
<template>
  <div class="container">
    <div class="text-container">
      <div class="name-container">
        <a-typography-title :level="2">{{ username }}</a-typography-title>
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
}

.name-container input {
  margin-top: 3px;
  margin-left: 90px;
}
</style>
