<script lang="ts" setup>
import { ref } from 'vue'
import { nanoid } from 'nanoid'
import { UploadOutlined } from '@ant-design/icons-vue'

import { supabase } from '@/supabase'
import { useAuthStore } from '@/stores/auth'
import AppSpinner from './AppSpinner.vue'

import type { Post } from '@/entities/Post'

const props = defineProps<{
  addNewPost: (post: Post) => void
}>()

const open = ref(false)
const caption = ref('')
const file = ref(null)
const auth = useAuthStore()

const showModal = () => {
  open.value = true
}

const handleOk = async () => {
  auth.isLoading = true

  if (file.value) {
    const fileName = nanoid()
    const { data, error } = await supabase.storage
      .from('images')
      .upload('public/' + fileName, file.value)

    if (error) {
      auth.isLoading = false
      return (auth.errorMessage = 'Unable to upload image')
    }

    const postData = {
      url: data.path,
      caption: caption.value,
      owner_id: auth.user.id
    }
    await supabase.from('posts').insert(postData)
    props.addNewPost(postData)

    open.value = false
  }

  auth.isLoading = false
  file.value = null
  caption.value = ''
}

const handleUploadChange = (e) => {
  if (e.target.files[0]) {
    file.value = e.target.files[0]
  }
}
</script>

<template>
  <div>
    <a-button @click="showModal" type="primary" size="large">
      <template #icon>
        <UploadOutlined />
      </template>
      Upload
    </a-button>
    <a-modal v-model:open="open" title="Upload Photo" @ok="handleOk">
      <input type="file" accept=".jpeg, .png" @change="handleUploadChange" />
      <a-input v-model="caption" :maxlength="50" placeholder="Caption..." />
      <a-typography-text v-if="auth.errorMessage" type="danger" class="error-msg">{{
        auth.errorMessage
      }}</a-typography-text>
    </a-modal>
  </div>
  <AppSpinner v-if="auth.isLoading" />
</template>

<style scoped>
input {
  margin-top: 10px;
}
</style>
