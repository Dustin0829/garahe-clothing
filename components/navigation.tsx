"use client"

import { ShoppingCart, Settings } from "lucide-react"

interface NavigationProps {
  currentPage: string
  setCurrentPage: (page: "landing" | "shop" | "admin") => void
  cartCount: number
  onCartClick: () => void
}

export default function Navigation({ currentPage, setCurrentPage, cartCount, onCartClick }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setCurrentPage("landing")}
            className="text-2xl font-black tracking-wider hover:opacity-80 transition"
          >
            <span className="metallic-text">GARAHE</span>
          </button>

          <div className="hidden md:flex gap-6">
            <button
              onClick={() => setCurrentPage("landing")}
              className={`text-sm font-bold tracking-widest transition ${
                currentPage === "landing" ? "text-accent" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              HOME
            </button>
            <button
              onClick={() => setCurrentPage("shop")}
              className={`text-sm font-bold tracking-widest transition ${
                currentPage === "shop" ? "text-accent" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              SHOP
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={onCartClick} className="relative p-2 hover:bg-secondary rounded transition">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentPage("admin")}
            className={`p-2 hover:bg-secondary rounded transition ${currentPage === "admin" ? "bg-secondary" : ""}`}
            title="Admin Panel"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
    </nav>
  )
}
