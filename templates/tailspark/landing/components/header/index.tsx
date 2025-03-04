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
    <header className=" top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm ">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 ">
        <div className="flex items-center justify-between">
          {/* 左侧 Logo 和导航 */}
          <div className="flex items-center">
            <p className="text-lg md:text-1xl font-medium">
              <a
                className="flex items-center bg-cover bg-center py-3 px-2 md:py-4 m text-primary cursor-pointer font-bold"
                href={header?.brand?.url}
              >
                <img
                  src={header?.brand?.avatar?.src || "/logo.png"}
                  alt="MCP.ad"
                  className="w-8 h-8 rounded border-slate-300 shadow-lg mr-2"
                />
                MCP.ad
              </a>
            </p>
            {/* 添加导航按钮 */}
            <div className="ml-4">
              <Button
                variant="ghost"
                className={`text-slate-700 dark:text-white hover:text-primary px-2 py-1 rounded ${
                  pathname === "/servers" ? "text-primary" : ""
                }`}
                onClick={() => handleNavigation("/servers")}
              >
                <GrCloudComputer className="mr-2" />
                Servers
              </Button>
    
              <Button
                variant="ghost"
                className={`ml-4 text-slate-700 dark:text-white hover:text-primary px-2 py-1 rounded ${
                  pathname === "/clients" ? "text-primary" : ""
                }`}
                onClick={() => handleNavigation("/clients")}
              >
                <GrAction className="mr-2" />
                Clients
              </Button>
    
              <Button
                variant="ghost"
                className={`ml-4 text-slate-700 dark:text-white hover:text-primary px-2 py-1 rounded ${
                  pathname === "/blog" ? "text-primary" : ""
                }`}
                onClick={() => handleNavigation("/blog")}
              >
                <BsList className="mr-2" />
                Blog
              </Button>
            </div>
          </div>
    {/* 右侧按钮组 */}
    <div className="flex items-center gap-4">
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
    </header>
  );
}
