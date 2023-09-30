<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import AppModal from './AppModal.vue'

const router = useRouter()

const searchUser = ref('')
const isAuthenticated = ref(true)

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
    <RouterLink v-if="!isAuthenticated" to="/login">Login/Sign Up</RouterLink>
    <AppModal v-else title="Logout" />
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
</style>
