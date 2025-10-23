import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}

export const metadata = {
  title: "GARAHE - Raw. Industrial. Underground.",
  description: "Born from the streets. Forged in the underground. Garahe is a movement for those who refuse to conform. Pure attitude. Unfiltered expression. Authentic culture.",
  keywords: "streetwear, clothing, fashion, underground, industrial, raw, garahe, t-shirts, hoodies, urban wear, street culture, fashion brand",
  authors: [{ name: "GARAHE" }],
  creator: "GARAHE",
  publisher: "GARAHE",
  robots: "index, follow",
  url: "https://garahe-clothing-kv3v.vercel.app",
  canonical: "https://garahe-clothing-kv3v.vercel.app",
  openGraph: {
    title: "GARAHE - Raw. Industrial. Underground.",
    description: "Born from the streets. Forged in the underground. Garahe is a movement for those who refuse to conform. Pure attitude. Unfiltered expression. Authentic culture.",
    type: "website",
    locale: "en_US",
    siteName: "GARAHE",
    url: "https://garahe-clothing-kv3v.vercel.app",
    images: [
      {
        url: "https://garahe-clothing-kv3v.vercel.app/garahe-logo.png",
        width: 1200,
        height: 630,
        alt: "GARAHE - Raw. Industrial. Underground. Streetwear Brand",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@garahe_clothing",
    creator: "@garahe_clothing",
    title: "GARAHE - Raw. Industrial. Underground.",
    description: "Born from the streets. Forged in the underground. Garahe is a movement for those who refuse to conform.",
    images: ["https://garahe-clothing-kv3v.vercel.app/garahe-logo.png"],
  },
  facebook: {
    appId: "garahe_clothing",
  },
  instagram: {
    site: "@garahe_clothing",
  },
  linkedin: {
    site: "garahe-clothing",
  },
  icons: {
    icon: [
      { url: "/garahe-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/garahe-logo.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/garahe-logo.png",
    apple: [
      { url: "/garahe-logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  verification: {
    google: "garahe_clothing_verification",
    yandex: "garahe_clothing_verification",
    yahoo: "garahe_clothing_verification",
  },
  alternates: {
    canonical: "https://garahe-clothing-kv3v.vercel.app",
    languages: {
      "en-US": "https://garahe-clothing-kv3v.vercel.app",
    },
  },
};
