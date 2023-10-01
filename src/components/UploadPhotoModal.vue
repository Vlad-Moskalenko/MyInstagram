<script lang="ts" setup>
import { ref } from 'vue'
import { nanoid } from 'nanoid'
import { UploadOutlined } from '@ant-design/icons-vue'

import { supabase } from '@/supabase'
import { useAuthStore } from '@/stores/auth'

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

    await supabase.from('posts').insert({
      url: data.path,
      caption: caption.value,
      owner_id: auth.user.id
    })
  }
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
    </a-modal>
  </div>
</template>

<style scoped>
input {
  margin-top: 10px;
}
</style>
