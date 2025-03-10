/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-09 23:45:00
 */
import { ThemeProvider } from "@/providers/theme";
import localFont from "next/font/local";
import FooterInfo from "../templates/tailspark/landing/components/footer";
import { Page } from "@/types/landing";
import pagejson from "@/pagejson/en.json";

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
import {
  ClerkProvider,
} from '@clerk/nextjs'
import NextTopLoader from 'nextjs-toploader'
import '@/styles/globals.css'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
          />
          <meta name="google-adsense-account" content="ca-pub-2123767634383915" />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground dark:bg-[#1c1817] dark:text-[#e7e5e4]` }
        >
           <NextTopLoader />
          <ThemeProvider
              >{children}</ThemeProvider>
          <FooterInfo footer={pagejson.footer} />
        </body>
      </html>
  );
}
