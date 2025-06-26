"use client";

import { RestaurantHeader } from "@/components/restaurant-header";
import { CategoryNav } from "@/components/category-nav";
import { MenuSection } from "@/components/menu-section";
import { CartSummary } from "@/components/cart-summary";
import { ItemModal } from "@/components/item-modal";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useMenuStore } from "@/stores/menu-store";
import { menuData } from "@/lib/mock-data";
import type { MenuItem, MenuSectionCategory } from "@/lib/types";
import { useEffect, useMemo } from "react";

export default function RestaurantMenuPage() {
  const { selectedItem, setSelectedItem, setActiveCategory } = useMenuStore();

  // Get all items from all categories
  const allItems = useMemo(() => {
    return menuData.categories.flatMap((category) => category.items);
  }, []);

  // Check if there are any popular items across all categories
  const popularItems = useMemo(() => {
    return allItems.filter((item) => item.popular === true);
  }, [allItems]);

  const hasPopularItems = popularItems.length > 0;

  // Create a virtual popular category only if there are popular items
  const popularCategory: MenuSectionCategory | null = hasPopularItems
    ? {
        id: "popular-section",
        name: "Popular with others",
        description: "Customer favorites from across our menu",
      }
    : null;

  // Create category IDs - include popular section only if it exists
  const categoryIds = useMemo(() => {
    const regularCategoryIds = menuData.categories.map(
      (category) => category.id
    );
    return hasPopularItems
      ? ["popular-section", ...regularCategoryIds]
      : regularCategoryIds;
  }, [hasPopularItems]);

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

  // Create navigation items - include popular section only if it exists
  const navCategories = useMemo(() => {
    const regularCategories = menuData.categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      count: cat.items.length,
    }));

    if (hasPopularItems) {
      return [
        {
          id: "popular-section",
          name: "Popular",
          count: popularItems.length,
        },
        ...regularCategories,
      ];
    }

    return regularCategories;
  }, [hasPopularItems, popularItems.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <RestaurantHeader restaurant={menuData.restaurant} />

      {/* Category Navigation - Sticky */}
      <div className="sticky top-[58px] md:top-[75px] z-40 bg-white border-b border-gray-200">
        <CategoryNav
          categories={navCategories}
          activeCategory={activeCategory}
          onCategoryClick={scrollToCategory}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* Left side - Scrollable menu */}
          <div className="space-y-8 min-w-0">
            {/* Popular Section - Only render if there are popular items */}
            {hasPopularItems && popularCategory && (
              <MenuSection
                key="popular-section"
                ref={setCategoryRef("popular-section")}
                category={popularCategory}
                items={[]} // Empty since we're using allItems for popular
                allItems={allItems}
                isPopularSection={true}
                onItemClick={handleItemClick}
              />
            )}

            {/* Regular Categories */}
            {menuData.categories.map((category) => (
              <MenuSection
                key={category.id}
                ref={setCategoryRef(category.id)}
                category={{
                  id: category.id,
                  name: category.name,
                }}
                items={category.items}
                allItems={allItems}
                isPopularSection={false}
                onItemClick={handleItemClick}
              />
            ))}
          </div>

          {/* Right side - Cart Summary (Sticky) */}
          <div className="lg:sticky lg:top-[150px] lg:self-start lg:max-h-[calc(100vh-170px)] lg:overflow-y-auto">
            <CartSummary />
          </div>
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
