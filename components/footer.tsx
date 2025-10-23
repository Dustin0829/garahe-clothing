"use client"

import { Mail, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-black tracking-wider mb-4">
              <span className="metallic-text">GARAHE</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Raw. Industrial. Underground.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold tracking-widest text-sm mb-4 text-accent">SHOP</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  All Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Tees
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Bundles
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold tracking-widest text-sm mb-4 text-accent">SUPPORT</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold tracking-widest text-sm mb-4 text-accent">FOLLOW</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 hover:bg-secondary rounded transition" title="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 hover:bg-secondary rounded transition" title="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 hover:bg-secondary rounded transition" title="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">© 2025 Garahe. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
