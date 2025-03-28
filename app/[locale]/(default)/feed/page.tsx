/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-03-03 22:45:57
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-16 20:27:18
 */
import Feed from "@/templates/tailspark/landing/components/feeds/index";
import pageJson from "@/pagejson/en.json";
import { Project } from "@/types/project";
import pagejson from "@/pagejson/en.json";

export const runtime = "edge";
import {
  getUsersNewSubmitList,
} from "@/models/project";
export async function generateMetadata() {
  return {
    title: `MCP Feed | Latest Community Submissions & Updates`,
    description: `Stay updated with the latest MCP tools and projects submitted by our community. Discover new Model Context Protocol servers, clients, and integrations in real-time.`,
    keywords: "MCP, Model Context Protocol, AI tools,MCP Server,MCP Client, community submissions, feed, updates",
    openGraph: {
      title: "MCP Feed | Latest Community Submissions & Updates",
      description: "Stay updated with the latest MCP tools and projects submitted by our community.",
      type: "website",
      url: `${process.env.NEXT_PUBLIC_WEB_URL}/feed`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_WEB_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "MCP Feed",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "MCP Feed | Latest Community Submissions & Updates",
      description: "Stay updated with the latest MCP tools and projects submitted by our community.",
      images: [`${process.env.NEXT_PUBLIC_WEB_URL}/og-image.png`],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/feed`,
    },
  };
}


export default async function () {
  let submitList: Project[] = [];
  submitList = await getUsersNewSubmitList(1, 100);

  return (
    <Feed  submitList={submitList}/>
  )
}
