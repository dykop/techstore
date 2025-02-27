"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { formatPrice } from "@/lib/utils"

// Mock product data - in a real app, this would come from an API
const products = {
  "1": {
    id: "1",
    name: 'MacBook Pro 14"',
    description:
      "The most powerful MacBook Pro ever is here. With the blazing-fast M2 Pro chip — the first of its kind — you get groundbreaking performance and amazing battery life. Add to that a stunning Liquid Retina XDR display and all the ports you need, and you're ready to create, work, and play like never before.",
    price: 1999,
    image: "/placeholder.svg",
    specs: [
      "Apple M2 Pro chip",
      "16GB unified memory",
      "512GB SSD storage",
      "14-inch Liquid Retina XDR display",
      "Three Thunderbolt 4 ports",
      "HDMI port",
      "SDXC card slot",
      "Magic Keyboard with Touch ID",
      "Force Touch trackpad",
    ],
  },
  // Add more products as needed
}

export default function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const { addItem } = useCart()
  const product = products[params.id]

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="container px-4 py-6 md:py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-lg border bg-background"
          />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold mt-2">{formatPrice(product.price)}</p>
          </div>
          <p className="text-muted-foreground">{product.description}</p>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {product.specs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
          </div>
          <Button
            size="lg"
            className="w-full md:w-auto"
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            }
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

