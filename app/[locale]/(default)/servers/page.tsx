/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-03-03 23:28:13
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-18 22:54:07
 */
import Servers from "@/templates/tailspark/landing/components/servers";
import { getCategories } from "@/models/category";
import { Project } from "@/types/project";
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

export async function generateMetadata() {
  return {
    title: `Discover MCP Servers | ${pageJson?.metadata?.title}`,
    description: `Find the best MCP servers for your needs.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/servers`,
    },
    keywords: [
      'MCP Server',
      'MCP Servers',
      'Model Context Protocol',
      'MCP Resources',
      'MCP.ad',
      'Discover MCP Servers',
      'Find MCP Server'
    ],
  };
}

// 移除顶层 await
export default async function ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const { q, category, page = '1' } = resolvedSearchParams;
  const currentPage = Math.max(1, parseInt(page as string, 10) || 1);
  const pageSize = 40;
  let projects: Project[] | any[] = [];
  let totalPages = 1;
  
  // 获取所有分类
  const categories = await getCategories(1, 100, 'server');
  
  if (category) {
    const result = await getProjectsByCategory(category as string, currentPage, pageSize, 'server', true) as { data: Project[], total: number };
    projects = result.data;
    totalPages = Math.ceil(result.total / pageSize);
  } else if (q) {
    const result = await getProjectsWithKeyword(q as string, currentPage, pageSize, true, 'server') as { data: Project[], total: number };
    projects = result.data;
    totalPages = Math.ceil(result.total / pageSize);
  } else {
    const result = await getFeaturedProjects(currentPage, pageSize, true, 'server') as { data: Project[], total: number };
    projects = result.data;
    totalPages = Math.ceil(result.total / pageSize);
  }

  const projectsCount = await getProjectsCount('server');
  const classMenus: ClassMenus[] = categories.map(category => ({
    ...category,
    name: category.name,
    href: `/servers?category=${category.name}`
  }));

  return (
    <Servers 
      page={pageJson} 
      projectsCount={projectsCount}  
      projects={projects}
      classMenus={classMenus}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}

