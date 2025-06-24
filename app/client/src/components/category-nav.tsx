"use client";

import { cn } from "@/lib/utils";
import type { CategoryNavItem } from "@/lib/types";

interface CategoryNavProps {
  categories: CategoryNavItem[];
  activeCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

export function CategoryNav({
  categories,
  activeCategory,
  onCategoryClick,
}: CategoryNavProps) {
  const scrollToCategory = (categoryId: string) => {
    onCategoryClick(categoryId);

    // Smooth scroll to the category section
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="overflow-x-auto scrollbar-hide">
      <div className="flex space-x-1 px-4 py-3 min-w-max">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => scrollToCategory(category.id)}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
              activeCategory === category.id
                ? "bg-customGreen text-white shadow-sm font-bold"
                : "text-customGreen hover:bg-gray-200 hover:text-gray-900"
            )}
          >
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
