/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-23 11:55:00
 */
"use client"

import { Project, ClassMenus } from "@/types/project"
import ClassMenusComponent from "./classMenus"
import ProjectItem from "./item"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { usePathname, useSearchParams } from 'next/navigation'  // 添加 useSearchParams
import { useTranslations } from 'next-intl'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default ({
  projects,
  loading,
  viewType,
  projectType,
  classMenus,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}: {
  projects: Project[]
  loading?: boolean
  viewType?: 'default' | 'class',
  projectType?: 'server' | 'client',
  classMenus?: ClassMenus[]
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}) => {
  console.log('currentPage',currentPage)
  console.log('totalPages',totalPages)
    const pathname = usePathname()
    const searchParams = useSearchParams()  // 添加这行
    const t = useTranslations('projects')
    let filterProjects: Project[] = []
    if(projectType) {
      filterProjects = projects
    }
  if (viewType === 'class') {
    const servers = projects.filter(p => p.type === 'server')
    const clients = projects.filter(p => p.type === 'client')
    return (
      <section className="relative space-y-12 " >
        <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
          {/* Servers Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-900 dark:text-white"
                >
                  {t('servers.title')}
                </motion.h2>
                <div className="h-1 w-16 sm:w-20 bg-primary mt-2 rounded-full"></div>
              </div>
              <Link 
                href="/servers"
                className="group flex items-center text-primary hover:text-primary/80 transition-colors gap-1 sm:gap-2 text-xs sm:text-sm font-medium"
              >
                {t('servers.viewAll')}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {servers.slice(0,8).map((item: Project, idx: number) => (
                <ProjectItem key={idx} project={item} pathPrefix={'/servers'}/>
              ))}
            </div>
          </div>

          {/* Clients Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-900 dark:text-white"
                >
                  {t('clients.title')}
                </motion.h2>
                <div className="h-1 w-16 sm:w-20 bg-primary mt-2 rounded-full"></div>
              </div>
              <Link 
                href="/clients"
                className="group flex items-center text-primary hover:text-primary/80 transition-colors gap-1 sm:gap-2 text-xs sm:text-sm font-medium"
              >
                {t('clients.viewAll')}
                <ArrowRight className="group-hover:projectstranslate-x-1 transition-transform" size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {clients.slice(0,8).map((item: Project, idx: number) => (
                <ProjectItem key={idx} project={item} pathPrefix={'/clients'}/>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
  // 默认视图
  return (
    <section className="relative">
      <span className="tags"></span>
      <span className="tags"></span>
      {pathname.includes('/servers') || pathname.includes('/clients') ? (
        <ClassMenusComponent classMenus={classMenus} />
      ) : null}
      <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
        {!loading ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* 添加数据分页切片 */}
              {(projectType ? filterProjects : projects)
                .map((item: Project, idx: number) => (
                  <ProjectItem key={idx} project={item} />
              ))}
            </div>
            
            {/* 分页组件部分保持不变 */}
            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href={`${pathname}?${new URLSearchParams({
                        ...Object.fromEntries(searchParams.entries()),
                        page: (currentPage - 1).toString()
                      })}`}
                      className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  
                  {/* 修改分页逻辑 */}
                  {(() => {
                    const pages = [];
                    for (let i = 1; i <= totalPages; i++) {
                      if (
                        i === 1 ||
                        i === totalPages ||
                        (i >= currentPage - 1 && i <= currentPage + 1)
                      ) {
                        pages.push(
                          <PaginationItem key={i}>
                            <PaginationLink
                              href={`${pathname}?${new URLSearchParams({
                                ...Object.fromEntries(searchParams.entries()),
                                page: i.toString()
                              })}`}
                              isActive={currentPage === i}
                            >
                              {i}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      } else if (i === currentPage - 2 || i === currentPage + 2) {
                        pages.push(
                          <PaginationItem key={i}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                    }
                    return pages;
                  })()}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href={`${pathname}?${new URLSearchParams({
                        ...Object.fromEntries(searchParams.entries()),
                        page: (currentPage + 1).toString()
                      })}`}
                      className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        ) : (
          <div className="mx-auto text-center">{t('loading')}</div>
        )}
      </div>
    </section>
  )
}

