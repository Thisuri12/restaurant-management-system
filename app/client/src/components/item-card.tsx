"use client";

import { Plus } from "lucide-react";
import type { MenuItem } from "@/lib/types";
import Image from "next/image";

interface ItemCardProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
}

export function ItemCard({ item, onClick }: ItemCardProps) {
  return (
    <div
      className="w-full max-w-lg h-auto sm:h-[120px] md:h-[150px] lg:h-[190px] bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(item)}
    >
      <div className="flex">
        {/* Item Info */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-md leading-tight">
              {item.name}
            </h3>
          </div>

          <p className="text-gray-600 text-xs mb-3 line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-lg text-gray-900">
              £{item.price.toFixed(2)}
            </span>
            {(item.popular || item.deal) && (
              <span className="px-1.5 py-.5 text-md font-normal text-orange-800 shrink-0">
                {item.popular ? "Popular" : "Deal"}
              </span>
            )}
          </div>
        </div>

        {/* Item Image */}
        <div className="relative w-20 h-20 md:w-32 md:h-32 shrink-0 mt-5 mr-5 mb-5">
          <Image
            src={item.image}
            alt={item.name}
            width={70}
            height={70}
            className="w-full h-full object-cover rounded-sm"
          />

          {/* Button overlayed on bottom-right */}
          <button
            className="absolute -bottom-6 right-1 bg-white text-customGray/20 p-3 rounded-full shadow-md transition-colors"
            onClick={() => onClick(item)}
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
