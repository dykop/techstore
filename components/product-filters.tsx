"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import BrandFilter from "@/hooks/BrandFilter";
import CategoryFilter from "@/hooks/CategoryFilter";

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      const currentValues = params.getAll(name);

      if (currentValues.includes(value)) {
        params.delete(name);
        currentValues
          .filter((v) => v !== value)
          .forEach((v) => params.append(name, v));
      } else {
        params.append(name, value);
      }

      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="grid gap-4">
      <Accordion type="single" collapsible defaultValue="category">
        <AccordionItem value="category">
          <AccordionTrigger>Categoria</AccordionTrigger>
          <AccordionContent>
            <CategoryFilter
              onFilterChange={(value: string) =>
                updateFilter("category", value)
              }
              selectedCategories={searchParams.getAll("category")}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="brand">
          <AccordionTrigger>Marcas</AccordionTrigger>
          <AccordionContent>
            <BrandFilter
              onFilterChange={(value: string) => updateFilter("brand", value)}
              selectedBrands={searchParams.getAll("brand")}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
