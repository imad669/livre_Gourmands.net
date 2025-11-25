import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './styles/global-design.css'
import './styles/header-design.css'
import './styles/footer-design.css'
import './styles/gourmand-theme.css'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
)
