'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import type { Project } from "@/types/project"
import Markdown from "@/components/markdown";
import Header from "../../../templates/tailspark/landing/components/header";
// 导入 ProjectItem 组件
import ProjectItem from "../../../templates/tailspark/landing/components/projects/item";

interface ProjectContentProps {
  project: Project;
  tags: string[];
  similarProjects?: Project[]; // 添加相似项目参数
}

export default function ProjectContent({ project, tags, similarProjects = [] }: ProjectContentProps) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* 动态背景装饰元素 */}
      <motion.div 
        className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-200/10 to-purple-300/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/3 pointer-events-none"
        animate={{
          x: ["-50%", "-45%", "-50%"],
          y: ["-30%", "-35%", "-30%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
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
          </div>
        </motion.div>

        {/* 桌面端右侧区域 */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden md:block space-y-6 h-full"
        >
          {/* 相似项目推荐区域 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300 h-full overflow-hidden">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white hover:text-primary transition-colors duration-200 flex items-center">
              <span className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-blue-600 rounded-full mr-2.5 inline-block"></span>
              Similar {project.type === 'server' ? 'Servers' : 'Clients'}
            </h2>
            
            {similarProjects.length > 0 ? (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {similarProjects.slice(0, 5).map((similarProject) => (
                  <div key={similarProject.uuid} className="transform scale-95 origin-top">
                    <ProjectItem project={similarProject} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400 text-center py-4">
                No similar {project.type === 'server' ? 'servers' : 'clients'} found
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}