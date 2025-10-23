"use client"

import { useState } from "react"
import { ShoppingCart, Menu, X } from "lucide-react"

interface NavigationProps {
  currentPage: string
  setCurrentPage: (page: "landing" | "shop" | "admin" | "cart") => void
  cartCount: number
  onCartClick: () => void
}

export default function Navigation({ currentPage, setCurrentPage, cartCount, onCartClick }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavigation = (page: "landing" | "shop" | "admin" | "cart") => {
    setCurrentPage(page)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => setCurrentPage("landing")}
              className="hover:opacity-80 transition"
            >
              <img 
                src="/garahe-logo.png" 
                alt="GARAHE Logo" 
                className="h-8 w-auto md:h-10"
              />
            </button>

            {/* Desktop Navigation */}
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

          <div className="flex items-center gap-2 md:gap-4">
            {/* Desktop Cart Button */}
            <button 
              onClick={() => setCurrentPage("cart")} 
              className={`relative p-2 hover:bg-secondary rounded transition ${currentPage === "cart" ? "bg-secondary" : ""} hidden md:flex`}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 hover:bg-secondary rounded transition"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-4 py-2 space-y-1">
              <button
                onClick={() => handleNavigation("landing")}
                className={`w-full text-left px-4 py-3 text-sm font-bold tracking-widest transition rounded ${
                  currentPage === "landing" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                HOME
              </button>
              <button
                onClick={() => handleNavigation("shop")}
                className={`w-full text-left px-4 py-3 text-sm font-bold tracking-widest transition rounded ${
                  currentPage === "shop" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                SHOP
              </button>
              <button
                onClick={() => handleNavigation("cart")}
                className={`w-full text-left px-4 py-3 text-sm font-bold tracking-widest transition rounded flex items-center justify-between ${
                  currentPage === "cart" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <span>CART</span>
                {cartCount > 0 && (
                  <span className="bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
