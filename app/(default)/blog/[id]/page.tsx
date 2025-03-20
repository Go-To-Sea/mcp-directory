/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-16 17:57:20
 */
import BlogDetail from "@/templates/tailspark/landing/components/blog/detail";
import pageJson from "@/pagejson/en.json";

export const runtime = "edge";

export async function generateMetadata({ params }: { params: { id: string } }) {
  console.log('generateMetadata',params.id)
  return {
    title: `MCP Server Correlation Blog | ${pageJson?.metadata?.title}`,
    description: `Exploring the Latest Dynamics, Technical Articles, and Usage Guides of MCP`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/blog/${params.id}`,
    },
  };
}

export default async function () {
  return <BlogDetail />;
}
