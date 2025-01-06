import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const predefinedCategories = [
  "Music",
  "Nightlife",
  "Performing & Visual Arts",
  "Holiday",
  "Business",
  "Food & Drink",
] as const;

interface CategoriesFormProps {
  values: string[];
  setFieldValue: (field: string, value: string[]) => void;
}

const CategoriesForm = ({ values, setFieldValue }: CategoriesFormProps) => {
  const handleAddCategory = () => {
    setFieldValue("categories", [...values, ""]);
  };

  const handleCategoryChange = (index: number, value: string) => {
    const updatedCategories = [...values];
    updatedCategories[index] = value;
    setFieldValue("categories", updatedCategories);
  };

  const handleRemoveCategory = (index: number) => {
    setFieldValue("categories", values.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>Event Categories</Label>
      {values.map((category, index) => (
        <div key={index} className="flex items-center gap-4">
          <Select
            value={category}
            onValueChange={(value) => handleCategoryChange(index, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {predefinedCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="ghost"
            onClick={() => handleRemoveCategory(index)}
            className="text-red-500"
          >
            Remove
          </Button>
        </div>
      ))}
      <Button 
        type="button" 
        variant="default" 
        className="w-fit" 
        onClick={handleAddCategory}
      >
        Add Category
      </Button>
    </div>
  );
};

export default CategoriesForm;
