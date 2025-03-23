import {getRequestConfig} from 'next-intl/server';
 
// next-intl 4.x 版本的正确用法
export default getRequestConfig(async ({locale}) => {
  // 确保 locale 有值
  const resolvedLocale = locale || 'en';
  
  return {
    messages: (await import(`../pagejson/${resolvedLocale}.json`)).default,
    locale: resolvedLocale  // 添加 locale 属性
  };
});