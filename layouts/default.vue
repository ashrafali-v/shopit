<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Fullscreen Loading -->
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center"
    >
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent" />
    </div>

    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            ShopIt
          </NuxtLink>
          <ShoppingCart />
        </div>
      </div>
    </header>

    <!-- Page Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const isLoading = ref(true)

onMounted(() => {
  // Hide loading after initial page load
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})
</script>