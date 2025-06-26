"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { CategoryNavItem } from "@/lib/types";
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
  const navRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(navCategories.length);

  // Track screen size for responsive logic
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    // Function to check if screen is desktop
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 640);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setVisibleCount(navCategories.length); // Show all on mobile
      return;
    }

    let debounceTimeout: NodeJS.Timeout | null = null;
    let lastCount = visibleCount;

    const handleResize = () => {
      if (!navRef.current) return;
      const containerWidth = navRef.current.offsetWidth;
      let totalWidth = 0;
      let count = 0;
      for (const child of navRef.current.children) {
        totalWidth += (child as HTMLElement).offsetWidth;
        if (totalWidth > containerWidth - 200) break;
        count++;
      }
      // Only update if the count changes by more than 1
      if (Math.abs(count - lastCount) > 1) {
        setVisibleCount(count);
        lastCount = count;
      }
    };

    const observer = new ResizeObserver(() => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(handleResize, 250); // longer debounce
    });

    if (navRef.current) {
      observer.observe(navRef.current);
    }

    // Initial calculation
    handleResize();

    return () => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navCategories, isDesktop]);

  // On mobile, show all; on desktop, use visibleCount
  const visibleCategories = isDesktop
    ? navCategories.slice(0, visibleCount)
    : navCategories;
  const hiddenCategories = isDesktop ? navCategories.slice(visibleCount) : [];

  const handleScrollToCategory = (categoryId: string) => {
    onCategoryClick(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const activeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Only auto-scroll on mobile
    if (window.innerWidth < 640 && activeButtonRef.current) {
      activeButtonRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeCategory]);

  // Find the active hidden category (if any)
  const activeHiddenCategory = hiddenCategories.find(
    (category) => category.id === activeCategory
  );
  const isActiveHidden = Boolean(activeHiddenCategory); // ➕ NEW: check if "More" button should be highlighted

  // Dropdown open state for arrow icon
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
        <div
          ref={navRef}
          className="flex items-center space-x-1 py-3 overflow-x-auto scrollbar-hide"
        >
          {/* Visible categories */}
          {visibleCategories.map((category) => (
            <button
              key={category.id}
              ref={(el) => {
                if (activeCategory === category.id)
                  activeButtonRef.current = el;
              }}
              onClick={() => handleScrollToCategory(category.id)}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                activeCategory === category.id
                  ? "bg-customGreen text-white shadow-sm font-bold h-6"
                  : "text-customGreen h-6"
              )}
            >
              <span>{category.name}</span>
            </button>
          ))}

          {/* Show More button only on desktop (sm and up) */}
          {hiddenCategories.length > 0 && (
            <div className="hidden sm:block">
              <DropdownMenu onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-customGreen focus:border-customGreen active:shadow-md transition focus:ring-offset-1 flex items-center gap-1",
                    isActiveHidden
                      ? "bg-customGreen text-white shadow-sm font-bold"
                      : "text-customGreen"
                  )}
                >
                  {/* Show active hidden name or "More" */}
                  {isActiveHidden ? activeHiddenCategory!.name : "More"}
                  {dropdownOpen ? (
                    // Arrow up
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 15l-7-7-7 7"
                      />
                    </svg>
                  ) : (
                    // Arrow down
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {hiddenCategories.map((category) => (
                    <DropdownMenuItem
                      key={category.id}
                      onClick={() => handleScrollToCategory(category.id)}
                      className={cn(
                        activeCategory === category.id
                          ? "font-bold text-customGreen bg-white"
                          : "",
                        "bg-white cursor-pointer hover:bg-gray-50"
                      )}
                    >
                      {category.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
