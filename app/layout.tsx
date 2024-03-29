import type { Metadata } from "next";
import { rubik } from "./ui/fonts";;
import "./ui/globals.css";

export const metadata: Metadata = {
  title: "Game List",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className} antialiased`}>{children}</body>
    </html>
  );
}
