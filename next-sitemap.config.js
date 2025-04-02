/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://mcp.ad',
  generateRobotsTxt: false,
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
      { loc: '/blog/[id]' },
      { loc: '/categories' },
      { loc: '/category' },
      { loc: '/clients' },
      { loc: '/servers' },
      // 添加动态路由
      { loc: '/servers/[name]' },
      { loc: '/clients/[name]' }
    ]
    
    return paths
  },
  
  // 确保正确处理动态路由
  transform: async (config, path) => {
    // 处理动态路由参数
    if (path.includes('[id]')) {
      return null; // 跳过动态路由的 sitemap 生成
    }
    
    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString()
    }
  }
}