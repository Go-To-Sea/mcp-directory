/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-04 22:55:39
 */
"use client"

import type React from "react"

import { Star, ExternalLink } from "lucide-react"
import type { Project } from "@/types/project"
import { useState } from "react"
import { motion } from "framer-motion"

export default ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isStarred, setIsStarred] = useState(false)

  const handleClick = (url: string | undefined) => {
    if (url) window.open(url, "_blank")
  }

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsStarred(!isStarred)
    // Here you would typically save this to user preferences
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="mb-2 h-[180px] cursor-pointer  bg-background rounded-xl border border-gray-300 dark:border-gray-700 p-5 shadow-md hover:shadow-xl transition-all duration-300"
      onClick={() => handleClick(project.url)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-start overflow-hidden max-w-[85%]">
          <div className="rounded-md flex items-center justify-center mr-3 min-w-[32px]">
            <motion.img
              src={project.author_avatar_url || "/logo.png"}
              alt={project.name}
              className="w-8 h-8 rounded-md object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <div className="overflow-hidden">
            <h3 className="font-medium text-base line-clamp-1 hover:text-primary transition-colors duration-200">
              {project.name}
            </h3>
            {project.author_name && <p className="text-xs text-gray-500 mt-1">by {project.author_name}</p>}
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

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 h-[40px]">{project.description}</p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-wrap gap-2">
          {/* {project.tags &&
            project.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs text-gray-800 dark:text-gray-200"
              >
                # {tag}
              </span>
            ))} */}
        </div>

        <motion.div
          animate={{
            x: isHovered ? 0 : 5,
            opacity: isHovered ? 1 : 0.7,
          }}
          transition={{ duration: 0.2 }}
          className="flex items-center text-xs text-primary gap-1"
        >
          <span className="hidden sm:inline">View Project</span>
          <ExternalLink size={14} />
        </motion.div>
      </div>
    </motion.div>
  )
}

