/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-06 01:21:32
 */
"use client";

import BgStar from "../../assets/imgs/bgstar.svg";
import Buttons from "./buttons";
import { Hero } from "@/types/landing";
import { usePathname } from 'next/navigation';

export default ({ hero, count }: { hero: Hero; count?: number }) => {
  const pathname = usePathname();

  const renderTitles = () => {
    switch (pathname) {
      case '/servers':
        return (
          <div className="flex flex-col sm:flex-row items-center">
            <h1 className="text-foreground dark:text-[#fff] leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-0 sm:mr-3 md:mr-5">
              Find
            </h1>
            <h1 className="text-primary leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              MCP Servers
            </h1>
          </div>
        );
      case '/clients':
        return (
          <div className="flex flex-col sm:flex-row items-center">
            <h1 className="text-foreground dark:text-[#fff] leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-0 sm:mr-3 md:mr-5">
              Find
            </h1>
            <h1 className="text-primary leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              MCP Clients
            </h1>
          </div>
        );
      default:
        return (
          <div className="flex flex-col sm:flex-row items-center">
            <h1 className="text-foreground dark:text-[#fff] leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-0 sm:mr-3 md:mr-5">
              Find Awesome
            </h1>
            <h1 className="text-primary leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              MCP Servers and Clients
            </h1>
          </div>
        );
    }
  };

  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-4 mt-10 md:mt-14">
        <div className="mx-auto w-full text-center">
          <a href="mailto:support@mcp.ad" className="dark:bg-[#000] mx-auto mb-3 inline-flex items-center gap-3 rounded-full border border-primary px-2 py-1 text-sm">
            <span className="inline-flex items-center text-white rounded-full border-primary px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-primary text-primary-foreground">
              {count}
            </span>
            <span className="dark:text-[#fff]">mcp servers stored</span>
          </a>
          <div className="flex items-center justify-center mt-3">
            {renderTitles()}
          </div>
          <h2 className="mt-5 mx-auto max-w-3xl text-muted-foreground lg:text-xl">
            {/* <span className="text-primary font-bold">{count}</span>{" "} */}
            {/* {hero.description} */}
          </h2>
        </div>
      </div>
      <Buttons />
    </section>
  );
};
