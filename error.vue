<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-red-600 mb-4">
        {{ error.statusCode === 404 ? 'Page Not Found' : 'Something went wrong' }}
      </h1>
      <p class="text-lg text-gray-600 mb-8">{{ error.message }}</p>
      <button
        @click="handleError"
        class="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to Home
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  error: {
    type: Object,
    required: true
  }
})

const handleError = () => {
  clearError()
  navigateTo('/')
}
</script>
