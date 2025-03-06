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
];

export default (props: {
    projects?: ClassMenus[];
  }) => {
  return (
    <>
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