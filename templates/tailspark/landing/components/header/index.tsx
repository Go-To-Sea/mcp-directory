"use client";

import { BsSun, BsMoon, BsList,BsCloudSleet } from "react-icons/bs";
import { GrAction ,GrCloudComputer} from "react-icons/gr"
import type { Header, Item } from "@/types/landing";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Dropdown from "./dropdown";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

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
export default function HeaderComponent({ header }: { header: Header }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

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

  const handleSubmitClick = (e: React.MouseEvent) => {
   
      router.push('/submit');
  };

  return (
    <ClerkProvider>
        <header className="sticky top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200/80 dark:border-gray-800/80 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a 
                  className="flex items-center py-3 px-2 text-primary font-bold hover:opacity-80 transition-opacity"
                  href="https://mcp.ad"
                >
                  <img
                    src={header?.brand?.avatar?.src || "/logo.png"}
                    alt="MCP.ad"
                    className="w-8 h-8 rounded mr-2"
                  />
                  <span className="block">MCP.ad</span>
                </a>
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
        <a
          href="/servers"
          className={`px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors inline-flex items-center ${
            pathname === "/servers" ? "bg-gray-100 dark:bg-gray-800 text-primary" : ""
          }`}
        >
          <GrCloudComputer className="mr-2 h-4 w-4" />
          Servers
        </a>
        <a
          href="/clients"
          className={`px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors inline-flex items-center ${
            pathname === "/clients" ? "bg-gray-100 dark:bg-gray-800 text-primary" : ""
          }`}
        >
          <GrAction className="mr-2 h-4 w-4" />
          Clients
        </a>
        <a
          href="/blog"
          className={`px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors inline-flex items-center ${
            pathname === "/blog" ? "bg-gray-100 dark:bg-gray-800 text-primary" : ""
          }`}
        >
          <BsList className="mr-2 h-4 w-4" />
          Blog
        </a>
      </div>
      <div className="flex items-center space-x-2">
        <a 
          href="/submit"
          className="inline-block"
          onClick={handleSubmitClick}
        >
          <Button
            variant="default"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 shadow-md hover:shadow-lg rounded-full px-6"
          >
            Submit
          </Button>
        </a>

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
        
        {/* 启用语言切换下拉菜单 */}
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
                    <a
                      href="/servers"
                      className={`w-full justify-start px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 inline-flex items-center ${
                        pathname === "/servers" ? "bg-gray-100 dark:bg-gray-800 text-primary" : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <GrCloudComputer className="mr-3 h-4 w-4" />
                      Servers
                    </a>
                    <a
                      href="/clients"
                      className={`w-full justify-start px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 inline-flex items-center ${
                        pathname === "/clients" ? "bg-gray-100 dark:bg-gray-800 text-primary" : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <GrAction className="mr-3 h-4 w-4" />
                      Clients
                    </a>
                    <a
                      href="/blog"
                      className={`w-full justify-start px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 inline-flex items-center ${
                        pathname === "/blog" ? "bg-gray-100 dark:bg-gray-800 text-primary" : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <BsList className="mr-3 h-4 w-4" />
                      Blog
                    </a>
                    
                    {/* Submit 按钮 */}
                    <div className="px-6 py-3">
                      <div className="w-full">
                        <a 
                          href="/submit"
                          className="block w-full"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSubmitClick(e);
                            setIsMenuOpen(false);
                          }}
                        >
                          <Button
                            variant="default"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 shadow-md hover:shadow-lg rounded-full px-6"
                          >
                            Submit
                          </Button>
                        </a>
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

        {/* 登录提示弹窗 */}
<Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
  <DialogContent className="sm:max-w-[400px] !rounded-2xl border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        Sign In Required
      </DialogTitle>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Please sign in to submit your project
      </p>
    </DialogHeader>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mt-6 flex flex-col items-center">
        <motion.div 
          className="w-full flex justify-center mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </motion.div>
        <motion.div 
          className="flex justify-center space-x-3 pt-4 w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button 
            variant="outline" 
            onClick={() => setIsLoginDialogOpen(false)}
            type="button"
            className="!rounded border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-all"
          >
            Cancel
          </Button>
          <SignInButton mode="modal">
            <Button 
              type="button"
              className="!rounded bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all"
              onClick={() => setIsLoginDialogOpen(false)}
            >
              Sign In
            </Button>
          </SignInButton>
        </motion.div>
      </div>
    </motion.div>
  </DialogContent>
</Dialog>
    </ClerkProvider>
  );
}


