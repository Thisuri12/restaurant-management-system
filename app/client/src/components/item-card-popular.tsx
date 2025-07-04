"use client";

import { Plus } from "lucide-react";
import type { MenuItem } from "@/lib/types";
import Image from "next/image";

interface ItemCardProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
}

export function ItemCardPopular({ item, onClick }: ItemCardProps) {
  const imageSrc = item.image_url?.trim() || null;

  return (
    <div
      className="w-[100px] h-[300px] lg:w-[120px] lg:h-[300px] 3xl:w-[200px] 3xl:h-[400px] bg-white dark:bg-gray-900 rounded-sm dark:rounded-xs shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer flex flex-col"
      onClick={() => onClick(item)}
    >
      {/* Item Image */}
      <div className="relative w-[100px] lg:w-[120px] 3xl:w-[200px] h-[100px] lg:h-[120px] 3xl:h-[200px]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={item.name}
            fill
            className="object-cover rounded-sm"
            sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-sm flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}

        {/* Button overlayed on bottom-right */}
        <button
          className="absolute -bottom-3 right-1 bg-white dark:bg-gray-900 text-customGray/20 dark:text-gray-400 p-3 rounded-full shadow-md transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onClick(item);
          }}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        {/* Item Info */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight">
              {item.name}
            </h3>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-xs mb-3 line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-sm text-gray-900 dark:text-gray-100">
            £{item.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
