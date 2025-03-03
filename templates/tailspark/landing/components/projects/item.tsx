/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-04 02:00:22
 */
/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-02 10:55:20
 */
"use client"

import { Star } from "lucide-react"
import { Project } from "@/types/project";
import { usePathname, useRouter } from "next/navigation"


export default ({ project }: { project: Project }) => {
  const pathname = usePathname()
  const router = useRouter()
  const handleClick = (url:string | undefined) => {
    window.open(url,'_blank')
  };
  return (
    
    <div onClick={()=>handleClick(project.url)} className="mb-6 gap-6 cursor-pointer bg-background rounded-xl border border-gray-300 dark:border-gray-700 p-4 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className={`  rounded-md flex items-center justify-center mr-3`}>
            <img src={project.author_avatar_url  || "/logo.png"} alt={project.name} className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-medium">{project.name}</h3>
            {project.author_name && <p className="text-sm text-gray-500">by {project.author_name}</p>}
          </div>
        </div>
          <Star className="fill-yellow-400" size={15} />
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {/* {tags.map((tag, index) => (
          <span key={index} className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-800">
            # {tag}
          </span>
        ))} */}

        <a href="#" className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  )
}