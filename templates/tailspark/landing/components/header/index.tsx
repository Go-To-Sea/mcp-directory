"use client";

import { BsSun, BsMoon, BsList,BsCloudSleet } from "react-icons/bs";
import { GrAction ,GrCloudComputer} from "react-icons/gr"
import type { Header, Item } from "@/types/landing";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
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
    <header className="mx-auto w-full max-w-7xl px-4 md:px-8 mt-4 md:mt-1 ">
      <div className="flex items-center">
        <div className="flex items-center">
          <p className="text-lg md:text-1xl font-medium">
            <a
              className="flex items-center bg-cover bg-center py-3 px-2 md:py-4 m text-primary cursor-pointer font-bold"
              href={header?.brand?.url}
            >
              <img
                src={header?.brand?.avatar?.src || "/placeholder.svg"}
                alt={header?.brand?.avatar?.title || header?.brand?.title}
                className="w-8 h-8 rounded border-slate-300 shadow-lg mr-2"
              />
              {header?.brand?.title}
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
              servers
            </Button>

            <Button
              variant="ghost"
              className={`ml-4 text-slate-700 dark:text-white hover:text-primary px-2 py-1 rounded ${
                pathname === "/clients" ? "text-primary" : ""
              }`}
              onClick={() => handleNavigation("/clients")}
            >
              <GrAction className="mr-2" />
              clients
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <ul className="md:flex float-right flex text-1xl text-slate-700 mr-4 items-center">
            {header?.nav?.items?.map((item: Item, idx: number) => (
              <li className="mx-4 hidden md:block" key={idx}>
                <a
                  href={item.url}
                  target={item.target}
                  className={`hover:text-primary ${pathname === item.url ? "text-primary" : ""}`}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 主题切换按钮 */}
        <Button
          className="ml-2 md:ml-8 md:mr-8 dark:text-white pl-5 pr-5 rounded bg-gray-50 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-700"
          onClick={toggleTheme}
        >
          {isDarkMode ? <BsSun size={18} /> : <BsMoon size={18} />}
        </Button>
      </div>
    </header>
  );
}