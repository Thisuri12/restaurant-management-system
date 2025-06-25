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
}

export const MenuSection = forwardRef<HTMLElement, MenuSectionProps>(
  ({ category, items, onItemClick }, ref) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const isPopularSection =
      category.id === "popular" ||
      category.name.toLowerCase().includes("popular");

    // Check scroll position and update arrow visibility
    const checkScrollPosition = () => {
      if (!scrollRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    };

    useEffect(() => {
      if (!isPopularSection || !scrollRef.current) return;

      checkScrollPosition();
      const handleScroll = () => checkScrollPosition();

      const el = scrollRef.current;
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }, [isPopularSection, items]);

    const scrollLeft = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: -280, behavior: "smooth" });
      }
    };

    const scrollRight = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
      }
    };
    if (!items.length) return null;

    return (
      <section
        ref={ref}
        id={`category-${category.id}`}
        className="scroll-mt-32 mb-10 w-full"
      >
        <div className="mb-6 px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {category.name}
          </h2>
          {category.description && (
            <p className="text-customGray text-sm">{category.description}</p>
          )}
        </div>

        {isPopularSection ? (
          // Horizontal scrolling layout for Popular section with arrows
          <div className="relative w-full">
            {/* Left Arrow */}
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
                aria-label="Scroll left"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
            )}

            {/* Right Arrow */}
            {canScrollRight && (
              <button
                onClick={scrollRight}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
                aria-label="Scroll right"
              >
                <ArrowRight className="h-5 w-5 text-gray-600" />
              </button>
            )}

            {/* Scrollable Container */}
            <div
              ref={scrollRef}
              className="overflow-x-auto scrollbar-hide px-4 max-w-full"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div
                className="flex gap-3 pb-4"
                style={{
                  width: `calc(18rem * 2 + 0.5rem )`,
                }}
              >
                {items.map((item) => (
                  <div key={item.id} className="flex-shrink-0 w-36">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </section>
    );
  }
);

MenuSection.displayName = "MenuSection";
