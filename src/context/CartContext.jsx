import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

const CartContext = createContext()

export function useCart(){
  return useContext(CartContext)
}

export function CartProvider({ children }){
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('lg_cart')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try { localStorage.setItem('lg_cart', JSON.stringify(cart)) } catch {}
  }, [cart])

  function addItem(item, qty = 1){
    setCart(prev => {
      const found = prev.find(i => i.id === item.id)
      if(found){
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { ...item, qty }]
    })
  }

  function removeItem(id){
    setCart(prev => prev.filter(i => i.id !== id))
  }

  function updateQty(id, qty){
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  function clear(){ setCart([]) }

  async function checkoutCart(){
    const payload = cart.map(i => ({ id: i.id, qty: i.qty }))
    if(payload.length === 0){
      throw new Error('Votre panier est vide.')
    }
    const response = await api.post('/checkout', { items: payload })
    clear()
    return response.data
  }

  const value = { cart, addItem, removeItem, updateQty, clear, checkout: checkoutCart }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
