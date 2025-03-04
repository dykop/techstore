import React from "react";
import useBrands from "./useBrands";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface BrandFilterProps {
  onFilterChange: (value: string) => void;
  selectedBrands: string[];
}

const BrandFilter: React.FC<BrandFilterProps> = ({
  onFilterChange,
  selectedBrands,
}) => {
  const { brands, loading, error } = useBrands();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading brands</p>;

  return (
    <div className="grid gap-2">
      {brands.map((brand) => (
        <Label
          key={brand.brand}
          className="flex items-center gap-2 font-normal"
        >
          <Checkbox
            checked={selectedBrands.includes(brand.brand)}
            onCheckedChange={() => onFilterChange(brand.brand)}
          />
          {brand.brand}
        </Label>
      ))}
    </div>
  );
};

export default BrandFilter;
