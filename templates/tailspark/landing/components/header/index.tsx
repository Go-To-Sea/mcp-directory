"use client";

import { BsGithub, BsTwitter } from "react-icons/bs";
import { BsSun, BsMoon } from "react-icons/bs"; // 添加太阳和月亮图标
import { Header, Item } from "@/types/landing";
import { Button } from "@/components/ui/button"
// import DropDown from "./dropdown";
import { Mail } from "lucide-react"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"; // 添加 useState 和 useEffect

export default ({ header }: { header: Header }) => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false); // 添加状态管理

  useEffect(() => {
    // 从 localStorage 中读取主题设置
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

  return (
    <header className="mx-auto w-full max-w-7xl px-4 md:px-8 mt-4 md:mt-1">
      
      <div className="flex items-center">
      <div className="flex items-center">

        <p className="text-lg md:text-1xl font-medium ">
          <a
            className="flex items-center  bg-cover bg-center py-3 px-2 md:py-4 m text-primary cursor-pointer font-bold"
            href={header?.brand?.url}
          >
            <img
              src={header?.brand?.avatar?.src}
              alt={header?.brand?.avatar?.title || header?.brand?.title}
              className="w-8 h-8 rounded  border-slate-300 shadow-lg mr-2"
            />
            {header?.brand?.title}
          </a>

         
        </p>
         {/* 添加导航按钮 */}
         <div className="ml-4">
            <Button
              variant="ghost"
              className="text-slate-700 drak:color-white   hover:bg-gradient-to-r hover:from-primary hover:to-primary-foreground hover:text-primary px-2 py-1 rounded"
            >
               <Mail />
              servers
            </Button>
          
            <Button
              variant="ghost" 
              className="ml-4 text-slate-700 drak:color-white hover:bg-gradient-to-r hover:from-primary hover:to-primary-foreground hover:text-primary px-2 py-1 rounded"
            >
               <Mail />
              clients
            </Button>
            </div>
        </div>
        <div className="flex-1">
          <ul className="md:flex float-right flex text-1xl text-slate-700 mr-4 items-center c">
            {header?.nav?.items?.map((item: Item, idx: number) => {
              return (
                <li className="mx-4 hidden md:block" key={idx}>
                  <a
                    href={item.url}
                    target={item.target}
                    className={
                      pathname === item.url
                        ? "hover:text-[#2752f4]"
                        : "hover:text-[#7f98f3]"
                    }
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* 添加主题切换按钮 */}
        <Button
          className="ml-2 md:ml-8 md:mr-8   dark:text-white pl-5 pr-5 rounded bg-gray-50 hover:bg-slate-200 dark:hover:bg-slate-700"
          onClick={toggleTheme}
        >
          {isDarkMode ? <BsSun size={18} /> : <BsMoon size={18} />}
        </Button>

        <Button className="inline-flex  items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground h-10 px-4 py-2 text-white">Sign In</Button>
      </div>
    </header>
  );
};