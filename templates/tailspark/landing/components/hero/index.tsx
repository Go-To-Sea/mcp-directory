/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-23 11:54:06
 */
"use client";

import BgStar from "../../assets/imgs/bgstar.svg";
import Buttons from "./buttons";
import { Hero } from "@/types/landing";
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default ({ hero, count }: { hero: Hero; count?: number }) => {
  const pathname = usePathname();
  const t = useTranslations('hero');

  // 修改路径判断逻辑
  const isServersPage = pathname.includes('/servers');
  const isClientsPage = pathname.includes('/clients');

  const getStoredText = () => {
    if (isServersPage) {
      return t('stored.servers');
    } else if (isClientsPage) {
      return t('stored.clients');
    }
    return t('stored.default');
  };

  const renderTitles = () => {
    if (isServersPage) {
      return (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-foreground dark:text-[#fff] leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="">{t('discover')} </span>
            <span className="bg-gradient-to-r ml-3 from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {t('servers.title')}
            </span>
          </h1>
          <h2 className="text-muted-foreground text-base sm:text-lg lg:text-xl">
            {t('servers.subtitle')}
          </h2>
        </div>
      );
    } else if (isClientsPage) {
      return (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-foreground dark:text-[#fff] leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="">{t('discover')} </span>
            <span className="bg-gradient-to-r ml-3 from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {t('clients.title')}
            </span>
          </h1>
          <h2 className="text-muted-foreground text-base sm:text-lg lg:text-xl">
            {t('clients.subtitle')}
          </h2>
        </div>
      );
    }else {
      return (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-foreground dark:text-[#fff] leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span>{t('home.find')} </span>
            <span className="bg-gradient-to-r ml-3 from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {t('home.title')}
            </span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl">
            {t('home.subtitle')}
          </p>
        </div>
      );
      
    }
  };

  const getStoredLink = () => {
    if (isServersPage) {
      return pathname; // 返回当前完整路径，保留语言前缀
    } else if (isClientsPage) {
      return pathname;
    }
    return pathname;
  };

  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-4 mt-10 md:mt-14">
        <div className="mx-auto w-full text-center">
          <a href={getStoredLink()} className="dark:bg-[#000] mx-auto mb-3 inline-flex items-center gap-3 rounded-full border border-primary px-2 py-1 text-sm">
            <span className="inline-flex items-center text-white rounded-full border-primary px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-primary text-primary-foreground">
              {count}
            </span>
            <span className="dark:text-[#fff]">{getStoredText()}</span>
          </a>
          <div className="flex items-center justify-center mt-3">
            {renderTitles()}
          </div>
         
        </div>
      </div>
      <Buttons />
    </section>
  );
};
