import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://wdd430-portfolio-git-main-lil-mills-projects.vercel.app",
  ),
  title: {
    default: "Millen Morn | Project Portfolio",
    template: "%s | Millen Morn Portfolio",
  },
  description:
    "A portfolio of web development projects by Millen Morn, including school and open source projects.",
  openGraph: {
    title: "Millen Morn | Project Portfolio",
    description:
      "A portfolio of web development projects by Millen Morn, including school and open source projects.",
    type: "website",
    url: "https://wdd430-portfolio-git-main-lil-mills-projects.vercel.app",
    siteName: "Millen Morn Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Millen Morn | Project Portfolio",
    description:
      "A portfolio of web development projects by Millen Morn, including school and open source projects.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
