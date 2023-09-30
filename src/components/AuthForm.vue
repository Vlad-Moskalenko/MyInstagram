<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

console.log(route)

const user = reactive({
  name: '',
  email: '',
  password: ''
})
</script>
<template>
  <form class="form">
    <a-input
      v-if="route.name === 'signup'"
      type="text"
      v-model:value="user.name"
      placeholder="Name"
    />
    <a-input type="email" v-model:value="user.email" placeholder="Email" />
    <a-input-password v-model:value="user.password" placeholder="Password" />
    <a-button type="primary">{{ route.name === 'login' ? 'Login' : 'Register' }}</a-button>
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
</style>
