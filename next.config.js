/** @type {import('next').NextConfig} */
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
  },
}

module.exports = nextConfig