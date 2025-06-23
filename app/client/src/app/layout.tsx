import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Sora } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // You can customize these
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Deliveroo",
    default: "Deliveroo - Food Delivery",
  },
  description: "Order food online from your favorite restaurants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} font-sora antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
