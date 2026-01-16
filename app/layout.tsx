import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apex Dashboard",
  description: "Built by Proximaz Holdings",

  openGraph: {
    title: "Apex Dashboard",
    description: "Built by Proximaz Holdings",
    url: "https://proximaz-apex-waitlist.vercel.app/",
    siteName: "Apex",
    images: [
      {
        url: "/big.png", 
        width: 1200,
        height: 630,
        alt: "Apex Dashboard",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Apex Dashboard",
    description: "Built by Proximaz Holdings",
    images: ["/big.png"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
