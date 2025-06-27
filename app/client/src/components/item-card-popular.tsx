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
      className="w-[100px] h-[300px] lg:w-[120px] lg:h-[300px] 3xl:w-[200px] 3xl:h-[400px] bg-white rounded-xs shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer flex flex-col"
      onClick={() => onClick(item)}
    >
      {/* Item Image */}
      <div className="relative w-[100px] lg:w-[120px] 3xl:w-[200px] h-[100px] lg:h-[120px] 3xl:h-[200px]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded-t-sm"
          sizes="(max-width: 640px) 200px, (max-width: 1024px) 300px, 400px"
        />

        {/* Button overlayed on bottom-right */}
        <button
          className="absolute -bottom-3 right-1 bg-white text-customGray/20 p-3 rounded-full shadow-md transition-colors"
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
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">
              {item.name}
            </h3>
          </div>

          <p className="text-gray-600 text-xs mb-3 line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-sm text-gray-900">
            £{item.price.toFixed(2)}
            {(item.popular || item.deal) && (
              <>
                .{" "}
                <span className="text-sm font-normal text-orange-800">
                  {item.popular ? "Popular" : "Deal"}
                </span>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
