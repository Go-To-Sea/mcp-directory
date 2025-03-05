/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-06 01:43:09
 */
/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-06 00:54:52
 */
"use client";

import { Footer, Item } from "@/types/landing";
import { Mail, Github, Twitter } from "lucide-react";
import Link from "next/link";

export default ({ footer }: { footer?: Footer }) => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* 品牌区域 */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto mr-3" />
              <span className="text-xl font-bold">MCP.ad</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              {footer?.brand?.description || "Find and explore the best Model Context Protocol (MCP) servers for your AI applications."}
            </p>
            <div className="flex space-x-4">
              <a href="javascript:;" className="text-gray-600 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="javascript:;" className="text-gray-600 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:support@mcp.ad" className="text-gray-600 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* 导航链接 */}
          {footer?.nav?.items?.map((item: Item, idx: number) => {
            return (
              <div key={idx} className="mt-8 md:mt-0">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{item?.title}</h3>
                <ul className="space-y-3">
                  {item?.children?.map((child: Item, iidx: number) => {
                    return (
                      <li key={iidx}>
                        <Link 
                          href={child?.url || "#"} 
                          className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                          target={child?.target}
                        >
                          {child?.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* 分隔线 */}
        <div className="h-px w-full bg-gray-200 dark:bg-gray-800 mb-6"></div>

        {/* 版权信息 */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()}{" "}
            <a
              className="text-primary hover:underline"
              href={footer?.copyright?.url}
              target={footer?.copyright?.target}
            >
              {footer?.copyright?.owner || "MCP.ad"}
            </a>{" "}
            {footer?.copyright?.text || "All rights reserved."}
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-gray-500 dark:text-gray-400 text-sm hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-500 dark:text-gray-400 text-sm hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
