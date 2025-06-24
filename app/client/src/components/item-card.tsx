"use client";

import { Plus } from "lucide-react";
import { useMenuStore } from "@/stores/menu-store";
import type { MenuItem } from "@/lib/types";
import Image from "next/image";

interface ItemCardProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
}

export function ItemCard({ item, onClick }: ItemCardProps) {
  const { addToCart } = useMenuStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item, 1);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(item)}
    >
      <div className="flex">
        {/* Item Info */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-lg leading-tight">
              {item.name}
            </h3>
            {(item.popular || item.deal) && (
              <span className="ml-2 px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full shrink-0">
                {item.popular ? "Popular" : "Deal"}
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              £{item.price.toFixed(2)}
            </span>

            <button
              onClick={handleAddToCart}
              className="bg-customGreen text-white p-2 rounded-full transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Item Image */}
        <div className="w-24 h-24 md:w-32 md:h-32 shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
