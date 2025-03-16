/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-03-14 00:17:45
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-16 18:54:48
 */
// 移除 "use client" 指令
import SubmitForm from "@/templates/tailspark/landing/components/submit/index";
import { getFeaturedProjects } from "@/models/project";
import pageJson from "@/pagejson/en.json";
export async function generateMetadata() {
  return {
    title: `MCP Server&Client Submit | ${pageJson?.metadata?.title}`,
    description: `Share your MCP Server or Client with the global developer community. Join the largest Model Context Protocol ecosystem and help shape the future of AI integration.`,
    keywords: "MCP Server, MCP Client, Model Context Protocol, Claude Integration, AI Tools, Developer Community, Submit MCP, MCP Ecosystem",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/categories`,
    },
  };
}

// 客户端组件
export default function SubmitPage() {

  return (
    <div className="relative overflow-hidden">
      {/* 添加顶部安全间距，特别是在移动端 */}
      <div className="pt-6 sm:pt-10 md:pt-12"></div>

      <div className="mx-auto w-full min-h-[50vh] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          {/* 调整移动端的负边距，使用响应式类 */}
          <div className="flex justify-center mb-6 mt-[20px] sm:mt-[-30px] md:mt-[-60px] lg:mt-[-90px]">
            <div className="relative z-20">
              <a 
                target="_blank" 
                href="https://www.producthunt.com/posts/mcp-servers-2"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=940368&theme=light" 
                  alt="MCP Servers - A MCP Servers resource navigation station" 
                  width="250" 
                  height="54" 
                />
              </a>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4 animate-gradient-x">
            Submit Your MCP Project
          </h1>
          
          <h2 className="text-sm sm:text-base md:text-lg text-[#898989] dark:text-white mb-6 sm:mb-8 px-2 sm:px-8 md:px-20">
            Join our growing community of MCP tools. Share your project with developers worldwide and help shape the future of MCP ecosystem.
          </h2>
        </div>
      </div>

      {/* 原有的表单部分 - 调整移动端的边距 */}
      <div className="" style={{marginTop:'-100px',paddingBottom:'70px'}}>
        <div className="w-full ">
          <SubmitForm />
        </div>
      </div>
    </div>
  );
}