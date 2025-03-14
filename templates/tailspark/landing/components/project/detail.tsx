'use client'  // 确保这行代码在文件最顶部

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"  // 添加 Link 导入
import { ExternalLink, Github, ChevronRight, Home, ArrowLeft } from "lucide-react"  // 添加图标
import type { Project } from "@/types/project"
import Header from "../header";
// 导入 ProjectItem 组件
import ProjectItem from "../projects/item";
import { useRouter } from "next/navigation"
import Markdown from "@/components/markdown"
import BackToTop from "../backToTop/backToTop";

// 在文件顶部添加 Tailwind 样式导入
import '@/app/globals.css'  // 确保这个文件包含了所有需要的 Tailwind 样式

interface ProjectContentProps {
  project: Project;
  tags: string[];
  similarProjects?: Project[]; // 添加相似项目参数
}
// 添加 useEffect 来处理客户端渲染
import { useEffect, useState } from 'react'

export default function ProjectContent({ project, tags, similarProjects = [] }: ProjectContentProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 添加图片加载失败处理
    const handleImageError = (e: Event) => {
      const img = e.target as HTMLImageElement;
      if (img.src.includes('/master/')) {
        img.src = img.src.replace('/master/', '/main/');
      }
    };

    // 为所有富文本中的图片添加错误处理
    const images = document.querySelectorAll('.prose img');
    images.forEach(img => {
      img.addEventListener('error', handleImageError);
    });

    // 清理函数
    return () => {
      images.forEach(img => {
        img.removeEventListener('error', handleImageError);
      });
    };
  }, [project.content]); // 当内容变化时重新添加监听器

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden">
      <BackToTop/>
      {/* 修改面包屑导航 */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <Link href="/" className="flex items-center hover:text-primary transition-colors">
          <Home size={16} className="mr-1" />
          <span>Home</span>
        </Link>
        <ChevronRight size={14} />
        <Link 
          href="/projects" 
          className="hover:text-primary transition-colors"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          goBack
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 dark:text-gray-200 truncate max-w-[200px]">
          {project.name}
        </span>
      </div>

      
      {/* <Header header={{}}></Header> */}
      {/* 项目头部信息 - 融合了作者信息 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8 hover:shadow-md transition-shadow duration-300 relative z-10 max-w-full"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <Image
              src={project.author_avatar_url || "/logo.png"}
              alt={''}
              width={80}
              height={80}
              className="rounded-xl object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative">
                <motion.h1 
                  className="text-2xl font-bold relative z-10 px-2 py-1 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899, #8b5cf6, #3b82f6)",
                    backgroundSize: "200% auto"
                  }}
                  animate={{ 
                    backgroundPosition: ["0% center", "100% center", "0% center"]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {project.name}
                </motion.h1>
              </div>
              
              {/* 作者信息 */}
              {project.author_name && (
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                      by {project.author_name}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <p className="text-gray-500 dark:text-gray-400 text-sm my-4 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {project.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <div className="flex flex-wrap gap-1.5">
                {tags?.map((tag, index) => (
                  <motion.span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 text-xs border transition-all"
                    style={{
                      background: "linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderImageSlice: 1,
                      borderImageSource: "linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))"
                    }}
                    whileHover={{
                      background: "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                      borderImageSource: "linear-gradient(to right, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))"
                    }}
                  >
                    <span className="bg-clip-text text-transparent" 
                      style={{
                        backgroundImage: "linear-gradient(to right, rgba(59, 130, 246, 0.8), rgba(139, 92, 246, 0.8))"
                      }}
                    >
                      {tag.trim()}
                    </span>
                  </motion.span>
                ))}
              </div>
              
              {/* 链接部分 */}
              {(project.url || project.github_url) && (
                <div className="flex flex-wrap gap-3 ml-auto">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors text-sm"
                    >
                      <ExternalLink size={14} />
                      <span>Website</span>
                      <motion.div 
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: "linear-gradient(to right, #3b82f6, #8b5cf6)"
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors text-sm"
                    >
                      <Github size={14} />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      {/* 项目详细信息 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 max-w-full">
        {/* 左侧内容区域保持不变 */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2 flex flex-col h-full"
        >
          {/* 主要内容区保持不变 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300 flex-1 flex flex-col overflow-hidden">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white hover:text-primary transition-colors duration-200 flex items-center">
              <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-2.5 inline-block"></span>
              About
            </h2>
            <div 
              className="prose dark:prose-invert max-w-none flex-1 overflow-auto"
              dangerouslySetInnerHTML={{ __html: project.content || 'Continuous updates...' }} 
            />
            {/* <Markdown content={project.content || 'Continuous updates...' } /> */}
          </div>
        </motion.div>

        {/* 右侧推荐区域 - 修改样式 */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="h-full flex flex-col"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow duration-300 flex-1 flex flex-col">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700 dark:text-white hover:text-primary transition-colors duration-200 flex items-center flex-shrink-0">
              <span className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-blue-600 rounded-full mr-2.5 inline-block"></span>
              recommend MCP 
              {/* {project.type === 'server' ? 'Servers' : 'Clients'} */}
            </h2>
            
            {similarProjects.length > 0 ? (
              <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                <div className="space-y-3 sm:space-y-4">
                  {similarProjects.map((similarProject) => (
                    <div key={similarProject.uuid} className="transform scale-95 origin-top">
                      <ProjectItem project={similarProject} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                No similar {project.type === 'server' ? 'servers' : 'clients'} found
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}