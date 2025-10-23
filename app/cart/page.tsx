"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Plus, Minus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  cartId: number
  selectedSize?: string
  selectedColor?: string
  selectedVariant?: string
}

interface CartPageProps {
  items?: CartItem[]
  onRemove: (cartId: number) => void
  onUpdateQuantity: (cartId: number, quantity: number) => void
  onCheckout: () => void
  onNavigateToShop: () => void
}

export default function CartPage({ items = [], onRemove, onUpdateQuantity, onCheckout, onNavigateToShop }: CartPageProps) {
  const { toast } = useToast()
  const total = items?.reduce((sum, item) => sum + item.price, 0) || 0

  const handleRemove = (cartId: number, itemName: string) => {
    onRemove(cartId)
    toast({
      title: "Item Removed",
      description: `${itemName} has been removed from your cart`,
    })
  }

  const handleCheckout = () => {
    onCheckout()
    toast({
      title: "Proceeding to Checkout",
      description: "Redirecting to checkout page",
    })
  }

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-black tracking-tighter mb-4">
            <span className="metallic-text">CART</span>
          </h1>
          <p className="text-muted-foreground">
            Review your items and proceed to checkout
          </p>
        </div>

        {!items || items.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button 
              onClick={onNavigateToShop}
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold tracking-widest rounded-none"
            >
              CONTINUE SHOPPING
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.cartId}
                    className="bg-secondary border border-border p-6 flex items-center gap-6"
                  >
                    {/* Product Image */}
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-24 h-24 object-cover bg-background"
                    />
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                      <div className="flex gap-6 text-sm text-muted-foreground mb-2">
                        {item.selectedSize && (
                          <span>Size: <span className="text-foreground font-bold">{item.selectedSize}</span></span>
                        )}
                        {item.selectedColor && (
                          <span>Color: <span className="text-foreground font-bold">{item.selectedColor}</span></span>
                        )}
                        {item.selectedVariant && (
                          <span>Variant: <span className="text-foreground font-bold">{item.selectedVariant}</span></span>
                        )}
                      </div>
                      <p className="text-accent font-bold text-xl">PHP {item.price}</p>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.cartId, item.name)}
                      className="p-2 hover:bg-background rounded transition text-muted-foreground hover:text-foreground"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-secondary border border-border p-6 sticky top-24">
                <h3 className="font-bold tracking-widest mb-6 text-accent">ORDER SUMMARY</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({items?.length || 0} items)</span>
                    <span>PHP {total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>PHP 0.00</span>
                  </div>
                </div>
                
                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold tracking-widest">TOTAL:</span>
                    <span className="text-2xl font-black">PHP {total}</span>
                  </div>
                </div>
                
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold tracking-widest rounded-none py-6"
                >
                  PROCEED TO CHECKOUT
                </Button>
                
                <div className="mt-4 text-center">
                  <button 
                    onClick={onNavigateToShop}
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
