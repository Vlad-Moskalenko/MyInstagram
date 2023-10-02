<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '../stores/auth'
import AppSpinner from './AppSpinner.vue'

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
}

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const user = ref(INITIAL_STATE)

const handleSubmit = async () => {
  if (route.name === 'login') {
    await auth.handleLogin(user.value)
  } else {
    await auth.handleSignUp(user.value)
  }

  if (auth.user.email) {
    router.push(`/profile/${auth.user.name}`)
    user.value = INITIAL_STATE
  }
}

onUnmounted(() => {
  auth.clearErrorMessage()
})
</script>
<template>
  <form @submit.prevent="handleSubmit" class="form" :aria-disabled="auth.isLoading">
    <a-input
      v-if="route.name === 'signup'"
      type="text"
      v-model:value="user.name"
      placeholder="Name"
      autocomplete="username"
    />
    <a-input type="email" v-model:value="user.email" placeholder="Email" autocomplete="email" />
    <a-input-password
      v-model:value="user.password"
      placeholder="Password"
      autocomplete="password"
    />
    <a-typography-text v-if="auth.errorMessage" type="danger" class="error-msg">{{
      auth.errorMessage
    }}</a-typography-text>
    <a-button htmlType="submit" type="primary" class="submit-btn" :disabled="auth.isLoading">{{
      route.name === 'login' ? 'Login' : 'Register'
    }}</a-button>
  </form>
  <AppSpinner v-if="auth.isLoading" />
</template>

<style scoped>
.form {
  margin: 0 auto;
  width: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
}

.error-msg {
}

.submit-btn {
  margin-top: 20px;
}
</style>
