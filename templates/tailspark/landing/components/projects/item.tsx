/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-18 00:53:37
 */
"use client"

import type React from "react"

// 修改这行，添加 ArrowRight
import { Star, ArrowRight } from "lucide-react"
import type { Project } from "@/types/project"
import { useState } from "react"
import { motion } from "framer-motion"
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'  // 添加这行导入

interface ProjectItemProps {
  project: Project;
  pathPrefix?: string; // 添加可选的路径前缀参数
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, pathPrefix }) => {
  const pathname = usePathname()
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isStarred, setIsStarred] = useState(false)

  // 获取基础路径
  const basePath = pathPrefix || '/'+project.type+'s';
  
  // 判断是否在首页
  const isHomePage = pathname === '/';
  // 判断是否在分类页面
  const isCategoriesPage = pathname.startsWith('/categories');

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsStarred(!isStarred)
  }
  const handleProjectClick = () => {
    // 修改为与路由结构匹配的路径
    const detailPath = `/project/${encodeURIComponent(project.name || '')}`  // 添加空字符串作为默认值，处理 undefined 情况
    router.push(detailPath)
  }
  // 合并两个 handleLinkClick 函数的功能
  // const handleLinkClick = (e: React.MouseEvent) => {
  //   e.stopPropagation()
  //   if (project.url) {
  //     window.open(project.url, "_blank")
  //   }
  // }
 
  // 获取基础路径
const getBasePath = () => {
if (typeof window === 'undefined') {
  // 服务端渲染时
  return pathPrefix || `/${project.type}s`
}
// 客户端渲染时
return pathPrefix || `/${project.type}s`
}
  
  // Move renderTags function inside the component
  // 修改 renderTags 函数
  const renderTags = (tags: string | string[]) => {
    const tagArray = typeof tags === 'string' ? tags.split(',') : tags;
    const basePath = pathname.split('?')[0];
    const displayTags = tagArray.slice(0, 2); // 只取前两个标签


    return (
      <div className="flex relative z-10 items-center gap-1">
        {displayTags.map((tag, index) => (
          <motion.span
            key={index}
            className="inline-flex items-center transition-all flex-shrink-0"
          >
            <Link
              href={`/categories/?tag=${encodeURIComponent(tag.trim())}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center px-2 py-0.5 text-xs rounded whitespace-nowrap"
              style={{
                background: "linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))",
                border: "1px solid transparent",
                borderRadius: "9999px",
                backgroundImage: "linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05)), linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box"
              }}
            >
              <span 
                className="bg-clip-text text-transparent whitespace-nowrap" 
                style={{
                  backgroundImage: "linear-gradient(to right, rgba(59, 130, 246, 0.8), rgba(139, 92, 246, 0.8))"
                }}
              >
                #{tag.trim()}
              </span>
            </Link>
          </motion.span>
        ))}
        {tagArray.length > 2 && (
          <span className="text-xs text-gray-500">+{tagArray.length - 2}</span>
        )}
      </div>
    );
  };
  
  return (
      // ... existing code ...
    <Link 
      href={`${getBasePath()}/${encodeURIComponent(project.name || '')}`}
      className="block"
    >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="mb-2 h-[180px] sm:h-[200px] cursor-pointer rounded-xl border border-gray-200/50 dark:border-gray-800 p-3 sm:p-3.5 md:p-4 shadow-md hover:shadow-xl transition-all duration-300 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        <div className="flex justify-between items-start mb-1.5 sm:mb-2">
          <div className="flex items-start overflow-hidden max-w-[85%]">
            <div className="rounded-md flex items-center justify-center mr-2 sm:mr-2 min-w-[28px] sm:min-w-[32px]">
              <motion.img
                src={project.author_avatar_url || "/logo.png"}
                alt={project.name}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-md object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="overflow-hidden">
              <h3 className="font-medium text-base sm:text-base line-clamp-1 hover:text-primary transition-colors duration-200">
                {project.name}
              </h3>
              {project.author_name && (
                <p className="text-xs sm:text-xs text-gray-500 mt-0.5 sm:mt-1">
                  by {project.author_name}
                </p>
              )}
            </div>
          </div>
          <motion.button
            onClick={handleStarClick}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="min-w-[28px] flex items-center justify-center p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Star
              className="fill-yellow-400 text-yellow-400 transition-colors duration-200"
              size={20}
            />
          </motion.button>
        </div>
        
        <p className="text-sm sm:text-sm max-h-[76px] sm:max-h-[76px] text-gray-600 dark:text-gray-400 mb-2 sm:mb-4 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent flex-grow">
          {project.description}
        </p>
  
        <div className="flex items-center justify-between mt-auto">
          <div className="overflow-hidden">
            {project.tags && renderTags(project.tags)}
          </div>
              
          <motion.div
            animate={{
              x: isHovered ? 0 : 5,
              opacity: isHovered ? 1 : 0.7,
            }}
            transition={{ duration: 0.2 }}
            className="flex items-center text-xs sm:text-xs text-primary gap-1 flex-shrink-0 p-1 mr-1"
          >
            {/* <span className="hidden sm:inline">View Details</span> */}
            <ArrowRight size={16} className="sm:w-4 sm:h-4" />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectItem;

