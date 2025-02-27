"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/components/cart-provider"
import { CartSheet } from "@/components/cart-sheet"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const { items } = useCart()

  // Update search query when URL changes
  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "")
  }, [searchParams])

  // Handle search input
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const params = new URLSearchParams(searchParams)
      if (searchQuery) {
        params.set("q", searchQuery)
      } else {
        params.delete("q")
      }
      router.push(`/${params.toString() ? `?${params.toString()}` : ""}`)
    },
    [searchQuery, router, searchParams],
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4">
        <Link href="/" className="font-bold text-xl">
          TechHub
        </Link>
        <form onSubmit={handleSearch} className="flex-1 ml-4 mr-4 max-w-xl">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <CartSheet />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

