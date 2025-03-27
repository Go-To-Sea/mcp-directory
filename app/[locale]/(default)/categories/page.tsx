/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-16 23:17:20
 */
import Categories from "@/templates/tailspark/landing/components/categories";
import { getCategories } from "@/models/category";
import pageJson from "@/pagejson/en.json";
import { ClassMenus } from "@/types/project";
import {
    getFeaturedProjects,
    getProjectsCount,
    getProjectsWithKeyword,
    getProjectsWithTag,
    getAllProjectTags,
    getProjectsByCategory
} from "@/models/project";
export const runtime = "edge";
import { Project } from "@/types/project";

export async function generateMetadata() {
  return {
    title: `MCP Server Categories | ${pageJson?.metadata?.title}`,
    description: `Explore diverse MCP Server categories including data integration, API tools, document processing, and more. Find the perfect Model Context Protocol solution for your needs.`,
    keywords: "MCP Categories, MCP Server Types, Model Context Protocol Categories, Claude Integration Solutions, AI Tool Categories, MCP Toolkit, Data Integration Tools, API Integration Tools",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/categories`,
    },
  };
}

export default async function ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}){
  const { q,tag } = await searchParams;
  // 修改类型声明
  let projects: Project[] = [];
  if (tag) {
    const result = await getProjectsWithTag(tag as string, 1, 500);
    // 确保返回的是数组
    projects = Array.isArray(result) ? result : result.data;
  }
  
  const projectsCount = await getProjectsCount('server');
  console.log('projects========',projects)
  return <Categories 
    page={pageJson} 
    projectsCount={projectsCount}  
    projects={projects}
    tag={tag as string}
  />;
}
