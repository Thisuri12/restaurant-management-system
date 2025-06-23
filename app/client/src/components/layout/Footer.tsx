import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-customGray text-white py-6 px-4 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          {/* Discover Deliveroo */}
          <div className="bg-customGray1 rounded-sm p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-2">
              Discover Deliveroo
            </h3>
            <nav className="space-y-3">
              <Link
                href="/investors"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Investors
              </Link>
              <Link
                href="/about"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                About us
              </Link>
              <Link
                href="/takeaway"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Takeaway
              </Link>
              <Link
                href="/more"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                More
              </Link>
              <Link
                href="/newsroom"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Newsroom
              </Link>
              <Link
                href="/engineering"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Engineering blog
              </Link>
              <Link
                href="/design"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Design blog
              </Link>
              <Link
                href="/gift-cards"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Gift Cards
              </Link>
              <Link
                href="/students"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Deliveroo Students
              </Link>
              <Link
                href="/careers"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Careers
              </Link>
              <Link
                href="/restaurant-signup"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Restaurant signup
              </Link>
              <Link
                href="/become-rider"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Become a rider
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="bg-customGray1 rounded-sm p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Legal</h3>
            <nav className="space-y-3">
              <Link
                href="/terms"
                className=" text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Terms and conditions
              </Link>
              <Link
                href="/privacy"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Cookies
              </Link>
              <Link
                href="/modern-slavery"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Modern Slavery Statement
              </Link>
              <Link
                href="/tax-strategy"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Tax Strategy
              </Link>
              <Link
                href="/section-172"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Section 172 Statement
              </Link>
              <Link
                href="/public-authority"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Public Authority Requests
              </Link>
            </nav>
          </div>

          {/* Help */}
          <div className="bg-customGray1 rounded-sm p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Help</h3>
            <nav className="space-y-3">
              <Link
                href="/contact"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Contact
              </Link>
              <Link
                href="/faqs"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                FAQs
              </Link>
              <Link
                href="/cuisines"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Cuisines
              </Link>
              <Link
                href="/brands"
                className="text-sm block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Brands
              </Link>
            </nav>
          </div>

          {/* Take Deliveroo with you */}
          <div className="bg-customGray1 rounded-sm p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-2">
              Take Deliveroo with you
            </h3>
            <div className="space-y-1">
              {/* App Store Button */}
              <Link
                href="https://deliveroo.co.uk/app-download?af_web_dp=https%3A%2F%2Fdeliveroo.co.uk%2Fen%2Fapp%3Fdesktop%3D1"
                className="block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="rounded-xs flex items-center">
                  <div className="flex items-center">
                    <Image
                      src="/app-apple.png"
                      width={140}
                      height={42}
                      alt="Download on the App Store"
                      className="w-36 h-auto"
                    />
                  </div>
                </div>
              </Link>

              {/* Google Play Button */}
              <Link
                href="https://deliveroo.co.uk/app-download?af_web_dp=https%3A%2F%2Fdeliveroo.co.uk%2Fen%2Fapp%3Fdesktop%3D1"
                className="block "
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="rounded-xs flex items-center">
                  <div className="flex items-center -ml-3">
                    <Image
                      src="/app-android.png"
                      width={140}
                      height={42}
                      alt="Get it on Google Play"
                      className="w-44 h-auto"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Media Icons */}
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link
                href="https://web.facebook.com/"
                className="text-gray-400 hover:text-[#1877F2] transition-colors duration-300"
              >
                <span className="sr-only">Facebook</span>
                <FaFacebook className="w-6 h-6" />
              </Link>
              <Link
                href="https://x.com/"
                className="text-gray-400 hover:text-[#1DA1F2] transition-colors duration-300"
              >
                <span className="sr-only">Twitter</span>
                <FaTwitter className="w-6 h-6" />
              </Link>
              <Link
                href="https://www.instagram.com/"
                className="text-gray-400 hover:text-[#E1306C] transition-colors duration-300"
              >
                <span className="sr-only">Instagram</span>
                <FaInstagram className="w-6 h-6" />
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-600">© 2025 Deliveroo</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
