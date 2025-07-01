"use client";

import { forwardRef, useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ItemCard } from "@/components/item-card";
import { ItemCardPopular } from "@/components/item-card-popular";
import type { MenuItem, MenuSectionCategory } from "@/lib/types";

interface MenuSectionProps {
  category: MenuSectionCategory;
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
  // Prop to pass all items from all categories
  allItems?: MenuItem[];
  // Prop to identify if this is the popular section
  isPopularSection?: boolean;
}

export const MenuSection = forwardRef<HTMLElement, MenuSectionProps>(
  (
    { category, items, onItemClick, allItems = [], isPopularSection = false },
    ref
  ) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Get popular items from all categories if this is the popular section
    const popularItems = isPopularSection
      ? allItems.filter((item) => item.popular === true)
      : items;

    // Check scroll position and update arrow visibility
    const checkScrollPosition = () => {
      if (!scrollRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    };

    useEffect(() => {
      if (!isPopularSection || !scrollRef.current) return;

      const timeoutId = setTimeout(() => {
        checkScrollPosition();
      }, 100);

      const handleScroll = () => checkScrollPosition();
      const handleResize = () => checkScrollPosition();

      const el = scrollRef.current;
      el.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);

      return () => {
        clearTimeout(timeoutId);
        el?.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    }, [isPopularSection, popularItems]);

    const scrollLeft = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
      }
    };

    const scrollRight = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
      }
    };

    // Hide section if no items to show
    const itemsToShow = isPopularSection ? popularItems : items;
    if (!itemsToShow.length) return null;

    return (
      <section
        ref={ref}
        id={`category-${category.id}`}
        className="scroll-mt-[140px] mb-4 w-full"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 px-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {category.name}
            </h2>
          </div>

          {isPopularSection ? (
            <div className="relative w-full">
              {/* Left Arrow */}
              {canScrollLeft && (
                <button
                  onClick={scrollLeft}
                  className="hidden sm:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-900 shadow-lg rounded-full p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
                  aria-label="Scroll left"
                >
                  <ArrowLeft className="h-6 w-6 text-customGreen" />
                </button>
              )}

              {/* Right Arrow */}
              {canScrollRight && (
                <button
                  onClick={scrollRight}
                  className="hidden sm:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-900 shadow-lg rounded-full p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
                  aria-label="Scroll right"
                >
                  <ArrowRight className="h-6 w-6 text-customGreen" />
                </button>
              )}

              {/* Scrollable Container */}
              <div
                ref={scrollRef}
                className="overflow-x-auto scrollbar-hide px-4 h-[300px] sm:h-[300px] lg:h-[320px] 3xl:h-[420px] max-h-[300px] sm:max-h-[300px] lg:max-h-[320px] 3xl:max-h-[420px] bg-white dark:bg-gray-900 rounded-sm"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div className="flex gap-4 pb-4 w-max">
                  {popularItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex-shrink-0 w-[100px] h-[200px] sm:w-[140px] sm:h-[250px] lg:w-[120px] lg:h-[300px] 3xl:w-[200px] 3xl:h-[400px]"
                    >
                      <ItemCardPopular
                        item={item}
                        onClick={() => onItemClick(item)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Regular vertical grid layout for other categories
            <div className="px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 gap-4">
                {items.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onClick={() => onItemClick(item)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
);

MenuSection.displayName = "MenuSection";
