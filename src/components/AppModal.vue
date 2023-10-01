<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

defineProps({
  title: String
})
import { ref } from 'vue'
const visible = ref<boolean>(false)

const handleOk = () => {
  auth.handleLogout().then(() => {
    visible.value = false
  })
  router.push('/')
}
</script>

<template>
  <div>
    <a-button type="primary" @click="visible = true"> {{ title }} </a-button>
    <a-modal v-model:open="visible" :title="title" centered @ok="handleOk">
      Do you really want to leave us?
    </a-modal>
  </div>
</template>
