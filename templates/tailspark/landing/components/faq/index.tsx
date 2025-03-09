"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import type { Section } from "@/types/landing"
import { Plus, Minus } from "lucide-react"

export default function ({ section }: { section?: Section }) {
  // 修改为数组，用于存储多个激活的索引
  const [activeIndices, setActiveIndices] = useState<number[]>([])

  const toggleFAQ = (index: number) => {
    // 切换逻辑：如果索引已存在则移除，否则添加
    setActiveIndices(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    )
  }

  return (
    <div className="container mx-auto max-w-6xl px-5 py-8 md:px-10 md:py-12 lg:py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          {section?.title}
        </h2>
        <p className="mt-1 font-medium text-muted-foreground max-w-xl mx-auto">{section?.description}</p>
      </div>

      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {section?.items?.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
          >
            <motion.div
              className={`p-5 cursor-pointer rounded-xl transition-all duration-300 ${
                activeIndices.includes(index) ? "bg-primary/5 shadow-sm" : "hover:bg-gray-50 dark:hover:bg-gray-900/30"
              }`}
              onClick={() => toggleFAQ(index)}
              layout
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      activeIndices.includes(index)
                        ? "bg-primary text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </motion.div>
                  <h3
                    className={`font-medium text-lg transition-colors duration-300 ${
                      activeIndices.includes(index) ? "text-primary" : ""
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center justify-center h-8 w-8 rounded-full transition-colors duration-300 ${
                    activeIndices.includes(index)
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {activeIndices.includes(index) ? <Minus size={16} /> : <Plus size={16} />}
                </motion.div>
              </div>

              <AnimatePresence>
                {activeIndices.includes(index) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      transition: {
                        height: { duration: 0.3 },
                        opacity: { duration: 0.3, delay: 0.1 },
                      },
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      transition: {
                        height: { duration: 0.3 },
                        opacity: { duration: 0.2 },
                      },
                    }}
                  >
                    <motion.div
                      className="pl-12 pt-4 text-muted-foreground"
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      {item.description}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Subtle divider instead of border */}
            {index < section.items!.length - 1 && (
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent mx-4" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

