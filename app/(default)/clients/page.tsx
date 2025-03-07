/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-03-03 22:45:57
 * @LastEditors: YourName
 * @LastEditTime: 2025-03-07 09:09:26
 */
import Clients from "@/templates/tailspark/landing/components/clients";
import { getCategories } from "@/models/category";
import pageJson from "@/pagejson/en.json";
import { Project } from "@/types/project";
import {
    getFeaturedProjects,
    getProjectsCount,
    getProjectsWithKeyword,
  } from "@/models/project";
export const runtime = "edge";

export async function generateMetadata() {
  return {
    title: `MCP Server Categories | ${pageJson?.metadata?.title}`,
    description: `Find Awesome MCP Server categories for your needs`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/clients`,
    },
  };
}


export default async function  ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q } = await searchParams;
  let projects: Project[] = [];
  if (q) {
    projects = await getProjectsWithKeyword(q as string, 1, 100);
  } else {
      // 当没有查询参数时，触发页面刷新
    projects = await getFeaturedProjects(1, 100);
  }

  const projectsCount = await getProjectsCount();

  return <Clients page={pageJson} projectsCount={projectsCount}  projects={projects}/>;
}
