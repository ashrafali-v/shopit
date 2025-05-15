<template>
  <div class="bg-white rounded-lg shadow-md p-4 h-full">
    <img :src="product.image" :alt="product.title" class="w-full h-48 object-contain rounded-lg mb-4">
    <div class="space-y-2">
      <h3 class="text-lg font-semibold truncate" :title="product.title">{{ product.title }}</h3>
      <p class="text-sm text-gray-500 line-clamp-2" :title="product.description">{{ product.description }}</p>
      <div class="flex items-center justify-between mt-4">
        <p class="text-gray-900 font-semibold">${{ product.price.toFixed(2) }}</p>
        <div class="flex items-center text-sm text-gray-500">
          <span class="flex items-center">
            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {{ product.rating.rate }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Product } from '~/types'
import { useCartStore } from '~/store/cart'

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  setup(props) {
    const cartStore = useCartStore()

    const addToCart = () => {
      cartStore.addToCart(props.product)
    }

    return { addToCart }
  }
})
</script>
