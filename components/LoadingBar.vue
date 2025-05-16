<template>
  <div
    v-if="isLoading"
    class="fixed top-0 left-0 right-0 h-1 bg-blue-600 transition-all duration-500 ease-in-out"
    :style="{ width: `${progress}%` }"
  />
</template>

<script setup lang="ts">
const progress = ref(0)
const isLoading = ref(false)
let interval: NodeJS.Timeout

const start = () => {
  isLoading.value = true
  progress.value = 0
  interval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.random() * 10
    }
  }, 200)
}

const finish = () => {
  progress.value = 100
  setTimeout(() => {
    isLoading.value = false
    progress.value = 0
    clearInterval(interval)
  }, 300)
}

// Expose methods to parent
defineExpose({
  start,
  finish
})
</script>
