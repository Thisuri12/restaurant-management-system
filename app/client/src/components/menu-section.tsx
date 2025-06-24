"use client";

import { forwardRef } from "react";
import { ItemCard } from "@/components/item-card";
import type { MenuItem, MenuSectionCategory } from "@/lib/types";

interface MenuSectionProps {
  category: MenuSectionCategory;
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
}

export const MenuSection = forwardRef<HTMLElement, MenuSectionProps>(
  ({ category, items, onItemClick }, ref) => {
    if (!items.length) return null;

    return (
      <section
        ref={ref}
        id={`category-${category.id}`}
        className="scroll-mt-32 mb-10"
      >
        <div className="max-w-6xl mx-auto px-2 py-2 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8"></div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {category.name}
          </h2>
          {category.description && (
            <p className="text-gray-600 text-sm">{category.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onClick={() => onItemClick(item)}
            />
          ))}
        </div>
      </section>
    );
  }
);

MenuSection.displayName = "MenuSection";
