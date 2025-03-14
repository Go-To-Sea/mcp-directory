/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-11 01:01:10
 */
"use client"

import type React from "react"

import { Star, ExternalLink } from "lucide-react"
import type { Project } from "@/types/project"
import { useState } from "react"
import { motion } from "framer-motion"
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'  // 添加这行导入

interface ProjectItemProps {
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const pathname = usePathname()
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isStarred, setIsStarred] = useState(false)
  
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
 
  
  // Move renderTags function inside the component
  // 修改 renderTags 函数
  const renderTags = (tags: string | string[]) => {
    const tagArray = typeof tags === 'string' ? tags.split(',') : tags;
    const basePath = pathname.split('?')[0];

    return (
      <div className="flex items-center gap-1 overflow-hidden whitespace-nowrap">
        {/* 第一个标签 */}
        {tagArray.length > 0 && (
          <motion.span
            key={0}
            className="inline-flex items-center transition-all"
          >
            <Link
              href={`${basePath}?tag=${encodeURIComponent(tagArray[0].trim())}`}
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
                #{tagArray[0].trim()}
              </span>
            </Link>
          </motion.span>
        )}
        
        {/* 第二个标签 */}
        <div className="overflow-hidden">
          {tagArray.slice(1, 2).map((tag, index) => (
            <motion.span
              key={index + 1}
              className="inline-flex items-center transition-all overflow-hidden"
            >
              <Link
                href={`${basePath}?tag=${encodeURIComponent(tag.trim())}`}
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
        </div>
        
        {tagArray.length > 2 && (
          <span className="text-[10px] sm:text-xs text-gray-500 flex-shrink-0">
            +{tagArray.length - 2}
          </span>
        )}
      </div>
    );
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="mb-2 h-[160px] sm:h-[180px] cursor-pointer bg-background rounded-xl border border-gray-300 dark:border-gray-700 p-3 sm:p-5 shadow-md hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    <Link 
      href={`/project/${encodeURIComponent(project.name || '')}`}
      className="block"
    >
        <div className="flex justify-between items-start mb-2 sm:mb-3">
          <div className="flex items-start overflow-hidden max-w-[85%]">
            <div className="rounded-md flex items-center justify-center mr-2 sm:mr-3 min-w-[24px] sm:min-w-[32px]">
              <motion.img
                src={project.author_avatar_url || "/logo.png"}
                alt={project.name}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-md object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="overflow-hidden">
              <h3 className="font-medium text-sm sm:text-base line-clamp-1 hover:text-primary transition-colors duration-200">
                {project.name}
              </h3>
              {project.author_name && (
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">
                  by {project.author_name}
                </p>
              )}
            </div>
          </div>
          <motion.button
            onClick={handleStarClick}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="min-w-[24px] flex items-center justify-center p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Star
              className="fill-yellow-400 text-yellow-400 transition-colors duration-200"
              size={18}
            />
          </motion.button>
        </div>
        
  
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-4 line-clamp-2 h-[32px] sm:h-[40px]">
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
            className="flex items-center text-[10px] sm:text-xs text-primary gap-1 flex-shrink-0 ml-2"
            onClick={handleProjectClick}
          >
            <span className="hidden sm:inline">View Details</span>
            <ExternalLink size={12} className="sm:w-4 sm:h-4" />
          </motion.div>
        </div>
    </Link>
      </motion.div>
  );
};

export default ProjectItem;

