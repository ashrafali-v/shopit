<template>
  <div class="relative">
    <!-- Cart Button -->
    <button 
      @click="toggleCart" 
      class="relative p-2 text-gray-600 hover:text-gray-900"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <span 
        v-if="cartStore.totalItems > 0" 
        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
      >
        {{ cartStore.totalItems }}
      </span>
    </button>

    <!-- Cart Dropdown -->
    <div 
      v-if="showCart" 
      class="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50"
    >
      <div class="p-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Shopping Cart</h3>
          <button 
            @click="toggleCart" 
            class="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <div v-if="cartStore.items.length === 0" class="text-gray-500 text-center py-8">
          Your cart is empty
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="item in cartStore.items" 
            :key="item.id" 
            class="flex items-center justify-between gap-4"
          >
            <div class="flex items-center gap-4">
              <img :src="item.image" :alt="item.title" class="w-16 h-16 object-cover rounded">
              <div>
                <h4 class="font-medium">{{ item.title }}</h4>
                <p class="text-gray-500">${{ item.price.toFixed(2) }} × {{ item.quantity }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button 
                @click="cartStore.decrementQuantity(item.id)" 
                class="p-1 text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
              <span class="text-gray-600 w-4 text-center">{{ item.quantity }}</span>
              <button 
                @click="cartStore.incrementQuantity(item.id)" 
                class="p-1 text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <div class="border-t pt-4 mt-4">
            <div class="flex justify-between font-semibold mb-2">
              <span>Total:</span>
              <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            <button class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '../store/cart'

const showCart = ref(false)
const cartStore = useCartStore()

const toggleCart = () => {
  showCart.value = !showCart.value
}
</script>
