"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface OrderModalProps {
  items: any[]
  onClose: () => void
  onSubmit: (data: any) => void
}

export default function OrderModal({ items, onClose, onSubmit }: OrderModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
  })

  const total = items.reduce((sum, item) => sum + item.price, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-black tracking-tighter">
            <span className="metallic-text">CHECKOUT</span>
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded transition">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <h3 className="font-bold tracking-widest mb-4 text-accent">ORDER SUMMARY</h3>
              <div className="space-y-3 mb-6">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="font-bold">${item.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold tracking-widest">TOTAL:</span>
                  <span className="text-2xl font-black">${total}</span>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div>
              <h3 className="font-bold tracking-widest mb-4 text-accent">SHIPPING & PAYMENT</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-secondary border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-secondary border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
                />
                <input
                  type="text"
                  placeholder="Address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-secondary border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-secondary border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    required
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full bg-secondary border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Card Number"
                  required
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full bg-secondary border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
                />

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={onClose}
                    className="flex-1 bg-secondary text-foreground hover:bg-secondary/80 font-bold tracking-widest rounded-none"
                  >
                    CANCEL
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-bold tracking-widest rounded-none"
                  >
                    PLACE ORDER
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
