"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import LandingPage from "@/components/landing-page"
import ShopPage from "@/components/shop-page"
import AdminPanel from "@/components/admin-panel"
import Cart from "@/components/cart"
import OrderModal from "@/components/order-modal"
import Footer from "@/components/footer"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"landing" | "shop" | "admin">("landing")
  const [cartItems, setCartItems] = useState<any[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [products, setProducts] = useState<any[]>([
    {
      id: 1,
      name: "Classic Garahe Tee",
      price: 45,
      image: "/model-1-front.png",
      category: "tees",
      size: "M",
      description: "Iconic metallic chain logo on premium black cotton",
    },
    {
      id: 2,
      name: "Garahe Culture Tee",
      price: 50,
      image: "/model-1-back.png",
      category: "tees",
      size: "L",
      description: "Back print with culture manifesto and graphics",
    },
    {
      id: 3,
      name: "Oversized Garahe Tee",
      price: 55,
      image: "/model-2-side.png",
      category: "tees",
      size: "XL",
      description: "Oversized fit with metallic chain branding",
    },
    {
      id: 4,
      name: "Duo Pack - Garahe Tees",
      price: 85,
      image: "/model-duo.png",
      category: "bundles",
      size: "M/L",
      description: "Two classic Garahe tees - perfect for the crew",
    },
  ])
  const [orders, setOrders] = useState<any[]>([])

  const addToCart = (product: any, options: { size: string; color: string; variant: string }) => {
    setCartItems([
      ...cartItems,
      {
        ...product,
        cartId: Math.random(),
        selectedSize: options.size,
        selectedColor: options.color,
        selectedVariant: options.variant,
      },
    ])
  }

  const removeFromCart = (cartId: number) => {
    setCartItems(cartItems.filter((item) => item.cartId !== cartId))
  }

  const handleCheckout = (orderData: any) => {
    const newOrder = {
      id: orders.length + 1,
      ...orderData,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price, 0),
      date: new Date().toLocaleDateString(),
    }
    setOrders([...orders, newOrder])
    setCartItems([])
    setShowOrderModal(false)
  }

  const addProduct = (newProduct: any) => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }])
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cartItems.length}
        onCartClick={() => setShowCart(!showCart)}
      />

      {showCart && <Cart items={cartItems} onRemove={removeFromCart} onCheckout={() => setShowOrderModal(true)} />}

      {showOrderModal && (
        <OrderModal items={cartItems} onClose={() => setShowOrderModal(false)} onSubmit={handleCheckout} />
      )}

      <div className="flex-1">
        {currentPage === "landing" && <LandingPage onShopClick={() => setCurrentPage("shop")} />}
        {currentPage === "shop" && <ShopPage products={products} onAddToCart={addToCart} />}
        {currentPage === "admin" && <AdminPanel products={products} onAddProduct={addProduct} orders={orders} />}
      </div>

      <Footer />
    </div>
  )
}
