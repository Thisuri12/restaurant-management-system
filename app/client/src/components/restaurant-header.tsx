"use client";

import { Clock, MapPin, Star } from "lucide-react";
import type { Restaurant } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface RestaurantHeaderProps {
  restaurant: Restaurant;
}

export function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="max-w-8xl px-4 md:px-6 py-1 items-start text-left">
      <div className="mb-4">
        <Link
          href="https://deliveroo.co.uk/restaurants/london/st-james's?geohash=gcpvj0e56cwp"
          className="inline-flex items-center gap-2 text-lg text-customGreen px-2 py-1 rounded border border-transparent focus:outline-none focus:ring-2 focus:ring-customGreen focus:border-customGreen active:shadow-md transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Image on the left */}
        <div className="relative w-full md:w-1/3 aspect-[16/9] rounded overflow-hidden flex-shrink-0">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Info on the right */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {restaurant.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{restaurant.location}</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>
                  {formatTime(restaurant.open_time)} -{" "}
                  {formatTime(restaurant.close_time)}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>4.8 (500+ reviews)</span>
              </div>
            </div>
          </div>

          {/* Delivery info badges */}
          <div className="flex gap-4 text-sm">
            <span className=" px-3 py-1 text-center whitespace-nowrap">
              Delivery: {restaurant.deliveryFee}
            </span>
            <span className="px-3 py-1 text-center whitespace-nowrap">
              Min order: £{restaurant.min_price.toFixed(2)}
            </span>
            <span className="px-3 py-1 text-center whitespace-nowrap">
              30-45 min
            </span>
          </div>
        </div>
        <div className="px-6">
          <Link
            href="/"
            className="flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors font-thin font-sans"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-teal-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>
            <span className="hidden md:inline">Start group order</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
