import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins, Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";
import GlobalHeader from "./components/GlobalHeader";

const climateCrisis = localFont({
  src: "./fonts/ClimateCrisis-1979.woff2",
  variable: "--font-climate",
  weight: "400",
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  weight: ["400"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexora - Premium Automation Agency",
  description: "You demand — We deliver. High-end automation solutions for modern businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${climateCrisis.variable} ${bodoniModa.variable} ${inter.variable} font-sans antialiased`}
      >
        <GlobalHeader />
        {children}
      </body>
    </html>
  );
}
