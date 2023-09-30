<script setup lang="ts">
import { reactive, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const route = useRoute()

const user = reactive({
  name: '',
  email: '',
  password: ''
})

const handleSubmit = () => {
  if (route.name === 'login') {
    auth.handleLogin(user)
  }

  auth.handleSignUp(user)
}

onUnmounted(() => {
  auth.clearErrorMessage()
})
</script>
<template>
  <form @submit.prevent="handleSubmit" class="form">
    <a-input
      v-if="route.name === 'signup'"
      type="text"
      v-model:value="user.name"
      placeholder="Name"
    />
    <a-input type="email" v-model:value="user.email" placeholder="Email" />
    <a-input-password v-model:value="user.password" placeholder="Password" />
    <a-typography-text v-if="auth.errorMessage" type="danger" class="error-msg">{{
      auth.errorMessage
    }}</a-typography-text>
    <a-button htmlType="submit" type="primary" class="submit-btn">{{
      route.name === 'login' ? 'Login' : 'Register'
    }}</a-button>
  </form>
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
