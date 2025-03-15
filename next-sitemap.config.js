/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://mcp.ad',
  generateRobotsTxt: true,
  outDir: './public',
  
  // 添加 App Router 支持
  additionalPaths: async (config) => {
    const paths = [
      // 基础路由
      { loc: '/' },
      { loc: '/terms-of-service' },
      { loc: '/privacy-policy' },
      { loc: '/submit' },
      
      // app 目录下的路由
      { loc: '/blog' },
      { loc: '/categories' },
      { loc: '/category' },
      { loc: '/clients' },
      { loc: '/servers' }
    ]
    
    return paths
  },
  
  // 确保正确处理动态路由
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString()
    }
  }
}