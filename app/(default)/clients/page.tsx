/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-03-03 22:45:57
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-18 22:53:58
 */
import Clients from "@/templates/tailspark/landing/components/clients";
import { getCategories } from "@/models/category";  // 确保这个导入存在
import pageJson from "@/pagejson/en.json";
import { Project } from "@/types/project";
import { ClassMenus } from "@/types/project";

import {
    getFeaturedProjects,
    getProjectsCount,
    getProjectsWithKeyword,
    getProjectsWithTag,
    getProjectsByCategory, 
  } from "@/models/project";
export const runtime = "edge";

export async function generateMetadata() {
  return {
    title: `Discover MCP Clients | ${pageJson?.metadata?.title}`,
    description: `Find the best MCP clients for your needs.`,
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
  const { q,category } = await searchParams;
  let projects: Project[] | any[] = [];
  
  // 获取所有分类
  const categories = await getCategories(1, 100,'client');
  
   if (category) {
    projects = await getProjectsByCategory(category as string,1, 500,'client');
  }else if (q) {
    projects = await getProjectsWithKeyword(q as string, 1, 500);
  } else {
    projects = await getFeaturedProjects(1, 500);
  }
  const projectsCount = await getProjectsCount('client');

  // 转换为 ClassMenus 组件需要的格式，使用 category
  const classMenus: ClassMenus[] = categories.map(category => ({
    ...category,
    name: category.name,
    href: `/clients?category=${encodeURIComponent(category.name)}`
  }));

  return (
    <Clients 
      page={pageJson} 
      projectsCount={projectsCount}  
      projects={projects}
      classMenus={classMenus}
    />
  );
}
