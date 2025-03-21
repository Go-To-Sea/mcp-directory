/*
 * @Author: YourName
 * @Date: 2025-03-07 10:38:35
 * @LastEditTime: 2025-03-21 23:07:45
 * @LastEditors: rendc
 * @Description: 
 * @FilePath: \mcp-directory\app\project\components\RecommendedProject.tsx
 * 版权声明
 */
'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import type { Project } from "@/types/project"
import Link from 'next/link'

export default function RecommendedProject({ 
  project 
}: { 
  project: Project  // 确保使用正确的 Project 类型
}) {
  const router = useRouter()

  return (
    <Link
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow cursor-pointer"
      href={`/project/${encodeURIComponent(project.name || '')}`}
    >
      <div className="flex items-center space-x-3 mb-3">
        <img
          src={project.author_avatar_url || "/logo.png"}
          alt={''}
          width={40}
          height={40}
          className="rounded-lg"
        />
        <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">
          {project.name}
        </h3>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
        {project.description}
      </p>
      {project.tags && (
        <div className="flex flex-wrap gap-1">
          {(typeof project.tags === 'string' ? project.tags.split(',') : project.tags)
            .slice(0, 2)
            .map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-xs text-primary"
              >
                #{tag.trim()}
              </span>
            ))}
        </div>
      )}
    </Link>
  )
}