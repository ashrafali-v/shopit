<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded-md mb-4">
    <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
    <p class="text-gray-600 mb-4">${{ product.price.toFixed(2) }}</p>
    <button 
      @click="addToCart" 
      class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
    >
      Add to Cart
    </button>
  </div>
</template>

<script lang="ts" src="./ProductCard.vue"></script>
