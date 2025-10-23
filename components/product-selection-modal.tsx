"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ProductSelectionModalProps {
  product: any
  onClose: () => void
  onConfirm: (selectedOptions: { size: string; color: string; variant: string }) => void
}

export default function ProductSelectionModal({ product, onClose, onConfirm }: ProductSelectionModalProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedVariant, setSelectedVariant] = useState("")

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const colors = ["Black", "White", "Gray", "Navy"]
  const variants = ["Classic", "Oversized", "Fitted"]

  const handleConfirm = () => {
    if (!selectedSize || !selectedColor || !selectedVariant) {
      alert("Please select size, color, and variant")
      return
    }
    onConfirm({ size: selectedSize, color: selectedColor, variant: selectedVariant })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-secondary max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-secondary sticky top-0 bg-background">
          <h2 className="text-lg md:text-xl font-black tracking-wider">SELECT OPTIONS</h2>
          <button onClick={onClose} className="hover:bg-secondary p-2 transition">
            <X size={20} />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 md:p-6 border-b border-secondary">
          <div className="flex gap-4 mb-4">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-20 h-20 object-cover bg-secondary"
            />
            <div>
              <h3 className="font-bold text-sm md:text-base mb-1">{product.name}</h3>
              <p className="text-accent font-black text-lg">${product.price}</p>
            </div>
          </div>
          {product.description && <p className="text-xs md:text-sm text-muted-foreground">{product.description}</p>}
        </div>

        {/* Size Selection */}
        <div className="p-4 md:p-6 border-b border-secondary">
          <label className="block text-xs md:text-sm font-bold tracking-widest mb-3">SIZE</label>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2 px-3 text-xs md:text-sm font-bold tracking-wider transition ${
                  selectedSize === size
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="p-4 md:p-6 border-b border-secondary">
          <label className="block text-xs md:text-sm font-bold tracking-widest mb-3">COLOR</label>
          <div className="grid grid-cols-2 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`py-2 px-3 text-xs md:text-sm font-bold tracking-wider transition ${
                  selectedColor === color
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Variant Selection */}
        <div className="p-4 md:p-6 border-b border-secondary">
          <label className="block text-xs md:text-sm font-bold tracking-widest mb-3">VARIANT</label>
          <div className="grid grid-cols-1 gap-2">
            {variants.map((variant) => (
              <button
                key={variant}
                onClick={() => setSelectedVariant(variant)}
                className={`py-2 px-3 text-xs md:text-sm font-bold tracking-wider transition text-left ${
                  selectedVariant === variant
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {variant}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 md:p-6 flex gap-3">
          <Button
            onClick={onClose}
            className="flex-1 bg-secondary text-foreground hover:bg-secondary/80 font-bold tracking-widest rounded-none text-xs md:text-sm"
          >
            CANCEL
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-bold tracking-widest rounded-none text-xs md:text-sm"
          >
            ADD TO CART
          </Button>
        </div>
      </div>
    </div>
  )
}
