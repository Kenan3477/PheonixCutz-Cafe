import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Outfit } from "next/font/google";
import { Footer, Header, MobileDock } from "@/components/Chrome";
import { site } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://phoenixcutzcafe.co.uk"),
  title: {
    default: "Phoenix Cutz & Cafe · Winton, Bournemouth",
    template: "%s · Phoenix Cutz & Cafe",
  },
  description: site.description,
  openGraph: {
    title: "Phoenix Cutz & Cafe",
    description: site.description,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/images/real/breakfast-full-english-mushrooms.jpg",
        width: 3072,
        height: 4096,
        alt: "Full English at Phoenix Cafe",
      },
    ],
  },
  icons: {
    icon: "/images/real/phoenix-logo-profile.jpg",
    apple: "/images/real/phoenix-logo-profile.jpg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CafeOrCoffeeShop",
      name: "Phoenix Cutz & Cafe",
      image: "/images/real/breakfast-full-english-mushrooms.jpg",
      telephone: site.phoneTel,
      url: "https://phoenixcutzcafe.co.uk",
      servesCuisine: ["Breakfast", "Cafe"],
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.line1,
        addressLocality: site.address.city,
        postalCode: site.address.postcode,
        addressCountry: "GB",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.address.lat,
        longitude: site.address.lng,
      },
      sameAs: [site.instagram, site.facebook],
    },
    {
      "@type": "HairSalon",
      name: "Phoenix Turkish Barber",
      telephone: site.phoneTel,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.line1,
        addressLocality: site.address.city,
        postalCode: site.address.postcode,
        addressCountry: "GB",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${outfit.variable} ${display.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#kitchen"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-gold focus:px-3 focus:py-2 focus:text-paper"
        >
          Skip to food
        </a>
        <Header />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileDock />
      </body>
    </html>
  );
}
