import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"

export default function Home() {
  return (
    <div className="container px-4 py-6 md:py-8">
      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        <ProductFilters />
        <ProductGrid />
      </div>
    </div>
  )
}

