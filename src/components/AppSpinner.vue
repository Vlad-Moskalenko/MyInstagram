<template>
  <div class="spinner">
    <a-spin size="large" />
  </div>
</template>

<style scoped>
.spinner {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;

  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.15);
  pointer-events: none;
}
</style>
