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
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default ({
  projects,
  loading,
  viewType,
  projectType,
  classMenus
}: {
  projects: Project[]
  loading?: boolean
  viewType?: 'default' | 'class',
  projectType?: 'server' | 'client',
  classMenus?: ClassMenus[]
}) => {
    const pathname = usePathname()
    const t = useTranslations('projects')
    let filterProjects: Project[] = []
    if(projectType) {
      filterProjects = projects.filter(p => p.type === projectType )
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
              {servers.slice(0, 8).map((item: Project, idx: number) => (
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
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {clients.slice(0, 8).map((item: Project, idx: number) => (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {(projectType ? filterProjects : projects).map((item: Project, idx: number) => (
              <ProjectItem key={idx} project={item} />
            ))}
          </div>
        ) : (
          <div className="mx-auto text-center">{t('loading')}</div>
        )}
      </div>
    </section>
  )
}

