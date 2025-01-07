import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NextAuthProvider from "@/providers/NextAuthProvider";
import NuqsProvider from "@/providers/NuqsProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import StoreProvider from "@/providers/StoreProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Scaena | Your Front-Row Ticket to Memorable Moments!",
  description: "Your Front-Row Ticket to Memorable Moments!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#f7fafe] antialiased`}
      >
        <NextAuthProvider>
          <NuqsProvider>
            <StoreProvider>
              <ReactQueryProvider>
                <Navbar />
                <main className="pt-16">{children}</main>
                <Footer />
              </ReactQueryProvider>
              <ToastContainer />
            </StoreProvider>
          </NuqsProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
