/*
 * @Description: 分类标签组件
 * @Author: rendc
 * @Date: 2025-03-02
 */
"use client";
import { ClassMenus } from "@/types/project";
import Link from "next/link";

// 定义分类数据类型
interface Category {
  name: string;
  count: number;
  href: string;
}

// 分类数据
const categories: Category[] = [
  { name: "All", count: 1536, href: "/servers" },
  { name: "Developer Tools", count: 969, href: "/servers?category=developer-tools" },
  { name: "Research And Data", count: 389, href: "/servers?category=research-and-data" },
  { name: "Cloud Platforms", count: 38, href: "/servers?category=cloud-platforms" },
  { name: "Browser Automation", count: 17, href: "/servers?category=browser-automation" },
  { name: "Databases", count: 11, href: "/servers?category=databases" },
  { name: "AI Chatbot", count: 3, href: "/servers?category=ai-chatbot" },
  { name: "File Systems", count: 4, href: "/servers?category=file-systems" },
  { name: "Os Automation", count: 8, href: "/servers?category=os-automation" },
  { name: "Finance", count: 12, href: "/servers?category=finance" },
  { name: "Communication", count: 15, href: "/servers?category=communication" },
  { name: "Cloud Storage", count: 5, href: "/servers?category=cloud-storage" },
  { name: "Knowledge And Memory", count: 12, href: "/servers?category=knowledge-and-memory" },
  { name: "Entertainment And Media", count: 5, href: "/servers?category=entertainment-and-media" },
  { name: "Calendar Management", count: 5, href: "/servers?category=calendar-management" },
  { name: "Database", count: 1, href: "/servers?category=database" },
  { name: "Location Services", count: 3, href: "/servers?category=location-services" },
  { name: "Customer Data Platforms", count: 1, href: "/servers?category=customer-data-platforms" },
  { name: "Security", count: 4, href: "/servers?category=security" },
  { name: "Monitoring", count: 4, href: "/servers?category=monitoring" },
  { name: "Virtualization", count: 1, href: "/servers?category=virtualization" },
];

export default (props: {
    projects?: ClassMenus[];
  }) => {
  return (
    <>
    <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin; /* Firefox */
          scrollbar-color: rgba(128, 128, 128, 0.5) transparent; /* Firefox */
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px; /* 滚动条宽度 */
          height: 6px; /* 滚动条高度 */
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; /* 轨道背景 */
          border-radius: 10px; /* 轨道圆角 */
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(128, 128, 128, 0.5); /* 滚动条颜色 */
          border-radius: 10px; /* 滚动条圆角 */
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(128, 128, 128, 0.7); /* 滚动条悬停颜色 */
        }
      `}</style>
    <div className="max-w-full md:max-w-7xl mx-auto px-4 py-4 md:px-8 md:py-4 lg:py-4">
      <div className="flex overflow-x-auto custom-scrollbar gap-1 md:gap-2 pb-4  ">
        {categories.map((category, index) => (
          <Link href={category.href} key={index} className="flex-shrink-0 border-2 rounded-full py-2 px-4 shadow-sm hover:shadow-md  transition-all duration-200 border-gray-100 dark:border-gray-800 bg-slate-50 dark:bg-slate-900">
    <div className="flex justify-between items-center  gap-1">
                <span className="text-xs md:text-xs font-medium whitespace-nowrap">{category.name}</span>
                <span className="text-primary text-xs whitespace-nowrap">{category.count}</span>
              </div>
          </Link>
        ))}
      </div>
    </div>
    
    </>
  );
};