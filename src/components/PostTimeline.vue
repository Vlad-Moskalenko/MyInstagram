<script lang="ts" setup>
import type PostCard from './PostCard.vue'

const data = [
  {
    id: '1',
    username: 'John',
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
  },
  {
    id: '2',
    username: 'John',
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
  },
  {
    id: '3',
    username: 'John',
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
  },
  {
    id: '4',
    username: 'John',
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
  },
  {
    id: '5',
    username: 'John',
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
  },
  {
    id: '6',
    username: 'John',
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
  }
]
</script>
<template>
  <div class="container">
    <PostCard v-for="post in data" :key="post.id" :post="post" />
  </div>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
