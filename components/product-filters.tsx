"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const categories = [
  { id: "laptops", name: "Laptops" },
  { id: "smartphones", name: "Smartphones" },
  { id: "tablets", name: "Tablets" },
  { id: "accessories", name: "Accessories" },
]

const brands = [
  { id: "apple", name: "Apple" },
  { id: "samsung", name: "Samsung" },
  { id: "dell", name: "Dell" },
  { id: "hp", name: "HP" },
  { id: "lenovo", name: "Lenovo" },
]

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      const currentValues = params.getAll(name)

      if (currentValues.includes(value)) {
        params.delete(name)
        currentValues.filter((v) => v !== value).forEach((v) => params.append(name, v))
      } else {
        params.append(name, value)
      }

      router.push(`/?${params.toString()}`)
    },
    [router, searchParams],
  )

  return (
    <div className="grid gap-4">
      <Accordion type="single" collapsible defaultValue="category">
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {categories.map((category) => (
                <Label key={category.id} className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={searchParams.getAll("category").includes(category.id)}
                    onCheckedChange={() => updateFilter("category", category.id)}
                  />
                  {category.name}
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="brand">
          <AccordionTrigger>Brand</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {brands.map((brand) => (
                <Label key={brand.id} className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={searchParams.getAll("brand").includes(brand.id)}
                    onCheckedChange={() => updateFilter("brand", brand.id)}
                  />
                  {brand.name}
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4">
              <Slider
                defaultValue={[0, 2000]}
                max={2000}
                step={100}
                onValueChange={(value) => {
                  const params = new URLSearchParams(searchParams)
                  params.set("minPrice", value[0].toString())
                  params.set("maxPrice", value[1].toString())
                  router.push(`/?${params.toString()}`)
                }}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>$0</span>
                <span>$2000</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

