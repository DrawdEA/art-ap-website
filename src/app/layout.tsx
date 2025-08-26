import type { Metadata } from "next";
import { Inter, Fira_Code, Playfair_Display, Poppins, Rubik_Distressed } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const firaCode = Fira_Code({ 
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap"
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

const poppins = Poppins({ 
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap"
});

const rubikDistressed = Rubik_Distressed({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rubik-distressed",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "A Tribute to WebDev",
    template: "%s | A Tribute to WebDev"
  },
  description: "An interactive art appreciation essay exploring the artistic nature of web development through HTML, CSS, and JavaScript. Experience coding as art through an immersive journey.",
  keywords: [
    "web development",
    "art appreciation", 
    "HTML",
    "CSS", 
    "JavaScript",
    "interactive essay",
    "coding as art",
    "web design",
    "frontend development",
    "creative coding"
  ],
  authors: [{ name: "Edward Joshua M. Diesta" }],
  creator: "Edward Joshua M. Diesta",
  publisher: "Edward Joshua M. Diesta",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://artap.diesta.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://artap.diesta.dev',
    siteName: 'A Tribute to WebDev',
    title: 'A Tribute to WebDev',
    description: 'An interactive art appreciation essay exploring the artistic nature of web development through HTML, CSS, and JavaScript.',
    images: [
      {
        url: '/og-image.png', // You'll need to create this image
        width: 1200,
        height: 630,
        alt: 'A Tribute to WebDev',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@your-twitter-handle', // Replace with your Twitter handle
    creator: '@your-twitter-handle', // Replace with your Twitter handle
    title: 'A Tribute to WebDev',
    description: 'An interactive art appreciation essay exploring the artistic nature of web development through HTML, CSS, and JavaScript.',
    images: ['/og-image.png'], // Same as Open Graph image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with your Google Search Console verification code
    yandex: 'your-yandex-verification-code', // Optional: Replace with your Yandex verification code
    yahoo: 'your-yahoo-verification-code', // Optional: Replace with your Yahoo verification code
  },
  category: 'technology',
  classification: 'educational',
  other: {
    'theme-color': '#000000',
    'color-scheme': 'dark',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'A Tribute to WebDev',
    'application-name': 'A Tribute to WebDev',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
      </head>
      <body className={`${inter.variable} ${firaCode.variable} ${playfair.variable} ${poppins.variable} ${rubikDistressed.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
