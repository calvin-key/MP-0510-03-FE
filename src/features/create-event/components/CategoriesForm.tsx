import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const predefinedCategories = [
  "Music",
  "Nightlife",
  "Performing & Visual Arts",
  "Holiday",
  "Business",
  "Food & Drink",
];

const CategoriesForm = () => {
  const [categories, setCategories] = useState<string[]>([""]);

  const handleAddCategory = () => {
    setCategories([...categories, ""]);
  };

  const handleCategoryChange = (index: number, value: string) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = value;
    setCategories(updatedCategories);
  };

  const handleRemoveCategory = (index: number) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>Event Categories</Label>
      {categories.map((category, index) => (
        <div key={index} className="flex items-center gap-4">
          <Select
            onValueChange={(value) => handleCategoryChange(index, value)}
            value={category}
          >
            <SelectTrigger className="w-3/4 bg-white">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              {predefinedCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="ghost"
            className="text-red-500"
            onClick={() => handleRemoveCategory(index)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="default"
        className="w-fit px-10"
        onClick={handleAddCategory}
      >
        Add Category
      </Button>
    </div>
  );
};

export default CategoriesForm;
