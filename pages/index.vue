<template>
  <div class="min-h-screen">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-[60vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex justify-center items-center min-h-[60vh]">
      <div class="text-center">
        <p class="text-red-500 text-lg mb-4">{{ error }}</p>
        <button 
          @click="refresh" 
          class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Product Grid -->
    <div v-else-if="products" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <NuxtLink 
        v-for="product in products" 
        :key="product.id" 
        :to="`/products/${product.id}`"
        class="transition-transform hover:scale-105"
      >
        <ProductCard :product="product" />
      </NuxtLink>
    </div>
    <div v-else class="flex justify-center items-center min-h-[60vh]">
      <p class="text-gray-500 text-lg">No products found</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()

const { data: products, pending: loading, error, refresh } = await useFetch<Product[]>('/products', {
  baseURL: config.public.apiBase,
  key: 'products',
  retry: 3,
  retryDelay: 500,
  timeout: 10000,
  onResponseError({ response }) {
    const message = response?._data?.message || 'Failed to fetch products'
    throw createError({ statusCode: response?.status || 500, message })
  }
})
</script>