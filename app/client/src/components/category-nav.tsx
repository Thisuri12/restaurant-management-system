"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { CategoryNavItem } from "@/lib/types";

// Import dropdown components (assuming you're using shadcn/ui or similar)
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

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
  const navCategories = categories.filter(
    (category) =>
      category.name.toLowerCase() !== "popular" && category.id !== "popular"
  );
  // Ref to the nav button container to measure its width
  const navRef = useRef<HTMLDivElement>(null);

  // Track how many categories can fit in visible area
  // Start with a conservative estimate to prevent scrollbar on first load
  const [visibleCount, setVisibleCount] = useState(navCategories.length);

  useEffect(() => {
    // Observe the container width and dynamically calculate how many items fit
    const resizeObserver = new ResizeObserver(() => {
      if (!navRef.current) return;

      const containerWidth = navRef.current.offsetWidth;
      let totalWidth = 0;
      let count = 0;

      // Loop through children and measure width until we exceed the container
      for (const child of navRef.current.children) {
        totalWidth += (child as HTMLElement).offsetWidth;

        // Leave room for "More" dropdown
        if (totalWidth > containerWidth - 200) break;
        count++;
      }

      // Set how many items are visible
      setVisibleCount(count);
    });

    if (navRef.current) {
      resizeObserver.observe(navRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, [navCategories]);

  // Slice category list into visible and hidden parts
  const visibleCategories = navCategories.slice(0, visibleCount);
  const hiddenCategories = navCategories.slice(visibleCount);

  // Scrolls smoothly to the selected category section
  const handleScrollToCategory = (categoryId: string) => {
    onCategoryClick(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const offset = 120; // space for sticky headers
      const top = element.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className="overflow-hidden">
      {/* Horizontal scrollable container for category buttons */}
      <div ref={navRef} className="flex space-x-1 px-4 py-3">
        {/* Render visible category buttons */}
        {visibleCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleScrollToCategory(category.id)}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
              activeCategory === category.id
                ? "bg-customGreen text-white shadow-sm font-bold"
                : "text-customGreen"
            )}
          >
            <span>{category.name}</span>
          </button>
        ))}

        {/* If there are hidden categories, show a dropdown menu */}
        {hiddenCategories.length > 0 && (
          <DropdownMenu>
            {/* Button to trigger dropdown */}
            <DropdownMenuTrigger className="px-4 py-2 text-sm font-medium text-customGreen rounded-full focus:outline-none focus:ring-2 focus:ring-customGreen focus:border-customGreen active:shadow-md transition focus:ring-offset-1 data-[state=open]:ring-2 data-[state=open]:ring-customGreen">
              More
            </DropdownMenuTrigger>

            {/* Dropdown content listing hidden categories */}
            <DropdownMenuContent align="end">
              {hiddenCategories.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => handleScrollToCategory(category.id)}
                  className={cn(
                    activeCategory === category.id
                      ? "font-bold text-customGreen bg-white"
                      : "",
                    "bg-white cursor-pointer hover:bg-gray-50	"
                  )}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}
