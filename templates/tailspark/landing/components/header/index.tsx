"use client";

import { BsSun, BsMoon, BsList,BsCloudSleet } from "react-icons/bs";
import { GrAction ,GrCloudComputer} from "react-icons/gr"
import type { Header, Item } from "@/types/landing";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Dropdown from "./dropdown";
import { useEffect, useState } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  ClerkProvider
} from '@clerk/nextjs'
// 添加导入
import SubmitForm from "./submitModal";
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
    <ClerkProvider>
        <header className="sticky top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200/80 dark:border-gray-800/80 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <button
                  className="flex items-center py-3 px-2 text-primary font-bold hover:opacity-80 transition-opacity"
                  onClick={() => handleNavigation("/")}
                >
                  <img
                    src={header?.brand?.avatar?.src || "/logo.png"}
                    alt="MCP.ad"
                    className="w-8 h-8 rounded mr-2"
                  />
                  <span className="block">MCP.ad</span>
                </button>
              </div>

              {/* 移动端菜单按钮 */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <BsList className="h-5 w-5" />
                </Button>
              </div>
    {/* 桌面端导航 */}
    <div className="hidden md:flex items-center justify-between flex-1 space-x-2">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          className={`px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${
            pathname === "/servers" ? "bg-gray-100 dark:bg-gray-800 text-primary" : ""
          }`}
          onClick={() => handleNavigation("/servers")}
        >
          <GrCloudComputer className="mr-2 h-4 w-4" />
          Servers
        </Button>
        <Button
          variant="ghost"
          className={`px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${
            pathname === "/clients" ? "bg-gray-100 dark:bg-gray-800 text-primary" : ""
          }`}
          onClick={() => handleNavigation("/clients")}
        >
          <GrAction className="mr-2 h-4 w-4" />
          Clients
        </Button>
        <Button
          variant="ghost"
          className={`px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${
            pathname === "/blog" ? "bg-gray-100 dark:bg-gray-800 text-primary" : ""
          }`}
          onClick={() => handleNavigation("/blog")}
        >
          <BsList className="mr-2 h-4 w-4" />
          Blog
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        {/* <Button
          variant="default"
          className="bg-primary hover:bg-primary/90 text-white"
        >
          Submit
        </Button> */}
        <SubmitForm />
        <SignedOut>
          <SignInButton>
            <Button
              variant="outline"
              className="text-slate-700 dark:text-white border-none shadow-sm hover:shadow-md transition-shadow"
            >
              Login
            </Button>
          </SignInButton>
        </SignedOut>

        <Button
          className="dark:text-white text-[#000] rounded bg-gray-50 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-700"
          onClick={toggleTheme}
        >
          {isDarkMode ? <BsSun size={18} /> : <BsMoon size={18} />}
        </Button>
        {/* <Dropdown /> */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
            </div>
          </div>
          {/* 移动端菜单弹出层 */}
          {isMenuOpen && (
            <div className="md:hidden fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40" onClick={() => setIsMenuOpen(false)}>
              <div 
                className="fixed right-0 top-16 w-64 min-h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 shadow-xl animate-slide-left" 
                onClick={e => e.stopPropagation()}
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1 py-4">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        pathname === "/servers" ? "bg-gray-100 dark:bg-gray-800 text-primary" : ""
                      }`}
                      onClick={() => {
                        handleNavigation("/servers");
                        setIsMenuOpen(false);
                      }}
                    >
                      <GrCloudComputer className="mr-3 h-4 w-4" />
                      Servers
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        pathname === "/clients" ? "bg-gray-100 dark:bg-gray-800 text-primary" : ""
                      }`}
                      onClick={() => {
                        handleNavigation("/clients");
                        setIsMenuOpen(false);
                      }}
                    >
                      <GrAction className="mr-3 h-4 w-4" />
                      Clients
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        pathname === "/blog" ? "bg-gray-100 dark:bg-gray-800 text-primary" : ""
                      }`}
                      onClick={() => {
                        handleNavigation("/blog");
                        setIsMenuOpen(false);
                      }}
                    >
                      <BsList className="mr-3 h-4 w-4" />
                      Blog
                    </Button>
                    
                    {/* Submit 按钮 */}
                    <div className="px-6 py-3">
                      <div className="w-full">
                        <SubmitForm />
                      </div>
                    </div>
                  </div>
                  {/* 移动端菜单底部登录按钮 */}
                  <div className="border-t border-gray-200 dark:border-gray-800 p-4 space-y-2">
                    <SignedOut>
                      <SignInButton>
                        <Button
                          variant="outline"
                          className="w-full justify-center"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Login
                        </Button>
                      </SignInButton>
                    </SignedOut>
                    <SignedIn>
                      <div className="flex justify-center">
                        <UserButton />
                      </div>
                    </SignedIn>
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>
    </ClerkProvider>
  );
}
