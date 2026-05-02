import type { Metadata } from "next";
import { Poppins, Patrick_Hand } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const patrickHand = Patrick_Hand({
  variable: "--font-patrick-hand",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hbfhaiti.org"),
  title: "Haiti Bright Futures | Scholarships and youth opportunities in Haiti",
  description:
    "Haiti Bright Futures creates opportunities for students in Haiti through scholarships, sports, and youth development programs.",
  openGraph: {
    title: "Haiti Bright Futures",
    description:
      "Building brighter futures for Haitian youth through scholarships, sports, and youth programs.",
    url: "https://hbfhaiti.org",
    siteName: "Haiti Bright Futures",
    images: [
      {
        url: "/images/logo-hbf-01.png",
        width: 1200,
        height: 630,
        alt: "Logo Haiti Bright Futures",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${patrickHand.variable} h-full scroll-smooth`}>
      <body className="min-h-full font-sans text-hbf-dark">
        {children}
      </body>
    </html>
  );
}
