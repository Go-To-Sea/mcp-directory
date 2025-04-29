
/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-17 22:56:49
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
import { useLocale } from 'next-intl'
 
export default ({ footer }: { footer?: Footer }) => {
  const locale = useLocale();
  return (
    <footer className="relative z-100 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* 品牌区域 */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto mr-3" />
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"><a href="https://mcp.ad">MCP.ad</a></span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              {footer?.brand?.description || "Find and explore the best Model Context Protocol (MCP) servers for your AI applications."}
            </p>
            <div className="flex space-x-4">
              {/* <a href="javascript:;" className="p-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 hover:from-blue-500/20 hover:to-purple-600/20 transition-all">
                <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </a>
              <a href="javascript:;" className="p-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 hover:from-blue-500/20 hover:to-purple-600/20 transition-all">
                <Twitter className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </a> */}
              <a href="mailto:support@mcp.ad" className="p-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 hover:from-blue-500/20 hover:to-purple-600/20 transition-all">
                <Mail className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </a>
            </div>
          </div>

          {/* 导航链接 */}
          <div className="grid grid-cols-2 md:grid-cols-3 col-span-2 gap-8">
            {footer?.nav?.items?.map((item: Item, idx: number) => (
              <div key={idx} className="mt-8 md:mt-0">
                <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {item?.title || ''}
                </h2>
                <ul className="space-y-3">
                  {item?.children?.map((child: Item, iidx: number) => (
                    <li key={iidx}>
                      <Link 
                        href={`/${locale}${child?.url}` || "#"} 
                        className="text-gray-600 text-[14px] dark:text-gray-400 hover:text-[#9333ea] transition-colors dark:hover:text-primary "
                        target={child?.target || '_blank'}
                      >
                        {child?.title || ''}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 分隔线 */}
        <div className="h-px w-full bg-gray-200 dark:bg-gray-800 mb-6"></div>

        {/* 版权信息 */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()}{" "}
            <a
              className="text-primary hover:text-[#9333ea] transition-colors"
              href={footer?.copyright?.url}
              target={footer?.copyright?.target}
            >
              {footer?.copyright?.owner || "MCP.ad"}
            </a>{" "}
            {footer?.copyright?.text || "All rights reserved."}
          </p>
          <div className="flex space-x-6">
            <Link href={`/${locale}/privacy-policy`} className="text-gray-500 dark:text-gray-400 text-sm hover:text-[#9333ea] transition-colors">
              <p>Privacy Policy</p>
            </Link>
            <Link href={`/${locale}/terms-of-service`} className="text-gray-500 dark:text-gray-400 text-sm hover:text-[#9333ea] transition-colors">
              <p>Terms of Service</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
