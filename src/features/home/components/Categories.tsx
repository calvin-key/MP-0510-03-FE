import React, { useState } from "react";
import {
  Guitar,
  Sparkles,
  Brush,
  CalendarFold,
  Building2,
  HandPlatter,
} from "lucide-react";

const Categories = ({ onSelectCategory }: { onSelectCategory: (category: string) => void }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: "Music", icon: <Guitar size={55} color="#000000" strokeWidth={0.5} /> },
    { name: "Nightlife", icon: <Sparkles size={55} color="#000000" strokeWidth={0.5} /> },
    { name: "Performing & Visual Arts", icon: <Brush size={55} color="#000000" strokeWidth={0.5} /> },
    { name: "Holiday", icon: <CalendarFold size={55} color="#000000" strokeWidth={0.5} /> },
    { name: "Business", icon: <Building2 size={55} color="#000000" strokeWidth={0.5} /> },
    { name: "Food & Drink", icon: <HandPlatter size={55} color="#000000" strokeWidth={0.5} /> },
  ];

  const handleCategoryClick = (category: string) => {
    const newSelection = selectedCategory === category ? null : category; // Toggle selection
    setSelectedCategory(newSelection);
    onSelectCategory(newSelection || ""); // Pass to parent (empty string for deselection)
  };

  return (
    <section>
      <div className="container mx-auto mt-6 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-12">
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            className={`flex flex-col items-center justify-between rounded-lg border-[1px] p-4 cursor-pointer transition ${
              selectedCategory === category.name
                ? "bg-orange-300 shadow-lg"
                : "border-orange-200 hover:bg-orange-200"
            }`}
          >
            {category.icon}
            <h4 className="text-center text-sm font-semibold">{category.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
