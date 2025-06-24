"use client";

import { RestaurantHeader } from "@/components/restaurant-header";
import { CategoryNav } from "@/components/category-nav";
import { MenuSection } from "@/components/menu-section";
import { CartSummary } from "@/components/cart-summary";
import { ItemModal } from "@/components/item-modal";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useMenuStore } from "@/stores/menu-store";
import { menuData } from "@/lib/mock-data";
import type { MenuItem } from "@/lib/types";
import { useEffect } from "react";

export default function RestaurantMenuPage() {
  const { selectedItem, setSelectedItem, setActiveCategory } = useMenuStore();

  const categoryIds = menuData.categories.map((category) => category.id);

  const { activeCategory, scrollToCategory, setCategoryRef } =
    useScrollSpy(categoryIds);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  // Keep global store in sync with scroll spy
  useEffect(() => {
    setActiveCategory(activeCategory);
  }, [activeCategory, setActiveCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <RestaurantHeader restaurant={menuData.restaurant} />

      {/* Category Navigation - Sticky */}
      <div className="sticky top-[69px] z-40 bg-white border-b border-gray-200">
        <CategoryNav
          categories={menuData.categories.map((cat) => ({
            id: cat.id,
            name: cat.name,
            count: cat.items.length,
          }))}
          activeCategory={activeCategory}
          onCategoryClick={scrollToCategory}
        />
      </div>

      {/* Main Content - 2-column grid */}
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[2fr_2fr] gap-8">
        {/* Left side - Menu Sections */}
        <div className="space-y-8">
          {menuData.categories.map((category) => (
            <MenuSection
              key={category.id}
              ref={setCategoryRef(category.id)}
              category={{
                id: category.id,
                name: category.name,
              }}
              items={category.items}
              onItemClick={handleItemClick}
            />
          ))}
        </div>

        {/* Right side - Cart Summary */}
        <div className="sticky top-[100px]">
          {" "}
          {/* Keeps cart visible when scrolling */}
          <CartSummary />
        </div>
      </div>

      {/* Item Modal */}
      {selectedItem && (
        <ItemModal
          item={selectedItem}
          isOpen={true}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
