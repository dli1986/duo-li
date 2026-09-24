import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BgmPlayer } from "@/components/BgmPlayer";
import { MusicPlayerProvider } from "@/components/MusicPlayerProvider";
import { getAllMusic } from "@/lib/music";
import { siteConfig } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const musicPlaylist = getAllMusic()
    .filter((entry) => entry.audioUrl)
    .map((entry) => ({
      slug: entry.slug,
      title: entry.title,
      artist: entry.artist,
      audioUrl: entry.audioUrl as string,
    }));

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground font-sans">
        <MusicPlayerProvider playlist={musicPlaylist}>
          <SiteHeader />
          <main className="flex-1" data-pagefind-body>
            {children}
          </main>
          <SiteFooter />
        </MusicPlayerProvider>
        <BgmPlayer />
      </body>
    </html>
  );
}
