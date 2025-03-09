'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import type { Project } from "@/types/project"
import Markdown from "@/components/markdown";
import Header from "../../../templates/tailspark/landing/components/header";

interface ProjectContentProps {
  project: Project;
  tags: string[];
}

export default function ProjectContent({ project, tags }: ProjectContentProps) {
  return (
    <>
      {/* <Header header={{}}></Header> */}
      {/* 项目头部信息 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8 hover:shadow-md transition-shadow duration-300"
      >
        <div className="flex items-start gap-6">
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {project.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-sm text-primary"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 项目详细信息 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2 flex flex-col"
        >
          {/* 在移动端显示的作者信息卡片 */}
          <div className="md:hidden bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white hover:text-primary transition-colors duration-200">
              Author
            </h3>
            <div className="flex items-center gap-3">
              <Image
                src={project.author_avatar_url || "/logo.png"}
                alt={project.author_name || ""}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {project.author_name}
                </p>
              </div>
            </div>
            
            {/* 链接部分 */}
            {(project.url || project.github_url) && (
              <>
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-4" />
                <div className="flex flex-wrap gap-4">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span>Website</span>
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    >
                      <Github size={16} />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
{/* 主要内容区 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300 min-h-[400px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white hover:text-primary transition-colors duration-200">
              About
            </h2>
            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: project.content || 'Continuous updates...' }} 
            />
          </div>
        </motion.div>

        {/* 桌面端显示的作者信息卡片 */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden md:block space-y-6"
        >
          {/* 参考资料卡片 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300 min-h-[400px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white hover:text-primary transition-colors duration-200">
              Related Resources
            </h2>
            <div className="text-gray-500 dark:text-gray-400">
              
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}