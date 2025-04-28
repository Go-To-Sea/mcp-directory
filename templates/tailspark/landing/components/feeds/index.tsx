"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Project } from "@/types/project"
import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from 'date-fns'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl'
import { zhCN, enUS } from 'date-fns/locale'
import { useLocale } from 'next-intl'

export default function Feeds({submitList}:{
  submitList: Project[]
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const t = useTranslations('feeds')
  const locale = useLocale()

  const handleSubmitClick = (e: React.MouseEvent) => {
    router.push(`/${locale}/submit`);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen overflow-x-hidden">
      <div className="container mx-auto max-w-6xl px-2 sm:px-5 py-6 sm:py-8 md:py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
                {t('title')}
              </h1>
              <h2 className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {t('subtitle')}
              </h2>
            </div>
            <Link 
              href={`/${locale}/submit`}
              className="text-primary underline underline-offset-2 transition-colors text-sm sm:text-base"
            >
              {t('submit')}
            </Link>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 w-full">
          {submitList.map((project, index) => (
            <Link 
              key={project.uuid}
              href={`/${locale}/${project.type}s/${project.name}`}
              className="block w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 md:p-6 shadow-sm hover:shadow-md transition-all w-full"
              >
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4 w-full">
                  <div className="flex-shrink-0">
                    <img
                      src={project.author_avatar_url || project.avatar_url || "/logo.png"}
                      alt={project.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover sm:w-8 sm:h-8 md:w-12 md:h-12"
                    />
                  </div>
                  <div className="flex-1 min-w-0 pr-1 sm:pr-2">
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                      <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors truncate">
                        {project.name}
                      </span>
                      <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                        project.type === 'client' 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                      }`}>
                        {project.type}
                      </span>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2 md:mb-3 break-words">
                      {project.description}
                    </p>
                    
                    {project.tags && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                        {(typeof project.tags === 'string' ? project.tags.split(',') : project.tags).map((tag, i) => (
                          <Link 
                            key={i}
                            href={`/${locale}/categories/?tag=${tag || ''}`}
                            className="inline-flex items-center px-2.5 py-0.5 text-xs border transition-all cursor-pointer hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-purple-500/5"
                            style={{
                              background: "linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))",
                              borderWidth: "1px",
                              borderStyle: "solid",
                              borderImageSlice: 1,
                              borderImageSource: "linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))"
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span 
                              className="bg-clip-text text-transparent" 
                              style={{
                                backgroundImage: "linear-gradient(to right, rgba(59, 130, 246, 0.8), rgba(139, 92, 246, 0.8))"
                              }}
                            >
                              #{tag.trim()}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {project.author_name && (
                        <>
                          <span>{t('by')} {project.author_name}</span>
                          <span>•</span>
                        </>
                      )}
                      <span>
                        {project.submit_time ? 
                          formatDistanceToNow(new Date(project.submit_time), { 
                            addSuffix: true,
                            locale: locale === 'zh' ? zhCN : enUS 
                          }) :
                          formatDistanceToNow(new Date(project.created_at || ''), { 
                            addSuffix: true,
                            locale: locale === 'zh' ? zhCN : enUS 
                          })}
                      </span>
                      {project.url && (
                        <>
                          <span>•</span>
                          <Link 
                            href={project.url}
                            target="_blank"
                            className="text-primary hover:text-primary/80 transition-colors"
                            onClick={(e) => e.stopPropagation()}  // 添加阻止冒泡
                          >
                            {t('visitWebsite')}
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

