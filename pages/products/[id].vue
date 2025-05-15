<template>
  <div class="min-h-screen py-8">
    <!-- Back Button -->
    <NuxtLink 
      to="/"
      class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
      Back to Products
    </NuxtLink>

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

    <!-- Product Details -->
    <div v-else-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Product Image -->
        <div class="aspect-w-1 aspect-h-1">
          <img 
            :src="product.image" 
            :alt="product.title"
            class="w-full h-full object-contain rounded-lg"
          >
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <h1 class="text-3xl font-bold text-gray-900">{{ product.title }}</h1>
          
          <div class="flex items-center space-x-4">
            <span class="text-2xl font-bold text-gray-900">${{ product.price.toFixed(2) }}</span>
            <div class="flex items-center text-sm text-gray-500">
              <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {{ product.rating.rate }} ({{ product.rating.count }} reviews)
            </div>
          </div>

          <p class="text-gray-700">{{ product.description }}</p>

          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-500">Category:</span>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {{ product.category }}
            </span>
          </div>

          <button 
            @click="addToCart(product)"
            class="w-full md:w-auto bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center items-center min-h-[60vh]">
      <p class="text-gray-500 text-lg">Product not found</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCartStore } from '~/store/cart'

const route = useRoute()
const cartStore = useCartStore()

const config = useRuntimeConfig()

const { data: product, pending: loading, error, refresh } = await useFetch<Product>(`/products/${route.params.id}`, {
  baseURL: config.public.apiBase,
  key: `product-${route.params.id}`,
  retry: 3,
  retryDelay: 500,
  timeout: 10000,
  onResponseError({ response }) {
    const message = response?._data?.message || 'Failed to fetch product'
    throw createError({ statusCode: response?.status || 500, message })
  }
})

const addToCart = (product: Product) => {
  cartStore.addToCart(product)
}
</script>