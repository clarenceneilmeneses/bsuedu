import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";
import "./globals.css";

const body = Geist({ variable: "--font-body", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
const display = Fraunces({ variable: "--font-display", subsets: ["latin"], axes: ["SOFT", "opsz"] });

export const metadata: Metadata = {
  title: { default: `${site.name} · Think like a mathematician`, template: `%s · ${site.name}` },
  description:
    "An interactive math website for GED 102: play with patterns, decode math symbols, solve puzzles, and see what our visitors discovered.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${mono.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
