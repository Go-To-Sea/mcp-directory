/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-27 01:18:39
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-11 00:53:26
 */
import "./assets/style.css";
import Script from 'next/script';
import Footer from "./components/footer";
import Header from "./components/header";
import BackToTop from "./components/backToTop/backToTop";
import { Page } from "@/types/landing";

export default function ({
  children,
  page,
}: Readonly<{
  children: React.ReactNode;
  page: any;
}>) {
  return (
    <>
      {/* Google Analytics 代码 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-2RH32YK2JB"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          console.log('Google Analytics === 加载完成');
          gtag('config', 'G-2RH32YK2JB');
        `}
      </Script>

      {/* Google AdSense 代码 */}
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9486334752310533"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      <main className="bg-background text-foreground ">
        <div className="border-b-2">
          {page.header && <Header header={page.header} />}
        </div>
        {children}
        {/* {page.footer && <Footer footer={page.footer} />} */}
        <BackToTop />
      </main>
    </>
  );
}
