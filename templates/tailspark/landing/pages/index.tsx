/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-23 22:12:11
 */
"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Hero from "../components/hero"
import Projects from "../components/projects"
import Search from "../components/search"
import Faq from "../components/faq"
import UserCases from "../components/usercases"
import FooterInfo from "../components/footer";
import Link from 'next/link'
// 在顶部导入 Blog 组件
import Blog from "../components/blog"
// 在顶部导入 React
import React from 'react'
// 修改 navItems 的定义方式
// const navItems = [
//   { id: 'hero', label: 'Home', icon: <Home size={16} /> },
//   { id: 'projects', label: 'Projects', icon: <Grid size={16} /> },
//   { id: 'blog', label: 'Blog', icon: <BookOpen size={16} /> },
//   { id: 'faq', label: 'FAQ', icon: <HelpCircle size={16} /> },
// ]
type Page = {
  hero?: {
    title: string
    description: string
  }
  faq?: {
    title: any
    items: {
      question: any
      answer: any
    }[]
  },
  
}

type Project = {
  id: number
  name: string
  description: string
  image: string
  url: string
  title?: string; // 使 title 可选
  type?: string;  // 使 type 可选
}

// 在顶部导入 Testimonials 组件
import Testimonials from "../components/testimonials"
// 在顶部导入所需的图标
// 首先在顶部导入新的图标
import { Menu, X, Home, Search as SearchIcon, MessageSquare, Grid, BookOpen, HelpCircle, FolderGit2, Users } from 'lucide-react'

// 添加 next-intl 的导入
import { useTranslations } from 'next-intl'

export default function ({
  page,
  projects,
  projectsCount,
}: {
  page: any
  projects: any
  projectsCount: any
}) {
  // 添加翻译 hook
  const t = useTranslations('home')
  const [showIntro, setShowIntro] = useState(true)
  const [showSidebar, setShowSidebar] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const searchParams = useSearchParams()

  // 更新导航菜单配置
  // 在 navItems 定义中更新图标
  const navItems = [
  { id: 'projects', label: 'Projects', icon: <FolderGit2 size={20} /> },
  { id: 'blog', label: 'Blog', icon: <BookOpen size={20} /> },
  { id: 'usercases', label: 'Use Cases', icon: <Users size={20} /> },
  { id: 'testimonials', label: 'Reviews', icon: <MessageSquare size={20} /> },
  { id: 'faq', label: 'FAQ', icon: <HelpCircle size={20} /> },
  ]

  // 监听滚动更新当前激活的部分
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(navItems[index].id)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 更新滚动函数，添加偏移量
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // 头部导航栏高度
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setActiveSection(id)
      setShowSidebar(false)
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* 移动端触发按钮 - 调整大小和透明度 */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed top-20 left-4 z-50 p-1.5 bg-primary/5 rounded-full lg:hidden hover:bg-primary/10 transition-colors"
      >
        {showSidebar ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* 优化后的侧边栏导航 - 减小尺寸和调整透明度 */}
      <nav className={`fixed top-1/2 -translate-y-1/2 left-0 z-40 transition-all duration-300 
        lg:translate-x-0 ${showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="bg-background/60 backdrop-blur-sm rounded-r-xl p-2 shadow-sm">
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`group flex items-center gap-1.5 p-1.5 rounded-lg transition-all duration-300 w-full
                    hover:bg-primary/5 text-muted-foreground/70 hover:text-primary/80`}
                >
                  <span className="transition-transform duration-300 group-hover:scale-105">
                    {item.icon}
                  </span>
                  <span className="text-xs font-medium hidden lg:block origin-left transition-all duration-300">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* 为每个组件添加 id */}
      <div className="fixed   inset-0 w-full flex justify-center">
        <div className="w-full max-w-[1920px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" className="-z-50 absolute hidden opacity-25 [mask-image:linear-gradient(to_right,white,transparent,transparent,white)] lg:block"><g clipPath="url(#clip0_4_5)"><rect width="1920" height="1080"></rect><line y1="49.5" x2="1920" y2="49.5" className="stroke-muted-foreground"></line><line y1="99.5" x2="1920" y2="99.5" className="stroke-muted-foreground"></line><line y1="149.5" x2="1920" y2="149.5" className="stroke-muted-foreground"></line><line y1="199.5" x2="1920" y2="199.5" className="stroke-muted-foreground"></line><line y1="249.5" x2="1920" y2="249.5" className="stroke-muted-foreground"></line><line y1="299.5" x2="1920" y2="299.5" className="stroke-muted-foreground"></line><line y1="349.5" x2="1920" y2="349.5" className="stroke-muted-foreground"></line><line y1="399.5" x2="1920" y2="399.5" className="stroke-muted-foreground"></line><line y1="449.5" x2="1920" y2="449.5" className="stroke-muted-foreground"></line><line y1="499.5" x2="1920" y2="499.5" className="stroke-muted-foreground"></line><line y1="549.5" x2="1920" y2="549.5" className="stroke-muted-foreground"></line><line y1="599.5" x2="1920" y2="599.5" className="stroke-muted-foreground"></line><line y1="649.5" x2="1920" y2="649.5" className="stroke-muted-foreground"></line><line y1="699.5" x2="1920" y2="699.5" className="stroke-muted-foreground"></line><line y1="749.5" x2="1920" y2="749.5" className="stroke-muted-foreground"></line><line y1="799.5" x2="1920" y2="799.5" className="stroke-muted-foreground"></line><line y1="849.5" x2="1920" y2="849.5" className="stroke-muted-foreground"></line><line y1="899.5" x2="1920" y2="899.5" className="stroke-muted-foreground"></line><line y1="949.5" x2="1920" y2="949.5" className="stroke-muted-foreground"></line><line y1="999.5" x2="1920" y2="999.5" className="stroke-muted-foreground"></line><line y1="1049.5" x2="1920" y2="1049.5" className="stroke-muted-foreground"></line><g clipPath="url(#clip1_4_5)"><line x1="49.6133" y1="3.99995" x2="49.7268" y2="1084" className="stroke-muted-foreground"></line><line x1="99.7275" y1="3.99995" x2="99.8411" y2="1084" className="stroke-muted-foreground"></line><line x1="149.841" y1="3.99995" x2="149.954" y2="1084" className="stroke-muted-foreground"></line><line x1="199.954" y1="3.99995" x2="200.068" y2="1084" className="stroke-muted-foreground"></line><line x1="250.067" y1="3.99995" x2="250.181" y2="1084" className="stroke-muted-foreground"></line><line x1="300.182" y1="3.99995" x2="300.295" y2="1084" className="stroke-muted-foreground"></line><line x1="350.295" y1="3.99995" x2="350.408" y2="1084" className="stroke-muted-foreground"></line><line x1="400.408" y1="3.99995" x2="400.522" y2="1084" className="stroke-muted-foreground"></line><line x1="450.521" y1="3.99995" x2="450.635" y2="1084" className="stroke-muted-foreground"></line><line x1="500.636" y1="3.99995" x2="500.749" y2="1084" className="stroke-muted-foreground"></line><line x1="550.749" y1="3.99995" x2="550.863" y2="1084" className="stroke-muted-foreground"></line><line x1="600.862" y1="3.99995" x2="600.976" y2="1084" className="stroke-muted-foreground"></line><line x1="650.976" y1="3.99995" x2="651.089" y2="1084" className="stroke-muted-foreground"></line><line x1="701.09" y1="3.99995" x2="701.203" y2="1084" className="stroke-muted-foreground"></line><line x1="751.203" y1="3.99995" x2="751.317" y2="1084" className="stroke-muted-foreground"></line><line x1="801.316" y1="3.99995" x2="801.43" y2="1084" className="stroke-muted-foreground"></line><line x1="851.43" y1="3.99995" x2="851.543" y2="1084" className="stroke-muted-foreground"></line><line x1="901.544" y1="3.99995" x2="901.657" y2="1084" className="stroke-muted-foreground"></line><line x1="951.657" y1="3.99995" x2="951.771" y2="1084" className="stroke-muted-foreground"></line><line x1="1001.77" y1="3.99995" x2="1001.88" y2="1084" className="stroke-muted-foreground"></line><line x1="1051.88" y1="3.99995" x2="1052" y2="1084" className="stroke-muted-foreground"></line><line x1="1102" y1="3.99995" x2="1102.11" y2="1084" className="stroke-muted-foreground"></line><line x1="1152.11" y1="3.99995" x2="1152.22" y2="1084" className="stroke-muted-foreground"></line><line x1="1202.22" y1="3.99995" x2="1202.34" y2="1084" className="stroke-muted-foreground"></line><line x1="1252.34" y1="3.99995" x2="1252.45" y2="1084" className="stroke-muted-foreground"></line><line x1="1302.45" y1="3.99995" x2="1302.57" y2="1084" className="stroke-muted-foreground"></line><line x1="1352.57" y1="3.99995" x2="1352.68" y2="1084" className="stroke-muted-foreground"></line><line x1="1402.68" y1="3.99995" x2="1402.79" y2="1084" className="stroke-muted-foreground"></line><line x1="1452.79" y1="3.99995" x2="1452.91" y2="1084" className="stroke-muted-foreground"></line><line x1="1502.91" y1="3.99995" x2="1503.02" y2="1084" className="stroke-muted-foreground"></line><line x1="1553.02" y1="3.99995" x2="1553.13" y2="1084" className="stroke-muted-foreground"></line><line x1="1603.13" y1="3.99995" x2="1603.25" y2="1084" className="stroke-muted-foreground"></line><line x1="1653.25" y1="3.99995" x2="1653.36" y2="1084" className="stroke-muted-foreground"></line><line x1="1703.36" y1="3.99995" x2="1703.47" y2="1084" className="stroke-muted-foreground"></line><line x1="1753.47" y1="3.99995" x2="1753.59" y2="1084" className="stroke-muted-foreground"></line><line x1="1803.59" y1="3.99995" x2="1803.7" y2="1084" className="stroke-muted-foreground"></line><line x1="1853.7" y1="3.99995" x2="1853.81" y2="1084" className="stroke-muted-foreground"></line><line x1="1903.81" y1="3.99995" x2="1903.93" y2="1084" className="stroke-muted-foreground"></line></g></g><defs><clipPath id="clip0_4_5"><rect width="1920" height="1080" fill="#000000"></rect></clipPath><clipPath id="clip1_4_5"><rect width="1920" height="1080" fill="#000000" transform="translate(-1 4)"></rect></clipPath></defs></svg>
        </div>
      </div>
 
      {/* 背景动画 */}

      {/* 欢迎和介绍词 - 只在首次访问时显示 */}
     
      {showIntro && (
        <div className="mx-auto relative z-10 max-w-7xl animate-fade-out delay-3000 duration-2000 w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-transparent to-[#732befe6]/50 px-4 rounded-b-[50px]">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <a 
                target="_blank" 
                href="https://www.producthunt.com/posts/mcp-servers-2"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=940368&theme=light" 
                  alt="MCP Servers" 
                  className="w-[250px] h-[54px]"
                />
              </a>
            </div>
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 mb-4 animate-gradient-x bg-[length:400%_auto]">
              {t('welcome')}
            </p>
            
            <div className="mb-4 sm:mb-6">
              <div>
                <span className="text-xl sm:text-2xl font-bold text-primary inline-block animate-bounce">
                  {projectsCount}
                </span>
                <span className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 ml-2 inline-block animate-bounce [animation-delay:200ms]">
                  {t('toolsCount.available')}
                </span>
                <span className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 ml-2 inline-block animate-bounce [animation-delay:300ms]">
                  {t('toolsCount.separator')}
                </span>
                <span className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 ml-2 inline-block animate-bounce [animation-delay:400ms]">
                  {t('toolsCount.description')}
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-[#898989] dark:text-white mb-6 sm:mb-8 px-2 sm:px-8 md:px-20 mt-4 sm:mt-6">
              {t('introduction')}
            </p>
            
            <button
              onClick={() => {
                const searchSection = document.getElementById("hero");
                if (searchSection) {
                  searchSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-4 sm:px-6 py-2 sm:py-3 mt-4 sm:mt-6 bg-[#ab80f5e6] text-[#e5e5e5] hover:bg-[#8d54f0e6] rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
            >
              {t('exploreButton')}
            </button>
          </div>
        </div>
      )}

      <div className={`relative z-10 ${!showIntro ? "pt-20" : ""}`}>
        <p id="hero">
          {page.hero && <Hero hero={page.hero} count={projectsCount} />}
        </p>
        <p id="search">
          <Search />
        </p>
        <p id="projects">
          <Projects viewType={'class'} projects={projects} />
        </p>
        <p id="blog">
          <Blog isHomePage={true} />
        </p>
        <p id="usercases">
          <UserCases isHomePage={true} />
        </p>
        {/* 添加评论展示组件 */}
        <p id="testimonials">
          <Testimonials />
        </p>
        <p id="faq">
          {page.faq && <Faq {...page.faq} />}
        </p>
      </div>
    </div>
  )
}

