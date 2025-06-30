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
  const formatTime = (time?: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Use image if available, otherwise null
  const imageSrc = restaurant.image_url?.trim() ? restaurant.image_url : null;

  return (
    <div className="w-full bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto items-start text-left px-0 sm:px-2 md:px-10">
        <div className="mb-4 hidden md:block">
          <Link
            href="https://deliveroo.co.uk/restaurants/london/st-james's?geohash=gcpvj0e56cwp"
            className="inline-flex items-center gap-2 text-lg text-customGreen px-2 py-1 rounded border border-transparent focus:outline-none focus:ring-2 focus:ring-customGreen focus:border-customGreen active:shadow-md transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-2 px-0 py-0 sm:px-2 sm:py-2 md:px-6">
          {/* Image with Start group order button and back button overlayed on mobile */}
          <div className="relative w-full md:w-1/3 h-56 sm:h-72 md:h-auto aspect-auto md:aspect-[16/9] rounded overflow-hidden flex-shrink-0 bg-black">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={restaurant.name}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
            {/* Back button on image for mobile */}
            <Link
              href="https://deliveroo.co.uk/restaurants/london/st-james's?geohash=gcpvj0e56cwp"
              className="absolute top-3 left-3 flex md:hidden items-center justify-center bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-700 shadow w-10 h-10"
            >
              <ArrowLeft className="h-5 w-5 text-customGreen" />
            </Link>
            {/* Start group order button overlayed on image for mobile */}
            <div className="absolute bottom-3 right-3 flex md:hidden">
              <Link
                href="/"
                className="flex items-center px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-sm text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-colors font-thin font-sans w-fit shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-teal-500 dark:text-teal-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>
                <span className="ml-2">Start group order</span>
              </Link>
            </div>
          </div>

          {/* Info on the right */}
          <div className="flex-1 flex flex-col px-2 sm:px-4 md:px-6 py-2 justify-between w-full">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
                {restaurant.name}
              </h1>

              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
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
            <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4 text-xs sm:text-sm">
              <span className="px-3 py-1 text-center whitespace-nowrap bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded">
                Delivery: {restaurant.delivery_fee}
              </span>
              <span className="px-3 py-1 text-center whitespace-nowrap bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded">
                Min order: £
                {restaurant.min_price !== undefined
                  ? restaurant.min_price.toFixed(2)
                  : "N/A"}
              </span>
              <span className="px-3 py-1 text-center whitespace-nowrap bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded">
                30-45 min
              </span>
            </div>
          </div>

          {/* Start group order button for desktop */}
          <div className="hidden md:flex px-6">
            <Link
              href="/"
              className="flex items-center px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-sm text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-colors font-thin font-sans"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-teal-500 dark:text-teal-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
    </div>
  );
}
