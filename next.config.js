/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-03-08 16:46:19
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-23 15:41:07
 */
/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./i18n/request.ts');

const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'video.twimg.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'r2.trys.ai',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'chatsum.ai',
        port: '',
        pathname: '/**',
      },
    ],
  }
}

module.exports = withNextIntl(nextConfig);