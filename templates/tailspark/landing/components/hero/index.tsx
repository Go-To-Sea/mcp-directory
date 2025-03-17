/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-18 00:53:08
 */
"use client";

import BgStar from "../../assets/imgs/bgstar.svg";
import Buttons from "./buttons";
import { Hero } from "@/types/landing";
import { usePathname } from 'next/navigation';

export default ({ hero, count }: { hero: Hero; count?: number }) => {
  const pathname = usePathname();

  const getStoredText = () => {
    switch (pathname) {
      case '/servers':
        return "mcp servers stored";
      case '/clients':
        return "mcp clients stored";
      default:
        return "MCP Servers in list";
    }
  };

  const renderTitles = () => {
    switch (pathname) {
      case '/servers':
        return (
          <div className="flex flex-col items-center w-full">
            <h1 className="text-foreground dark:text-[#fff] leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Discover
              <span className="bg-gradient-to-r ml-3 from-blue-500 to-purple-600 bg-clip-text text-transparent">
                MCP Servers
              </span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl">
              Find the best MCP servers for your needs.
            </p>
          </div>
        );
      case '/clients':
        return (
          <div className="flex flex-col items-center w-full">
            <h1 className="text-foreground dark:text-[#fff] leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Discover
              <span className="bg-gradient-to-r ml-3 from-blue-500 to-purple-600 bg-clip-text text-transparent">
                MCP Clients
              </span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl">
              Find the best MCP clients for your needs.
            </p>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center w-full">
            <h1 className="text-foreground dark:text-[#fff] leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Find Awesome
              <span className="bg-gradient-to-r ml-3 from-blue-500 to-purple-600 bg-clip-text text-transparent">
                MCP Servers and Clients
              </span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl">
              The largest collection of MCP Servers.
            </p>
          </div>
        );
    }
  };

  const getStoredLink = () => {
    switch (pathname) {
      case '/servers':
        return "/servers";
      case '/clients':
        return "/clients";
      default:
        return "/";
    }
  };

  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-4 mt-10 md:mt-14">
        <div className="mx-auto w-full text-center">
          <a href={getStoredLink()} className="dark:bg-[#000] mx-auto mb-3 inline-flex items-center gap-3 rounded-full border border-primary px-2 py-1 text-sm">
            <span className="inline-flex items-center text-white rounded-full border-primary px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-primary text-primary-foreground">
              {count}
            </span>
            <span className="dark:text-[#fff]">{getStoredText()}</span>
          </a>
          <div className="flex items-center justify-center mt-3">
            {renderTitles()}
          </div>
         
        </div>
      </div>
      <Buttons />
    </section>
  );
};
