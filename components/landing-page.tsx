"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface LandingPageProps {
  onShopClick: () => void
}

export default function LandingPage({ onShopClick }: LandingPageProps) {
  return (
    <div className="pt-20 min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/garahe-logo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.3) contrast(1.2)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />

        <div className="relative z-10 text-center max-w-4xl mx-auto w-full">

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 md:mb-6">
            <span className="metallic-text">GARAHE</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-accent mb-4 font-bold tracking-widest">
            RAW. INDUSTRIAL. UNDERGROUND.
          </p>

          <p className="text-sm md:text-base text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Born from the streets. Forged in the underground. Garahe is a movement for those who refuse to conform. Pure
            attitude. Unfiltered expression. Authentic culture.
          </p>

          <Button
            onClick={onShopClick}
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 md:px-8 py-4 md:py-6 text-sm md:text-lg font-bold tracking-widest rounded-none"
          >
            SHOP NOW
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>

      </section>

      {/* Brand Story Section */}
      <section className="py-16 md:py-20 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 md:mb-12">
            <span className="metallic-text">THE GARAHE</span>
            <span className="block text-foreground mt-2">MANIFESTO</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <h3 className="text-base md:text-lg font-bold tracking-widest mb-3 md:mb-4 text-accent">RAW</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                No filters. No compromises. We strip away the noise and deliver pure, unfiltered streetwear that speaks
                the truth.
              </p>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold tracking-widest mb-3 md:mb-4 text-accent">INDUSTRIAL</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Built tough. Crafted with precision. Every piece is engineered for those who live the culture and demand
                quality.
              </p>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold tracking-widest mb-3 md:mb-4 text-accent">UNDERGROUND</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                From the streets to the world. We celebrate the underground movement and those brave enough to stand
                apart.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
