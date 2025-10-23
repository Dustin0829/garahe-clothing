"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  id: number
  name: string
  price: number
  cartId: number
}

interface CartProps {
  items: CartItem[]
  onRemove: (cartId: number) => void
  onCheckout: () => void
}

export default function Cart({ items, onRemove, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0)
  const { toast } = useToast()

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
    <div className="fixed top-20 right-0 w-full md:w-96 bg-card border-l border-border shadow-lg z-40 max-h-[calc(100vh-80px)] overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-black tracking-tighter mb-6">
          <span className="metallic-text">CART</span>
        </h2>

        {items.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.cartId} className="flex items-center justify-between bg-secondary p-4">
                  <div className="flex-1">
                    <p className="font-bold text-sm line-clamp-1">{item.name}</p>
                    <p className="text-accent font-bold">PHP {item.price}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(item.cartId, item.name)}
                    className="ml-4 p-1 hover:bg-background rounded transition"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold tracking-widest">TOTAL:</span>
                <span className="text-2xl font-black">PHP {total}</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold tracking-widest rounded-none py-6"
            >
              CHECKOUT
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
