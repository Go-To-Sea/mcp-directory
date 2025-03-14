/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-03-03 22:45:57
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-09 16:28:37
 */
import Clients from "@/templates/tailspark/landing/components/clients";
import { getCategories } from "@/models/category";
import pageJson from "@/pagejson/en.json";
import { Project } from "@/types/project";
import { ClassMenus } from "@/types/project";

import {
    getFeaturedProjects,
    getProjectsCount,
    getProjectsWithKeyword,
    getProjectsWithTag,
    getAllProjectTags, 
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

export default async function ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q,tag } = await searchParams;
  let projects: Project[] = [];
  
  // 获取所有项目的标签统计
  const allTags = await getAllProjectTags('client');
  console.log('allTags raw data:', allTags);
  
  if (tag) {
    projects = await getProjectsWithTag(tag as string, 1, 500,'client');
  } else if (q) {
    projects = await getProjectsWithKeyword(q as string, 1, 500);
  } else {
    projects = await getFeaturedProjects(1, 500);
  }
  const projectsCount = await getProjectsCount('client');
  // 转换为 ClassMenus 组件需要的格式，只处理 client 类型的标签
  const classMenus: ClassMenus[] = allTags ? 
    Object.entries(allTags)
      .filter(([_, tagData]) => {
        console.log('filtering tagData:', tagData);
        return tagData && tagData.type === 'client' && tagData.name;
      })
      .map(([_, tagData]) => ({
        name: tagData.name,
        count: tagData.count,
        href: `/clients?tag=${encodeURIComponent(tagData.name)}`
      }))
    : [];
  console.log('final classMenus:', classMenus);
  return (
    <Clients 
      page={pageJson} 
      projectsCount={projectsCount}  
      projects={projects}
      classMenus={classMenus}
    />
  );
}
