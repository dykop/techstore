import React from "react";
import useCategories from "./useCategory";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CategoryFilterProps {
  onFilterChange: (value: string) => void;
  selectedCategories: string[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  onFilterChange,
  selectedCategories,
}) => {
  const { categories, loading, error } = useCategories();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories</p>;

  return (
    <div className="grid gap-2">
      {categories.map((category) => (
        <Label
          key={category.category}
          className="flex items-center gap-2 font-normal"
        >
          <Checkbox
            checked={selectedCategories.includes(category.category)}
            onCheckedChange={() => onFilterChange(category.category)}
          />
          {category.category}
        </Label>
      ))}
    </div>
  );
};

export default CategoryFilter;
