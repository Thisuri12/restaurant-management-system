"use client";

import { Plus } from "lucide-react";
import type { MenuItem } from "@/lib/types";
import Image from "next/image";

interface ItemCardProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
}

export function ItemCard({ item, onClick }: ItemCardProps) {
  const imageSrc = item.image_url?.trim() || null;

  return (
    <div
      className="w-full max-w-lg h-auto 3xl:h-[180px] bg-white dark:bg-gray-900 rounded-sm shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(item)}
    >
      <div className="flex items-stretch">
        {/* Item Info */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-md leading-tight">
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
              {(item.popular || item.deal) && (
                <>
                  .{" "}
                  <span className="text-sm font-normal text-orange-800 dark:text-orange-300">
                    {item.popular ? "Popular" : "Deal"}
                  </span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* Item Image */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 shrink-0 my-3 mr-3 sm:my-5 sm:mr-5 flex items-center">
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
            className="absolute -bottom-3 -right-3 bg-white dark:bg-gray-900 text-customGray/20 dark:text-gray-400 p-3 rounded-full shadow-md transition-colors"
            onClick={() => onClick(item)}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
