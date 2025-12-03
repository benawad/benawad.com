import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ben Awad",
  description: "Information about Ben Awad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

