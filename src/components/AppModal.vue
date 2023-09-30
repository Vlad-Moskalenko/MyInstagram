<script lang="ts" setup>
defineProps({
  title: String
})
import { ref } from 'vue'
const visible = ref<boolean>(false)

const showModal = () => {
  visible.value = true
}
</script>

<template>
  <div>
    <a-button type="primary" @click="visible = true"> {{ title }} </a-button>
    <a-modal v-model:open="visible" :title="title" centered @ok="visible = false">
      Do you really want to leave us?
    </a-modal>
  </div>
</template>
