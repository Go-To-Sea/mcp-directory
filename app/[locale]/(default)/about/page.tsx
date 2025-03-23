/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-05 01:06:19
 */
import About from "@/templates/tailspark/landing/components/about/index";
import pageJson from "@/pagejson/en.json";

export const runtime = "edge";

export async function generateMetadata() {
  return {
    title: `MCP Server about | ${pageJson?.metadata?.title}`,
    description: `Learn more about MCP.ad - The most comprehensive MCP server resource navigation platform. We provide a rich collection of Model Context Protocol tools to help developers integrate and use AI models more efficiently.`,
    keywords: [
      'MCP Server',
      'Model Context Protocol',
      'AI Development Tools',
      'MCP Resources',
      'AI Model Integration',
      'MCP.ad',
      'Developer Tools',
      'AI Application Development'
    ],
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/about`,
    },
    openGraph: {
      title: `About MCP.ad | The Most Comprehensive MCP Server Resource Navigation`,
      description: `Explore MCP.ad platform, discover rich Model Context Protocol tool resources, making AI development simpler and more efficient.`,
      url: `${process.env.NEXT_PUBLIC_WEB_URL}/about`,
      type: 'website',
    }
  };
}

export default async function () {

  return <About />;
}
