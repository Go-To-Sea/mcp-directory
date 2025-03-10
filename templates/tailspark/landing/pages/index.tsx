/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-10 23:24:03
 */
"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Hero from "../components/hero"
import Projects from "../components/projects"
import Search from "../components/search"
import Faq from "../components/faq"
import FooterInfo from "../components/footer";

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

export default function ({
  page,
  projects,
  projectsCount,
}: {
  page: any
  projects: any
  projectsCount: any
}) {
  const [showIntro, setShowIntro] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    // 检查URL是否有任何参数
    const hasParams = searchParams && Array.from(searchParams.keys()).length > 0
    // 如果没有参数，显示介绍区域
    setShowIntro(!hasParams)
  }, [searchParams])

  const handleClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
  }

  return (
    <div className="relative overflow-hidden">
      <div className="fixed inset-0 w-full flex justify-center">
        <div className="w-full max-w-[1920px]">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-full h-screen -z-50 opacity-25 lg:block hidden"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 1920 1080"
          >
            <g>
              <rect width="100%" height="100%" fill="none" />
              {/* 水平线 */}
              {Array.from({ length: 21 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  y1={`${50 * (i + 1) - 0.5}`}
                  x2="100%"
                  y2={`${50 * (i + 1) - 0.5}`}
                  className="stroke-muted-foreground"
                />
              ))}
              {/* 垂直线 */}
              {Array.from({ length: 38 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={`${50 * (i + 1)}`}
                  y1="0"
                  x2={`${50 * (i + 1)}`}
                  y2="100%"
                  className="stroke-muted-foreground"
                />
              ))}
            </g>
          </svg>
        </div>
      </div>

      {/* 背景动画 */}

      {/* 欢迎和介绍词 - 只在首次访问时显示 */}
     
      {showIntro && (
        <div className="mx-auto max-w-7xl animate-fade-out delay-3000 duration-2000 w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-transparent to-[#732befe6]/50 px-4 rounded-b-[50px]">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img 
                className="tipimg" 
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=940368&theme=light&t=1741614473537" 
                alt="MCP&#0032;Servers - A&#0032;MCP&#0032;Servers&#0032;resource&#0032;navigation&#0032;station | Product Hunt" 
                width="250" 
                height="54" 
              />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4 animate-gradient-x">
              Welcome to the MCP Tools Station!
            </h1>
            
            {/* 添加工具站数量展示 */}
            <div className="mb-6">
              <div className="wiggle">
                <span className="text-2xl font-bold text-primary">
                  {projectsCount}
                </span>
                <span className="text-xl text-gray-600 dark:text-gray-300 ml-2">
                  MCP Tools Available - The Most Comprehensive Collection
                </span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-[#898989] dark:text-white mb-8 px-4 sm:px-8 md:px-20 mt-6 sm:mt-10">
              Here, we provide a comprehensive suite of tools designed specifically for the Multi-Purpose Computing
              Platform (MCP). Whether you are a developer, a designer, or just looking for efficient solutions, our
              tools are tailored to enhance your productivity and streamline your workflow. Explore our collection and
              unlock the full potential of your MCP environment.
            </p>
            <button
              onClick={() => {
                const searchSection = document.getElementById("222");
                if (searchSection) {
                  searchSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-6 py-3 mt-6 bg-[#ab80f5e6] text-[#e5e5e5] hover:bg-[#8d54f0e6] rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Explore Now
            </button>
          </div>
        </div>
      )}

      {/* 现有页面内容 */}
      <div className={`relative z-10 ${!showIntro ? "pt-20" : ""}`} id="222">
        {page.hero && <Hero hero={page.hero} count={projectsCount} />}
        <Search />
        <Projects viewType={'class'} projects={projects} />
        {page.faq && <Faq section={page.faq} />}
        {/* <FooterInfo /> */}
      </div>
    </div>
  )
}

