/*
 * @Description: 分类标签组件
 * @Author: rendc
 * @Date: 2025-03-02
 */
"use client";
import { ClassMenus } from "@/types/project";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default (props: {
    classMenus?: ClassMenus[];
}) => {
  const categories = props.classMenus || [];
  const searchParams = useSearchParams();
  const currentTag = searchParams.get('category');
  const [isExpanded, setIsExpanded] = useState(true);
  
  const handleExpandToggle = () => {
    if (isExpanded) {
      // 收起时，将标签区域滚动到顶部
      const tagsContainer = document.getElementById('tags-container');
      if (tagsContainer) {
        tagsContainer.scrollTop = 0;
      }
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="max-w-full md:max-w-7xl mx-auto px-4 py-4 md:px-8 md:py-4 lg:py-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
        <div className="flex items-center justify-between w-full">
          <button
            onClick={handleExpandToggle}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp size={16} />
                <span>Collapse categories</span>
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                <span>Expand categories</span>
              </>
            )}
          </button>
          <div className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 p-2 rounded-full whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] sm:max-w-none">
            Current Category: <span className="text-primary font-medium">{currentTag || 'All'}</span>
          </div>
        </div>
      </div>
      
      <div id="tags-container" className={`flex flex-wrap gap-2 transition-all duration-300 ease-in-out ${
        isExpanded 
          ? 'opacity-100 max-h-[800px] pt-1' 
          : 'opacity-0 max-h-0 pt-0'
      }`}>
        {categories.map((category, index) => (
          <Link 
            href={category.href} 
            key={index} 
            className={`flex-shrink-0 border rounded-[4px] py-1.5 px-4 transition-all duration-200 
              ${currentTag === category.name 
                ? 'border-primary bg-primary/5 text-primary shadow-sm hover:shadow' 
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 shadow-xs hover:shadow-sm'
              }`}
          >
            <div className="flex justify-center items-center gap-1.5">
              <span className={`text-xs font-medium whitespace-nowrap ${
                currentTag === category.title 
                ? 'text-primary' 
                : 'text-gray-700 dark:text-gray-200'
              }`}>{category.title}</span>
              <span className={`text-[10px] whitespace-nowrap ${
                currentTag === category.title 
                ? 'text-primary/80' 
                : 'text-gray-500 dark:text-gray-400'
              }`}>{category.count}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};