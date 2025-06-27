"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { fetchRestaurantById } from "@/lib/api";
import { RestaurantHeader } from "@/components/restaurant-header";
import { CategoryNav } from "@/components/category-nav";
import { MenuSection } from "@/components/menu-section";
import { CartSummary } from "@/components/cart-summary";
import { ItemModal } from "@/components/item-modal";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useMenuStore } from "@/stores/menu-store";
import type { MenuItem, MenuSectionCategory, Restaurant } from "@/lib/types";

export default function RestaurantMenuPage() {
  const { id } = useParams();
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null);

  const { selectedItem, setSelectedItem, setActiveCategory } = useMenuStore();

  // Fetch restaurant data when ID is available
  useEffect(() => {
    if (!id) return;
    fetchRestaurantById(id as string)
      .then(setRestaurantData)
      .catch((err) => console.error("Failed to fetch restaurant:", err));
  }, [id]);

  // Use data from API instead of mock
  const allItems = useMemo(() => {
    if (!restaurantData?.categories) return [];
    return restaurantData.categories
      .flatMap((cat) => cat.items ?? [])
      .filter((item): item is MenuItem => !!item);
  }, [restaurantData]);

  const popularItems = useMemo(
    () => allItems.filter((item): item is MenuItem => !!item && !!item.popular),
    [allItems]
  );

  const hasPopularItems = popularItems.length > 0;

  const popularCategory: MenuSectionCategory | null = hasPopularItems
    ? {
        id: "popular-section",
        name: "Popular with others",
        description: "Customer favorites from across our menu",
      }
    : null;

  const categoryIds = useMemo(() => {
    if (!restaurantData?.categories) return [];
    const ids = restaurantData.categories.map((cat) => cat.id);
    return hasPopularItems ? ["popular-section", ...ids] : ids;
  }, [restaurantData, hasPopularItems]);

  const { activeCategory, scrollToCategory, setCategoryRef } =
    useScrollSpy(categoryIds);

  useEffect(() => {
    setActiveCategory(activeCategory);
  }, [activeCategory, setActiveCategory]);

  // Use categories from API instead of menuData
  const navCategories = useMemo(() => {
    if (!restaurantData?.categories) return [];
    const base = restaurantData.categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      count: cat.items?.length ?? 0,
    }));
    return hasPopularItems
      ? [
          {
            id: "popular-section",
            name: "Popular",
            count: popularItems.length,
          },
          ...base,
        ]
      : base;
  }, [restaurantData, popularItems.length, hasPopularItems]);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  // Loading fallback
  if (!restaurantData) {
    return <p className="p-4 text-center">Loading restaurant...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <RestaurantHeader restaurant={restaurantData} />

      <div className="sticky top-[58px] md:top-[75px] z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <CategoryNav
          categories={navCategories}
          activeCategory={activeCategory}
          onCategoryClick={scrollToCategory}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* Menu */}
          <div className="space-y-8 min-w-0">
            {/* Conditional render for popular section */}
            {hasPopularItems && popularCategory && (
              <MenuSection
                key="popular-section"
                ref={setCategoryRef("popular-section")}
                category={popularCategory}
                items={popularItems}
                allItems={allItems}
                isPopularSection
                onItemClick={handleItemClick}
              />
            )}

            {/* Render dynamic categories and items */}
            {(restaurantData.categories ?? []).map((category) => (
              <MenuSection
                key={category.id}
                ref={setCategoryRef(category.id)}
                category={{ id: category.id, name: category.name }}
                items={category.items ?? []}
                allItems={allItems}
                isPopularSection={false}
                onItemClick={handleItemClick}
              />
            ))}
          </div>

          {/* Cart */}
          <div className="lg:sticky lg:top-[150px] lg:self-start lg:max-h-[calc(100vh-170px)] lg:overflow-y-auto">
            <CartSummary />
          </div>
        </div>
      </div>

      {/* Item Modal */}
      {selectedItem && (
        <ItemModal item={selectedItem} isOpen onClose={handleCloseModal} />
      )}
    </div>
  );
}
