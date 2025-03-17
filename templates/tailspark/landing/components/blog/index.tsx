/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-03-05 01:06:33
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-18 00:55:48
 */
"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Blog({ isHomePage = false }: { isHomePage?: boolean }) {
  return (
    <div className="relative pb-16 pt-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/50" />
      
      <div className="relative container mx-auto px-4">
        {/* 标题区域保持不变 */}
        <div className="text-center mb-16">
          {isHomePage ? (
            <>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4 py-2 leading-relaxed"
              >
                MCP Blog
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              >
                Exploring the Latest Dynamics, Technical Articles, and Usage Guides of MCP Server
              </motion.p>
            </>
          ) : (
            <>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4 py-2 leading-relaxed"
              >
                MCP Blog
              </motion.h1>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              >
                Exploring the Latest Dynamics, Technical Articles, and Usage Guides of MCP Server
              </motion.h2>
            </>
          )}
        </div>

        {/* 修改博客卡片列表布局 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          {isHomePage ? (
            // 首页样式：flex 布局
            <div className="flex flex-wrap justify-center gap-4">
              {/* 第一篇博客卡片 */}
              <Link href="/blog/1" className="group flex-grow-0 min-w-[280px] max-w-[400px] w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    Introducing the Model Context Protocol
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      March 2, 2025
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      3 min read
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm">
                    We are pleased to announce the launch of a range of new features on the MCP tool site...
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    Read more
                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
              
              {/* 其他两篇博客卡片使用相同结构 */}
              {/* 第二篇博客卡片 */}
              <Link href="/blog/2" className="group flex-grow-0 min-w-[280px] max-w-[400px] w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    How to Get Started Using MCP
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      March 10, 2025
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      5 min read
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm">
                    The Model Context Protocol (MCP) is revolutionizing how AI assistants access and interact with your data...
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    Read more
                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
              
              {/* 第三篇博客卡片 */}
              <Link href="/blog/3" className="group flex-grow-0 min-w-[280px] max-w-[400px] w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    AI is Making Websites Obsolete with MCP
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      March 15, 2025
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      4 min read
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm">
                    Traditional websites are facing a paradigm shift as AI-powered interfaces using the Model Context Protocol...
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    Read more
                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          ) : (
            // 非首页保持原有的 grid 布局和样式
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* 第一篇博客卡片 */}
              <Link href="/blog/1" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <img 
                      src="https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F3aabd8804251c0364cbde9d2e4be6dc8e8c2faec-2880x1620.png&w=3840&q=75" 
                      alt="Introducing the Model Context Protocol" 
                      className="w-full h-[220px] object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        March 2, 2025
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        3 min read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-600 dark:text-white mb-3 group-hover:text-primary transition-colors">
                      Introducing the Model Context Protocol
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm">
                      We are pleased to announce the launch of a range of new features on the MCP tool site...
                    </p>
                  </div>
                </div>
              </Link>
              
              {/* 其他博客卡片使用相同结构 */}
              {/* 第二篇博客卡片 */}
              <Link href="/blog/2" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <img 
                      src="https://storage.googleapis.com/pulse_public/posts/ai-is-making-websites-obsolete-with-mcp/post-thumbnail.png" 
                      alt="How to Get Started Using MCP" 
                      className="w-full h-[220px] object-contain transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        March 10, 2025
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        5 min read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-600 dark:text-white mb-3 group-hover:text-primary transition-colors">
                      How to Get Started Using MCP
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm">
                      The Model Context Protocol (MCP) is revolutionizing how AI assistants access and interact with your data...
                    </p>
                  </div>
                </div>
              </Link>
              
              {/* 第三篇博客卡片 */}
              <Link href="/blog/3" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <img 
                      src="https://storage.googleapis.com/pulse_public/posts/ai-is-making-websites-obsolete-with-mcp/post-thumbnail.png" 
                      alt="AI is Making Websites Obsolete with MCP" 
                      className="w-full h-[220px] object-contain transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        March 15, 2025
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        4 min read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-600 dark:text-white mb-3 group-hover:text-primary transition-colors">
                      AI is Making Websites Obsolete with MCP
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm">
                      Traditional websites are facing a paradigm shift as AI-powered interfaces using the Model Context Protocol...
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}