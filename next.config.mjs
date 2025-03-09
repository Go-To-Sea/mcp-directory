/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
};

export default nextConfig;
