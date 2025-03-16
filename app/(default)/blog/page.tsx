/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-05 01:06:19
 */
import Blog from "@/templates/tailspark/landing/components/blog";
import pageJson from "@/pagejson/en.json";

export const runtime = "edge";

export async function generateMetadata() {
  return {
    title: `MCP Server Correlation Blog | ${pageJson?.metadata?.title}`,
    description: `Exploring the Latest Dynamics, Technical Articles, and Usage Guides of MCP`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/blog`,
    },
  };
}

export default async function () {

  return <Blog />;
}
