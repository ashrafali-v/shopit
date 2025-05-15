<template>
  <div class="relative">
    <button 
      @click="toggleCart"
      class="flex items-center space-x-2 bg-white rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
    >
      <span class="text-xl">🛒</span>
      <span class="font-semibold">{{ cartStore.totalItems }}</span>
    </button>

    <!-- Cart Dropdown -->
    <div v-if="showCart" class="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-4">Shopping Cart</h3>
        
        <div v-if="cartStore.items.length === 0" class="text-gray-500 text-center py-4">
          Your cart is empty
        </div>
        
        <div v-else>
          <!-- Cart Items -->
          <div class="space-y-4">
            <div v-for="item in cartStore.items" :key="item.id" class="flex items-center space-x-4">
              <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded">
              <div class="flex-1">
                <h4 class="font-medium">{{ item.name }}</h4>
                <p class="text-gray-600">${{ item.price.toFixed(2) }}</p>
              </div>
              <div class="flex items-center space-x-2">
                <button 
                  @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                  class="text-gray-500 hover:text-gray-700"
                >
                  -
                </button>
                <span>{{ item.quantity }}</span>
                <button 
                  @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                  class="text-gray-500 hover:text-gray-700"
                >
                  +
                </button>
              </div>
              <button 
                @click="cartStore.removeFromCart(item.id)"
                class="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
          
          <!-- Cart Total -->
          <div class="mt-4 pt-4 border-t">
            <div class="flex justify-between items-center mb-4">
              <span class="font-semibold">Total:</span>
              <span class="font-semibold">${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            <button 
              @click="cartStore.clearCart()"
              class="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./ShoppingCart.vue"></script>
