"use client";

import { Plus } from "lucide-react";
import type { MenuItem } from "@/lib/types";
import Image from "next/image";

interface ItemCardProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
}

export function ItemCardPopular({ item, onClick }: ItemCardProps) {
  return (
    <div
      className="w-24 h-48 sm:w-28 sm:h-56 md:w-32 md:h-64 lg:w-36 lg:h-72 bg-white rounded-xs shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer flex flex-col"
      onClick={() => onClick(item)}
    >
      {/* Item Image - Centered */}
      <div className="relative w-full h-20 sm:h-24 md:h-28 lg:h-32 shrink-0 mb-3 rounded-sm overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Button overlayed on bottom-right */}
        <button
          className="absolute -bottom-3 right-1 bg-white text-customGray/20 p-3 rounded-full shadow-md transition-colors"
          onClick={() => onClick(item)}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Item Info */}
      <div className="px-2 pb-2 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight text-left">
            {item.name}
          </h3>
        </div>
        <div className="mt-auto text-left">
          <span className="text-sm sm:text-base text-gray-900 font-medium">
            £{item.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
