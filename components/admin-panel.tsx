"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface AdminPanelProps {
  products: any[]
  onAddProduct: (product: any) => void
  orders: any[]
}

export default function AdminPanel({ products, onAddProduct, orders }: AdminPanelProps) {
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products")
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "tees",
    size: "M",
    image: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    onAddProduct({
      ...formData,
      price: Number.parseFloat(formData.price),
      image: selectedFile ? URL.createObjectURL(selectedFile) : "",
    })
    setFormData({ name: "", price: "", category: "tees", size: "M", image: "" })
    setSelectedFile(null)
    setImagePreview(null)
    setShowAddProduct(false)
  }

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-black tracking-tighter mb-4">
            <span className="metallic-text">ADMIN</span>
            <span className="block text-foreground mt-2">PANEL</span>
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-4 font-bold tracking-widest text-sm transition border-b-2 ${
              activeTab === "products"
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            PRODUCTS
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-4 font-bold tracking-widest text-sm transition border-b-2 ${
              activeTab === "orders"
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            ORDERS ({orders.length})
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <div className="mb-8">
              <Button
                onClick={() => setShowAddProduct(!showAddProduct)}
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold tracking-widest rounded-none"
              >
                <Plus size={20} className="mr-2" />
                ADD NEW PRODUCT
              </Button>
            </div>

            {/* Add Product Form */}
            {showAddProduct && (
              <div className="bg-secondary border border-border p-8 mb-8">
                <h3 className="text-xl font-bold tracking-widest mb-6">NEW PRODUCT</h3>
                <form onSubmit={handleAddProduct} className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Product Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="bg-background border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
                  />
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-accent"
                  >
                    <option value="tees">Tees</option>
                    <option value="hoodies">Hoodies</option>
                    <option value="pants">Pants</option>
                    <option value="accessories">Accessories</option>
                  </select>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-accent"
                  >
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Product Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-accent file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-accent-foreground hover:file:bg-accent/90"
                    />
                    {imagePreview && (
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                        <img
                          src={imagePreview}
                          alt="Product preview"
                          className="w-32 h-32 object-cover border border-border"
                        />
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2 flex gap-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-bold tracking-widest rounded-none"
                    >
                      ADD PRODUCT
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setShowAddProduct(false)}
                      className="flex-1 bg-secondary text-foreground hover:bg-secondary/80 font-bold tracking-widest rounded-none"
                    >
                      CANCEL
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Products List */}
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-secondary border border-border p-6 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                      <span>
                        Price: <span className="text-accent font-bold">PHP {product.price}</span>
                      </span>
                      <span>
                        Category: <span className="text-foreground font-bold">{product.category}</span>
                      </span>
                      <span>
                        Size: <span className="text-foreground font-bold">{product.size}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">No orders yet</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-secondary border border-border p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-bold text-lg mb-2">Order #{order.id}</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>
                          Customer: <span className="text-foreground font-bold">{order.name}</span>
                        </p>
                        <p>
                          Email: <span className="text-foreground font-bold">{order.email}</span>
                        </p>
                        <p>
                          Date: <span className="text-foreground font-bold">{order.date}</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-bold mb-2">Shipping Address</h5>
                      <div className="text-sm text-muted-foreground">
                        <p>{order.address}</p>
                        <p>
                          {order.city}, {order.zipCode}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <h5 className="font-bold mb-3">Items</h5>
                    <div className="space-y-2 mb-4">
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{item.name}</span>
                          <span className="font-bold">PHP {item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-border">
                      <span className="font-bold tracking-widest">TOTAL:</span>
                      <span className="text-xl font-black">PHP {order.total}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
