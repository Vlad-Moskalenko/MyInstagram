<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'

import { useAuthStore } from '@/stores/auth'
import AppModal from './AppModal.vue'

const router = useRouter()

const searchUser = ref('')
const auth = useAuthStore()

const onSearchUser = () => {
  if (searchUser.value) {
    router.push(`/profile/${searchUser.value}`)
    searchUser.value = ''
  }
}
</script>
<template>
  <header class="header">
    <RouterLink to="/">MyInstagram</RouterLink>
    <a-input-search
      v-model:value="searchUser"
      placeholder="Search user..."
      style="width: 400px"
      @search="onSearchUser"
      class="search"
    />
    <div v-if="!auth.isLoadingUser">
      <RouterLink v-if="!auth.user.email" to="/login">Login/Sign Up</RouterLink>
      <div v-else class="nav">
        <RouterLink :to="`/profile/${auth.user.name}`">Profile</RouterLink>
        <AppModal title="Logout" />
      </div>
    </div>
  </header>
</template>
<style scoped>
.header {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.search {
  margin-right: auto;
}

.nav {
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>
