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
      className="w-36 h-auto sm:h-[200px] md:h-[300px] lg:h-[350px] bg-white rounded-xs shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer flex flex-col"
      onClick={() => onClick(item)}
    >
      {/* Item Image*/}
      <div className="relative w-20 h-20 md:w-36 md:h-36 shrink-0 mb-5 rounded-sm overflow-hidden">
        <Image src={item.image} alt={item.name} fill className="object-cover" />

        {/* Button overlayed on bottom-right */}
        <button
          className="absolute -bottom-3 right-1 bg-white text-customGray/20 p-3 rounded-full shadow-md transition-colors"
          onClick={() => onClick(item)}
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      {/* Item Info */}
      <div className="px-2 pb-2 flex-1 flex flex-col">
        <div className="mb-1">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight text-left">
            {item.name}
          </h3>
        </div>

        <p className="text-gray-600 text-xs mb-2 line-clamp-2 flex-1">
          {item.description}
        </p>

        <div className="text-left">
          <span className="text-base text-gray-900 font-medium">
            £{item.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
