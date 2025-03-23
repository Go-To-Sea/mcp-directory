/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./i18n/request.ts');

const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
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