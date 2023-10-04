<script setup lang="ts">
import NavBar from './NavBar.vue'
</script>

<template>
  <a-layout class="layout">
    <NavBar />
    <slot></slot>
  </a-layout>
</template>

<style>
.layout {
  padding: 0 20px;
  min-height: 100vh;
}
</style>
