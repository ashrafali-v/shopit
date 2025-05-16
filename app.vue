<template>
  <div>
    <LoadingBar ref="loadingBar" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const loadingBar = ref()
const nuxtApp = useNuxtApp()

// Start loading bar before navigation
nuxtApp.hook('page:start', () => {
  loadingBar.value?.start()
})

// Finish loading bar after navigation
nuxtApp.hook('page:finish', () => {
  loadingBar.value?.finish()
})

// Handle navigation errors
nuxtApp.hook('page:error', () => {
  loadingBar.value?.finish()
})
</script>
