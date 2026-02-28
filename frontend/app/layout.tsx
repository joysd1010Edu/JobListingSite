//=== Root Layout ===
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/SharedComponents/Nav_Footer/NavBar";
import Footer from "@/SharedComponents/Nav_Footer/Footer";
import { ClientProviders } from "@/SharedComponents/Providers/ClientProviders";
import { Toaster } from "@/components/ui/sonner";

//=== Font Configuration ===
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//=== Metadata Configuration ===
export const metadata: Metadata = {
  title: "QuickHire - Discover 5000+ Jobs",
  description:
    "Great platform for the job seeker searching for new career heights and passionate about startups.",
  icons: {
    icon: "/Images/logo.png",
  },
};

//=== Root Layout Component ===
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* === Providers Wrapper === */}
        <ClientProviders>
          {/* === Navigation Bar === */}
          <NavBar />

          {/* === Page Content === */}
          <main className="min-h-screen">{children}</main>

          {/* === Footer === */}
          <Footer />

          {/* === Toast Notifications === */}
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
}
