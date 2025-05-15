import { defineStore } from 'pinia'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

interface CartItem extends Product {
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),
  
  getters: {
    totalItems: (state) => state.items.reduce((total: number, item: CartItem) => total + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0),
  },

  actions: {
    addToCart(product: Product) {
      const existingItem = this.items.find((item: CartItem) => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({
          ...product,
          quantity: 1
        })
      }
    },

    removeFromCart(productId: number) {
      const index = this.items.findIndex((item: CartItem) => item.id === productId)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },

    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find((item: CartItem) => item.id === productId)
      if (item) {
        if (quantity > 0) {
          item.quantity = quantity
        } else {
          this.removeFromCart(productId)
        }
      }
    },

    clearCart() {
      this.items = []
    }
  }
})
