import type { Metadata } from "next";
// @ts-ignore: Allow importing global CSS in Next.js app layout
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Name — Frontend Developer",
  description: "Portfolio of a passionate frontend developer crafting digital experiences with precision.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
