/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-18 00:55:15
 */
"use client"


import { Project, ClassMenus } from "@/types/project"  // 添加 ClassMenus 导入
import ClassMenusComponent from "./classMenus"  // 保持导入名称
import ProjectItem from "./item"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { usePathname } from 'next/navigation'

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
    let filterProjects: Project[] = []
    if(projectType) {
      filterProjects = projects.filter(p => p.type === projectType )
    }
    console.log('classMenus========',classMenus)
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
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
                >
                  MCP Servers
                </motion.h2>
                <div className="h-1 w-16 sm:w-20 bg-primary mt-2 rounded-full"></div>
              </div>
              <Link 
                href="/servers"
                className="group flex items-center text-primary hover:text-primary/80 transition-colors gap-1 sm:gap-2 text-xs sm:text-sm font-medium"
              >
                View All Servers
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
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
                >
                  MCP Clients
                </motion.h2>
                <div className="h-1 w-16 sm:w-20 bg-primary mt-2 rounded-full"></div>
              </div>
              <Link 
                href="/clients"
                className="group flex items-center text-primary hover:text-primary/80 transition-colors gap-1 sm:gap-2 text-xs sm:text-sm font-medium"
              >
                <p>View All Clients</p>
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
      {(pathname === '/servers' || pathname === '/clients') && <ClassMenusComponent classMenus={classMenus} />}
      <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
        {!loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {(projectType ? filterProjects : projects).map((item: Project, idx: number) => (
              <ProjectItem key={idx} project={item} />
            ))}
          </div>
        ) : (
          <div className="mx-auto text-center">Loading data...</div>
        )}
      </div>
    </section>
  )
}

