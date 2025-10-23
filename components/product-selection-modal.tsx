"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProductSelectionModalProps {
  product: any
  onClose: () => void
  onConfirm: (selectedOptions: { size: string; color: string; variant: string; quantity: number }) => void
}

export default function ProductSelectionModal({ product, onClose, onConfirm }: ProductSelectionModalProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedVariant, setSelectedVariant] = useState("Classic") // Default variant
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { toast } = useToast()

  const sizes = ["S", "M", "L", "XL"]
  const colors = [
    { name: "Black", value: "#000000" },
    { name: "Olive", value: "#6B7C32" },
    { name: "Navy", value: "#1B2951" },
    { name: "White", value: "#FFFFFF" }
  ]
  const variants = ["Classic", "Oversized", "Fitted"]
  
  // Mock multiple images for carousel
  const productImages = [
    product.image || "/placeholder.svg",
    product.image || "/placeholder.svg", // In real app, this would be different angles
  ]

  const handleConfirm = () => {
    console.log("Add to Cart clicked!", { selectedSize, selectedColor, selectedVariant, quantity })
    
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Selection Required",
        description: "Please select size and color",
        variant: "destructive",
      })
      return
    }
    
    console.log("Calling onConfirm with:", { size: selectedSize, color: selectedColor, variant: selectedVariant, quantity })
    onConfirm({ size: selectedSize, color: selectedColor, variant: selectedVariant, quantity })
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gray-900 max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-black border-b border-gray-700">
          <h2 className="text-base sm:text-lg font-bold text-white truncate">{product.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition flex-shrink-0">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(100vh-120px)] sm:h-[600px]">
          {/* Left Section - Product Images */}
          <div className="flex-1 bg-gray-800 relative min-h-[300px] lg:min-h-0">
            {/* Image Carousel */}
            <div className="relative h-full flex items-center justify-center p-4">
              <img
                src={productImages[currentImageIndex]}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-gray-700/80 hover:bg-gray-600/80 rounded-full flex items-center justify-center transition backdrop-blur-sm"
              >
                <ChevronLeft size={16} className="sm:w-5 sm:h-5 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-gray-700/80 hover:bg-gray-600/80 rounded-full flex items-center justify-center transition backdrop-blur-sm"
              >
                <ChevronRight size={16} className="sm:w-5 sm:h-5 text-white" />
              </button>
            </div>
            
            {/* Pagination Dots */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition ${
                    index === currentImageIndex ? "bg-white" : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Section - Product Details */}
          <div className="w-full lg:w-96 p-4 sm:p-6 lg:p-8 flex flex-col justify-between bg-gray-900">
            <div>
              {/* Product Description */}
              <p className="text-sm text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                Premium quality t-shirt featuring our signature design. Made with 100% cotton for ultimate comfort.
              </p>

              {/* Sizes */}
              <div className="mb-6 sm:mb-8">
                <label className="block text-sm font-bold text-white mb-3 sm:mb-4">SIZES</label>
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 sm:w-12 sm:h-12 text-xs sm:text-sm font-medium transition border ${
                        selectedSize === size
                          ? "bg-yellow-500 text-black border-yellow-500 shadow-lg shadow-yellow-500/30"
                          : "bg-transparent text-white border-yellow-600/60 hover:border-yellow-500 hover:bg-yellow-500/10"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6 sm:mb-8">
                <label className="block text-sm font-bold text-white mb-3 sm:mb-4">COLORS</label>
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full transition border-2 ${
                        selectedColor === color.name
                          ? "border-yellow-500 scale-110 shadow-lg shadow-yellow-500/30"
                          : "border-yellow-600/60 hover:border-yellow-500"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleConfirm}
              disabled={!selectedSize || !selectedColor}
              className={`w-full font-bold py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-wider transition ${
                !selectedSize || !selectedColor
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-yellow-500 text-black hover:bg-yellow-400 shadow-lg shadow-yellow-500/30"
              }`}
            >
              {!selectedSize || !selectedColor 
                ? "SELECT SIZE & COLOR" 
                : `ADD TO CART • PHP ${product.price}`
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
