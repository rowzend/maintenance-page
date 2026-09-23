import type { Metadata } from "next";
import "./globals.css";

const title = process.env.NEXT_PUBLIC_MAINTENANCE_TITLE || "Sedang Dalam Perbaikan";
const description = process.env.NEXT_PUBLIC_MAINTENANCE_SUBTITLE || "Sistem sedang dalam pemeliharaan";

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}