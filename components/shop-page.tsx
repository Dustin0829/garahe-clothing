"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import ProductSelectionModal from "./product-selection-modal"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  size: string
  description?: string
}

interface ShopPageProps {
  products: Product[]
  onAddToCart: (product: Product, options: { size: string; color: string; variant: string }) => void
}

export default function ShopPage({ products, onAddToCart }: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showProductModal, setShowProductModal] = useState(false)

  const categories = ["tees", "bundles"]
  const filteredProducts = selectedCategory ? products.filter((p) => p.category === selectedCategory) : products

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product)
    setShowProductModal(true)
  }

  const handleConfirmSelection = (options: { size: string; color: string; variant: string }) => {
    if (selectedProduct) {
      onAddToCart(selectedProduct, options)
      setShowProductModal(false)
      setSelectedProduct(null)
    }
  }

  return (
    <div className="pt-24 min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-3 md:mb-4">
            <span className="metallic-text">COLLECTION</span>
          </h1>
          <p className="text-accent text-base md:text-lg font-bold tracking-widest">RAW. INDUSTRIAL. UNDERGROUND.</p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 md:gap-4 mb-8 md:mb-12 overflow-x-auto pb-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 md:px-6 py-2 font-bold tracking-widest text-xs md:text-sm whitespace-nowrap transition ${
              selectedCategory === null
                ? "bg-accent text-accent-foreground"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            ALL
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 md:px-6 py-2 font-bold tracking-widest text-xs md:text-sm whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative bg-secondary overflow-hidden mb-3 md:mb-4 aspect-square">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
              </div>

              <h3 className="font-bold tracking-wide text-xs md:text-sm mb-2 line-clamp-2">{product.name}</h3>

              {product.description && (
                <p className="text-xs text-muted-foreground mb-2 md:mb-3 line-clamp-2">{product.description}</p>
              )}

              <div className="flex items-center justify-between mb-3 md:mb-4 flex-wrap gap-2">
                <span className="text-base md:text-lg font-black">PHP{product.price}</span>
                <span className="text-xs text-muted-foreground font-bold">Size: {product.size}</span>
              </div>

              <Button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold tracking-widest rounded-none text-xs md:text-sm py-2 md:py-3"
              >
                <ShoppingCart size={16} className="mr-2" />
                ADD TO CART
              </Button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-base md:text-lg">No products in this category</p>
          </div>
        )}
      </div>

      {showProductModal && selectedProduct && (
        <ProductSelectionModal
          product={selectedProduct}
          onClose={() => {
            setShowProductModal(false)
            setSelectedProduct(null)
          }}
          onConfirm={handleConfirmSelection}
        />
      )}
    </div>
  )
}
