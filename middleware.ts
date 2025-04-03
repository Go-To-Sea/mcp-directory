import createMiddleware from 'next-intl/middleware';
import { pathnames } from './config/pathnames';

export default createMiddleware({
  locales: ['en', 'zh', 'ja', 'ko', 'pt', 'ru'],
  defaultLocale: 'en',
  localeDetection: false,
  localePrefix: 'always',
  pathnames, // 添加路径配置
});

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/(zh|en|ja|ko|pt|ru)/:path*'  // 修改匹配规则
  ]
};
