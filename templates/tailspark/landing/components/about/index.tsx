"use client"
import { HiOutlineMail } from "react-icons/hi";
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function About() {
  const t = useTranslations('about');
  const locale = useLocale();
  
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center mb-8">
        <div className="text-sm text-gray-500">
          <Link href={`/${locale}`} className="hover:text-primary">{t('nav.home')}</Link>
          <span className="mx-2">›</span>
          <span>{t('nav.about')}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 rounded-2xl"></div>
        
        <div className="relative">
          {/* Main Title and Contact */}
          <h1 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            {t('title')}
          </h1>
          <h2 className="text-sm text-gray-600 dark:text-gray-400 mb-8 flex items-center gap-1">
            {t('contact.question')}{' '}
            <a href="mailto:support@mcp.ad" className="text-primary font-medium inline-flex items-center gap-1 transition-transform hover:scale-105">
              <HiOutlineMail className="w-4 h-4" />
              support@mcp.ad
            </a>
          </h2>

          {/* Welcome Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">{t('welcome.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('welcome.content')}
            </p>
          </section>

          {/* Vision Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">{t('vision.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('vision.content')}
            </p>
          </section>

          {/* What We Do Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">{t('whatWeDo.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {t('whatWeDo.content')}
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-600 dark:text-gray-300">
              <li>{t('whatWeDo.item1')}</li>
              <li>{t('whatWeDo.item2')}</li>
              <li>{t('whatWeDo.item3')}</li>
              <li>{t('whatWeDo.item4')}</li>
            </ul>
          </section>

          {/* For Everyone Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">{t('forEveryone.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('forEveryone.content')}
            </p>
          </section>

          {/* Journey Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">{t('journey.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('journey.content')}
            </p>
          </section>

          {/* Contact Section */}
          <section className="bg-primary/5 dark:bg-primary/10 p-6 rounded-xl text-center backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-4">{t('getInTouch.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {t('getInTouch.content')}
            </p>
            <a 
              href="mailto:support@mcp.ad" 
              className="text-primary text-lg font-medium inline-flex items-center gap-1 transition-transform hover:scale-105"
            >
              <HiOutlineMail className="w-4 h-4" />
              support@mcp.ad
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}