/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-13 23:49:13
 */
"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Hero from "../components/hero"
import Projects from "../components/projects"
import Search from "../components/search"
import Faq from "../components/faq"
import FooterInfo from "../components/footer";
import Link from 'next/link'

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
            <svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" className="-z-50 absolute hidden opacity-25 [mask-image:linear-gradient(to_right,white,transparent,transparent,white)] lg:block"><g clipPath="url(#clip0_4_5)"><rect width="1920" height="1080"></rect><line y1="49.5" x2="1920" y2="49.5" className="stroke-muted-foreground"></line><line y1="99.5" x2="1920" y2="99.5" className="stroke-muted-foreground"></line><line y1="149.5" x2="1920" y2="149.5" className="stroke-muted-foreground"></line><line y1="199.5" x2="1920" y2="199.5" className="stroke-muted-foreground"></line><line y1="249.5" x2="1920" y2="249.5" className="stroke-muted-foreground"></line><line y1="299.5" x2="1920" y2="299.5" className="stroke-muted-foreground"></line><line y1="349.5" x2="1920" y2="349.5" className="stroke-muted-foreground"></line><line y1="399.5" x2="1920" y2="399.5" className="stroke-muted-foreground"></line><line y1="449.5" x2="1920" y2="449.5" className="stroke-muted-foreground"></line><line y1="499.5" x2="1920" y2="499.5" className="stroke-muted-foreground"></line><line y1="549.5" x2="1920" y2="549.5" className="stroke-muted-foreground"></line><line y1="599.5" x2="1920" y2="599.5" className="stroke-muted-foreground"></line><line y1="649.5" x2="1920" y2="649.5" className="stroke-muted-foreground"></line><line y1="699.5" x2="1920" y2="699.5" className="stroke-muted-foreground"></line><line y1="749.5" x2="1920" y2="749.5" className="stroke-muted-foreground"></line><line y1="799.5" x2="1920" y2="799.5" className="stroke-muted-foreground"></line><line y1="849.5" x2="1920" y2="849.5" className="stroke-muted-foreground"></line><line y1="899.5" x2="1920" y2="899.5" className="stroke-muted-foreground"></line><line y1="949.5" x2="1920" y2="949.5" className="stroke-muted-foreground"></line><line y1="999.5" x2="1920" y2="999.5" className="stroke-muted-foreground"></line><line y1="1049.5" x2="1920" y2="1049.5" className="stroke-muted-foreground"></line><g clipPath="url(#clip1_4_5)"><line x1="49.6133" y1="3.99995" x2="49.7268" y2="1084" className="stroke-muted-foreground"></line><line x1="99.7275" y1="3.99995" x2="99.8411" y2="1084" className="stroke-muted-foreground"></line><line x1="149.841" y1="3.99995" x2="149.954" y2="1084" className="stroke-muted-foreground"></line><line x1="199.954" y1="3.99995" x2="200.068" y2="1084" className="stroke-muted-foreground"></line><line x1="250.067" y1="3.99995" x2="250.181" y2="1084" className="stroke-muted-foreground"></line><line x1="300.182" y1="3.99995" x2="300.295" y2="1084" className="stroke-muted-foreground"></line><line x1="350.295" y1="3.99995" x2="350.408" y2="1084" className="stroke-muted-foreground"></line><line x1="400.408" y1="3.99995" x2="400.522" y2="1084" className="stroke-muted-foreground"></line><line x1="450.521" y1="3.99995" x2="450.635" y2="1084" className="stroke-muted-foreground"></line><line x1="500.636" y1="3.99995" x2="500.749" y2="1084" className="stroke-muted-foreground"></line><line x1="550.749" y1="3.99995" x2="550.863" y2="1084" className="stroke-muted-foreground"></line><line x1="600.862" y1="3.99995" x2="600.976" y2="1084" className="stroke-muted-foreground"></line><line x1="650.976" y1="3.99995" x2="651.089" y2="1084" className="stroke-muted-foreground"></line><line x1="701.09" y1="3.99995" x2="701.203" y2="1084" className="stroke-muted-foreground"></line><line x1="751.203" y1="3.99995" x2="751.317" y2="1084" className="stroke-muted-foreground"></line><line x1="801.316" y1="3.99995" x2="801.43" y2="1084" className="stroke-muted-foreground"></line><line x1="851.43" y1="3.99995" x2="851.543" y2="1084" className="stroke-muted-foreground"></line><line x1="901.544" y1="3.99995" x2="901.657" y2="1084" className="stroke-muted-foreground"></line><line x1="951.657" y1="3.99995" x2="951.771" y2="1084" className="stroke-muted-foreground"></line><line x1="1001.77" y1="3.99995" x2="1001.88" y2="1084" className="stroke-muted-foreground"></line><line x1="1051.88" y1="3.99995" x2="1052" y2="1084" className="stroke-muted-foreground"></line><line x1="1102" y1="3.99995" x2="1102.11" y2="1084" className="stroke-muted-foreground"></line><line x1="1152.11" y1="3.99995" x2="1152.22" y2="1084" className="stroke-muted-foreground"></line><line x1="1202.22" y1="3.99995" x2="1202.34" y2="1084" className="stroke-muted-foreground"></line><line x1="1252.34" y1="3.99995" x2="1252.45" y2="1084" className="stroke-muted-foreground"></line><line x1="1302.45" y1="3.99995" x2="1302.57" y2="1084" className="stroke-muted-foreground"></line><line x1="1352.57" y1="3.99995" x2="1352.68" y2="1084" className="stroke-muted-foreground"></line><line x1="1402.68" y1="3.99995" x2="1402.79" y2="1084" className="stroke-muted-foreground"></line><line x1="1452.79" y1="3.99995" x2="1452.91" y2="1084" className="stroke-muted-foreground"></line><line x1="1502.91" y1="3.99995" x2="1503.02" y2="1084" className="stroke-muted-foreground"></line><line x1="1553.02" y1="3.99995" x2="1553.13" y2="1084" className="stroke-muted-foreground"></line><line x1="1603.13" y1="3.99995" x2="1603.25" y2="1084" className="stroke-muted-foreground"></line><line x1="1653.25" y1="3.99995" x2="1653.36" y2="1084" className="stroke-muted-foreground"></line><line x1="1703.36" y1="3.99995" x2="1703.47" y2="1084" className="stroke-muted-foreground"></line><line x1="1753.47" y1="3.99995" x2="1753.59" y2="1084" className="stroke-muted-foreground"></line><line x1="1803.59" y1="3.99995" x2="1803.7" y2="1084" className="stroke-muted-foreground"></line><line x1="1853.7" y1="3.99995" x2="1853.81" y2="1084" className="stroke-muted-foreground"></line><line x1="1903.81" y1="3.99995" x2="1903.93" y2="1084" className="stroke-muted-foreground"></line></g></g><defs><clipPath id="clip0_4_5"><rect width="1920" height="1080" fill="#000000"></rect></clipPath><clipPath id="clip1_4_5"><rect width="1920" height="1080" fill="#000000" transform="translate(-1 4)"></rect></clipPath></defs></svg>
        </div>
      </div>
 
      {/* 背景动画 */}

      {/* 欢迎和介绍词 - 只在首次访问时显示 */}
     
      {showIntro && (
        <div className="mx-auto max-w-7xl animate-fade-out delay-3000 duration-2000 w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-transparent to-[#732befe6]/50 px-4 rounded-b-[50px]">
          <div className="text-center">
            <div className="flex justify-center mb-6">
                   {/* 使用正确的Product Hunt徽章链接 */}
                <div className="relative z-20 ">
                  <a 
                    target="_blank" 
                    href="https://www.producthunt.com/posts/mcp-servers-2"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=940368&theme=light" 
                      alt="MCP Servers - A MCP Servers resource navigation station" 
                      width="250" 
                      height="54" 
                    />
                  </a>
                </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4 animate-gradient-x">
              Welcome to the MCP Tools Station!
            </h1>
            
            {/* 添加工具站数量展示 */}
            <div className="mb-4 sm:mb-6">
              <div>
                <span className="text-xl sm:text-2xl font-bold text-primary inline-block animate-bounce">
                  {projectsCount}
                </span>
                <span className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 ml-2 inline-block animate-bounce [animation-delay:200ms]">
                  MCP Tools Available
                </span>
                <span className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 ml-2 inline-block ">
                -
                </span>
                <span className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 ml-2 inline-block animate-bounce [animation-delay:400ms]">
                  The Most Comprehensive Collection
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-[#898989] dark:text-white mb-6 sm:mb-8 px-2 sm:px-8 md:px-20 mt-4 sm:mt-6">
              MCP（Model Context Protocol）Tool Navigation Station —— the most comprehensive tool library in the network, one-stop aggregation, intelligent classification by scenario/function, accurate access to the required tools, point and use, efficient opening of MCP usage journey. 
            </p>
            <button
              onClick={() => {
                const searchSection = document.getElementById("222");
                if (searchSection) {
                  searchSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-4 sm:px-6 py-2 sm:py-3 mt-4 sm:mt-6 bg-[#ab80f5e6] text-[#e5e5e5] hover:bg-[#8d54f0e6] rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
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

