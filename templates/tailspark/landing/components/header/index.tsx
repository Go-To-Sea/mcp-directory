"use client";

import { BsSun, BsMoon, BsList,BsCloudSleet } from "react-icons/bs";
import { GrAction ,GrCloudComputer} from "react-icons/gr"
import type { Header, Item } from "@/types/landing";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Dropdown from "./dropdown";
import { useEffect, useState } from "react";

export default function HeaderComponent({ header }: { header: Header }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  };

  const handleNavigation = (path: string) => {
    // 根据您的项目结构调整路径
    router.push(`${path}`);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-background border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              className="flex items-center py-3 px-2 text-primary font-bold"
              onClick={() => handleNavigation("/")}
            >
              <img
                src={header?.brand?.avatar?.src || "/logo.png"}
                alt="MCP.so"
                className="w-8 h-8 rounded border-slate-300 shadow-lg mr-2"
              />
              <span className="block">MCP.so</span>
            </button>
          </div>
          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <BsList className="h-6 w-6" />
            </Button>
          </div>
          {/* 桌面端导航 - 保持原样 */}
          <div className="hidden md:flex items-center justify-end flex-1 space-x-4">
            <Button
              variant="ghost"
              className={`text-slate-700 dark:text-white hover:text-primary ${
                pathname === "/servers" ? "text-primary" : ""
              }`}
              onClick={() => handleNavigation("/servers")}
            >
              <GrCloudComputer className="mr-2" />
              Servers
            </Button>
            <Button
              variant="ghost"
              className={`text-slate-700 dark:text-white hover:text-primary ${
                pathname === "/clients" ? "text-primary" : ""
              }`}
              onClick={() => handleNavigation("/clients")}
            >
              <GrAction className="mr-2" />
              Clients
            </Button>
            <Button
              variant="ghost"
              className={`text-slate-700 dark:text-white hover:text-primary ${
                pathname === "/blog" ? "text-primary" : ""
              }`}
              onClick={() => handleNavigation("/blog")}
            >
              <BsList className="mr-2" />
              Blog
            </Button>
            {/* 新增按钮 */}
            <Button
              variant="outline"
              className="text-slate-700 dark:text-white border-none shadow-sm hover:shadow-md transition-shadow"
            >
              Login
            </Button>
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 text-slate-700 dark:text-white border-none transition-colors"
            >
              Submit
            </Button>
            {/* 主题切换按钮 */}
            <Button
              className="dark:text-white rounded bg-gray-50 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-700"
              onClick={toggleTheme}
            >
              {isDarkMode ? <BsSun size={18} /> : <BsMoon size={18} />}
            </Button>
            <Dropdown />
          </div>
        </div>
      </div>
      {/* 移动端菜单弹出层 */}
      {isMenuOpen && (
        <div className="md:hidden fixed right-0 top-16 w-1/2 z-50 bg-background border-l border-b border-gray-200 dark:border-gray-800 shadow-lg animate-slide-left">
          <div className="flex flex-col py-2">
            {/* 导航链接 */}
            <Button
              variant="ghost"
              className={`w-full justify-start py-4 px-6 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 ${
                pathname === "/servers" ? "text-primary" : ""
              }`}
              onClick={() => {
                handleNavigation("/servers");
                setIsMenuOpen(false);
              }}
            >
              <GrCloudComputer className="mr-3 h-5 w-5" />
              Servers
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start py-4 px-6 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 ${
                pathname === "/clients" ? "text-primary" : ""
              }`}
              onClick={() => {
                handleNavigation("/clients");
                setIsMenuOpen(false);
              }}
            >
              <GrAction className="mr-3 h-5 w-5" />
              Clients
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start py-4 px-6 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 ${
                pathname === "/blog" ? "text-primary" : ""
              }`}
              onClick={() => {
                handleNavigation("/blog");
                setIsMenuOpen(false);
              }}
            >
              <BsList className="mr-3 h-5 w-5" />
              Blog
            </Button>
            <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
            <Button
              variant="ghost"
              className="w-full justify-start py-4 px-6 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start py-4 px-6 text-base font-medium text-primary hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
      <header className="sticky top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        {/* ... 其他代码保持不变 ... */}
      </header>
      {isMenuOpen && (
        <div className="md:hidden fixed right-0 top-16 w-1/2 z-50 bg-white dark:bg-gray-900 border-l border-b border-gray-200 dark:border-gray-800 shadow-lg animate-slide-left">
          {/* ... 其他代码保持不变 ... */}
        </div>
      )}
    </header>
  );
}
