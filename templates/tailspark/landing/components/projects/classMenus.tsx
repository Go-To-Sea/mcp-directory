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
  const currentTag = searchParams.get('tag');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="max-w-full md:max-w-7xl mx-auto px-4 py-4 md:px-8 md:py-4 lg:py-4">
      <div className="flex items-center gap-4 mb-2">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp size={16} />
                <span>Collapse Tags</span>
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                <span>Expand Tags</span>
              </>
            )}
          </button>
          <span className="text-xs text-gray-500 ml-8">
            Current Category: <span className="text-primary font-medium">{currentTag || 'All'}</span>
          </span>
        </div>
      </div>
      
      <div className={`flex flex-wrap gap-2 transition-all duration-300 ${
        isExpanded ? 'max-h-[1000px]' : 'max-h-[126px]'
      } overflow-hidden`}>
        {categories.map((category, index) => (
          <Link 
            href={category.href} 
            key={index} 
            className={`flex-shrink-0 border-2 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-all duration-200 
              ${currentTag === category.name 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-gray-100 dark:border-gray-800 bg-slate-50 dark:bg-slate-900'
              }`}
          >
            <div className="flex justify-center items-center gap-1">
              <span className={`text-xs md:text-xs font-medium whitespace-nowrap ${
                currentTag === category.name ? 'text-primary' : ''
              }`}>{category.name}</span>
              <span className="text-primary text-xs whitespace-nowrap">{category.count}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};