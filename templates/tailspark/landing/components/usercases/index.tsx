"use client"

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

// 更新类型定义
type UserCase = {
  id: string;
  title?: string;
  description: string;
  video: string;
  twitterLink: string;
  author: {
    name: string;
    avatar: string;
    handle: string;
    role?: string;
    company?: string;
  };
};

export default function UserCases() {
  const t = useTranslations('usercases');
  
  const usercases: UserCase[] = [
    {
      id: 'case1',
      description: `🧩 Built an MCP that lets Claude talk directly to Blender. It helps you create beautiful 3D scenes using just prompts!
          Here's a demo of me creating a "low-poly dragon guarding treasure" scene in just a few sentences👇`,
      video: 'https://video.twimg.com/ext_tw_video/1899457044270465024/pu/vid/avc1/480x270/0YAL1mvmXhQ0xAmL.mp4?tag=14',
      twitterLink: 'https://twitter.com/siddharthj/status/1899457048485945476',
      author: {
        name: 'Siddharth Ahuja',
        avatar: 'https://pbs.twimg.com/profile_images/1674577235571064833/zzv9SJwj_400x400.jpg',
        handle: '@siddharthj'
      }
    },
    {
      id: 'case2',
      description: `You can now clone any website just by writing a prompt. Simply add the new Firecrawl MCP server to your favorite AI coding tool for improved web data extraction, and let Claude code it for you. Here's how:`,
      video: 'https://video.twimg.com/amplify_video/1896628818493706240/vid/avc1/426x270/mfM8tB15jTePe74P.mp4?tag=16',
      twitterLink: 'https://twitter.com/dr_cintas/status/1896628905290891520',
      author: {
        name: 'Alvaro Cintas',
        avatar: 'https://pbs.twimg.com/profile_images/1587654321098765432/abcdefgh_400x400.jpg',
        handle: '@dr_cintas'
      }
    },

    {
      id: 'case3',
      description: `The Perplexity API Model Context Protocol (MCP) is now available.
We've built an MCP server for Sonar, giving AI assistants real-time, web search research capabilities.
Powered by Perplexity, Claude can now search the web and deliver real-time and accurate insights on demand.`,
      video: 'https://video.twimg.com/amplify_video/1899849059420282880/vid/avc1/320x434/M23YA0oJfFXh6Hlv.mp4?tag=14',
      twitterLink: 'https://twitter.com/perplexity_ai/status/1899849114583765356',
      author: {
        name: 'Perplexity',
        avatar: 'https://pbs.twimg.com/profile_images/1234567890987654321/hijklmno_400x400.jpg',
        handle: '@perplexity_ai'
      }
    },
  
  ];

  return (
    <div className="relative">
      {/* 背景网格 */}
      <div className="fixed inset-0 w-full flex justify-center">
        <div className="w-full max-w-[1920px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" className="-z-50 absolute hidden opacity-25 [mask-image:linear-gradient(to_right,white,transparent,transparent,white)] lg:block">
            <g clipPath="url(#clip0_4_5)">
              <rect width="1920" height="1080"></rect>
              <line y1="49.5" x2="1920" y2="49.5" className="stroke-muted-foreground"></line>
              {/* 更多网格线... */}
            </g>
            <defs>
              <clipPath id="clip0_4_5">
                <rect width="1920" height="1080" fill="#000000"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      {/* 页面标题部分 */}
      <div className="mx-auto max-w-7xl w-full flex flex-col items-center justify-center px-4 pt-24 pb-12">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4 animate-gradient-x">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* 用户案例卡片 - 推特风格 */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {usercases.map((usercase) => (
            <div key={usercase.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* 作者信息 */}
              <div className="p-3 sm:p-4 flex items-start justify-between">
                <div className="flex items-center">
                  {/* 头像部分保持不变 */}
                  <div className="ml-2 sm:ml-3">
                    <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">{usercase.author.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{usercase.author.handle}</p>
                  </div>
                </div>
                
                {/* 推特链接 */}
                <a 
                  href={usercase.twitterLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                  aria-label="View on Twitter"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
              
              {/* 描述 */}
              <div className="px-3 sm:px-4 pb-3">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed">{usercase.description}</p>
              </div>
              
              {/* 视频 */}
              {usercase.video && (
                <div className="border-t border-b border-gray-200 dark:border-gray-700">
                  <div className="h-[200px] sm:h-[250px] w-full relative">
                    <video
                      src={usercase.video}
                      autoPlay
                      muted
                      loop
                      controls
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                      poster="/images/video-poster.jpg"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}
