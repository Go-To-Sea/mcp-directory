/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-03-03 22:45:57
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-16 18:12:51
 */
import Feed from "@/templates/tailspark/landing/components/feeds/index";
import pageJson from "@/pagejson/en.json";
import { Project } from "@/types/project";

import {
    getFeaturedProjects,
  } from "@/models/project";
export const runtime = "edge";

export async function generateMetadata() {
  return {
    title: `Latest MCP Servers & Clients | Community Submissions`,
    description: `Discover recently submitted MCP Servers and Clients from our growing community. Stay updated with the latest Model Context Protocol integrations.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/clients`,
    },
  };
}

export default async function () {
  let projects: Project[] = [];

  return (
    <Feed 
    />
  );
}
