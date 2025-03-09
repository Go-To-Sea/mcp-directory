/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-27 01:18:39
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-05 02:17:17
 */
import "./assets/style.css";


import Footer from "./components/footer";
import Header from "./components/header";
import BackToTop from "./components/backToTop/backToTop";
import { Page } from "@/types/landing";

export default function ({
  children,
  page,
}: Readonly<{
  children: React.ReactNode;
  page:any;
}>) {
  return (
    <main className="bg-background text-foreground">
      <div className="border-b-2">
        {page.header && <Header header={page.header} />}
      </div>
      {children}
      {/* {page.footer && <Footer footer={page.footer} />} */}
      <BackToTop />
    </main>
  );
}
