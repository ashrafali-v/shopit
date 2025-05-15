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

        <div v-if="cartStore.items.length === 0" class="text-center py-8">
          <p class="text-gray-500">Your cart is empty</p>
        </div>

        <div v-else class="space-y-4">
          <!-- Cart Items -->
          <div 
            v-for="item in cartStore.items" 
            :key="item.id" 
            class="flex items-center space-x-4"
          >
            <img 
              :src="item.image" 
              :alt="item.name" 
              class="h-16 w-16 object-cover rounded"
            >
            <div class="flex-1">
              <h4 class="font-medium">{{ item.name }}</h4>
              <p class="text-gray-500">${{ item.price.toFixed(2) }}</p>
              <div class="flex items-center space-x-2 mt-1">
                <button 
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  class="text-gray-500 hover:text-gray-700"
                >
                  -
                </button>
                <span>{{ item.quantity }}</span>
                <button 
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="text-gray-500 hover:text-gray-700"
                >
                  +
                </button>
              </div>
            </div>
            <button 
              @click="removeFromCart(item.id)"
              class="text-red-500 hover:text-red-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <!-- Cart Footer -->
          <div class="border-t pt-4">
            <div class="flex justify-between mb-2">
              <span>Total:</span>
              <span class="font-semibold">${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            <button 
              @click="checkout"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useCartStore } from '~/store/cart'

export default defineComponent({
  setup() {
    const cartStore = useCartStore()
    const showCart = ref(false)

    const toggleCart = () => {
      showCart.value = !showCart.value
    }

    const updateQuantity = (productId: number, quantity: number) => {
      cartStore.updateQuantity(productId, quantity)
    }

    const removeFromCart = (productId: number) => {
      cartStore.removeFromCart(productId)
    }

    const checkout = () => {
      // Implement checkout logic here
      alert('Checkout functionality coming soon!')
      cartStore.clearCart()
      showCart.value = false
    }

    return {
      cartStore,
      showCart,
      toggleCart,
      updateQuantity,
      removeFromCart,
      checkout
    }
  }
})
</script>
