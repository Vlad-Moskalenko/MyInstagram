<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const searchUser = ref('')

const onSearchUser = () => {}
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
    <RouterLink to="/login">Login/Sign Up</RouterLink>
  </header>
</template>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.search {
  margin-right: auto;
}
</style>
