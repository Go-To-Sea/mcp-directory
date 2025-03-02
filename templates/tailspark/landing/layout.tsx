/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-27 01:18:39
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-03 00:23:18
 */
import "./assets/style.css";

import Footer from "./components/footer";
import Header from "./components/header";
import { Page } from "@/types/landing";

export default function ({
  children,
  page,
}: Readonly<{
  children: React.ReactNode;
  page: Page;
}>) {
  return (
    <main className=" bg-background text-foreground">
      {page.header && <Header header={page.header} />}
      {children}
      {/* {page.footer && <Footer footer={page.footer} />} */}
    </main>
  );
}
