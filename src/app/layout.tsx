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
  title: "The Art of Web Development",
  description: "An interactive journey through HTML, CSS, and JavaScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaCode.variable} ${playfair.variable} ${poppins.variable} ${rubikDistressed.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
