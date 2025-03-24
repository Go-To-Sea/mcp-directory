import createMiddleware from 'next-intl/middleware';
 
// next-intl 4.x 版本的正确配置
export default createMiddleware({
  locales: ['en', 'zh', 'ja', 'ko'],
  defaultLocale: 'en',
  localeDetection: false
});
 
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};