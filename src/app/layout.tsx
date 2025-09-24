import type { Metadata } from "next";
import { Inter, Lora, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { aboutMe } from "@/data/aboutme";
import { customMetadata } from "@/data/title-description";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora", 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: customMetadata.title || aboutMe.name,
  description: customMetadata.description || aboutMe.description,
  icons: {
    icon: "/favicon.ico",
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
        className={`${inter.variable} ${lora.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <main className="">{children}</main>
        <footer className="border-t border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto px-6 py-8 text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} {aboutMe.name}.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}