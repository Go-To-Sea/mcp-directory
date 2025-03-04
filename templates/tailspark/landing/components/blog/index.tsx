/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-03-05 01:06:33
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-05 01:14:26
 */
"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Blog() {
  return (
    <div className="relative py-16">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/50" />
      
      <div className="relative container mx-auto px-4">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            MCP Blog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            探索 MCP 的最新动态、技术文章和使用指南
          </motion.p>
        </div>

        {/* 博客卡片 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <Link href="/blog/1" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src="https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F3aabd8804251c0364cbde9d2e4be6dc8e8c2faec-2880x1620.png&w=3840&q=75" 
                  alt="Blog Cover" 
                  className="w-full  h-[300px] object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    2024年11月25日
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    3 min read
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                Introducing the Model Context Protocol
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                  我们很高兴地宣布 MCP 工具站推出了一系列新功能，包括更强大的搜索功能、优化的用户界面以及全新的开发者工具集成...
                </p>
                
                <div className="flex items-center text-primary font-medium">
                  阅读更多
                  <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}