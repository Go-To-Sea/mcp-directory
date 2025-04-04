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
    keywords: [
      'MCP Server',
      'MCP Client',
      'MCP Clients',
      'Model Context Protocol',
      'MCP Resources',
      'MCP.ad',
      'MCP Blog',
      'Discover MCP Clients'
    ],
  };
}

export default async function ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const { q, category, page = '1' } = resolvedSearchParams;
  const currentPage = parseInt(page as string, 10);
  const pageSize = 40; // 每页显示数量
  let projects: Project[] | any[] = [];
  let totalPages = 1;
  // 获取所有分类
  const categories = await getCategories(1, 100,'client');
  console.log('resolvedSearchParams:', resolvedSearchParams); // 添加这行日志
  // 在 page.tsx 中使用
  if (category) {
    const result = await getProjectsByCategory(category as string, currentPage, pageSize, 'client', true) as { data: Project[], total: number };
    projects = result.data;
    totalPages = Math.ceil(result.total / pageSize);
  } else if (q) {
    const result = await getProjectsWithKeyword(q as string, currentPage, pageSize, true,'client') as { data: Project[], total: number };
    projects = result.data;
    totalPages = Math.ceil(result.total / pageSize);
  } else {
    const result = await getFeaturedProjects(currentPage, pageSize, true,'client') as { data: Project[], total: number };
    projects = result.data;
    console.log('total count:', result.total); // 添加这行日志
    totalPages = Math.ceil(result.total / pageSize);
    console.log('totalPages:', result.data); // 添加这行日志
  }
  const projectsCount = await getProjectsCount('client');
  const classMenus: ClassMenus[] = categories.map(category => ({
    ...category,
    name: category.name,
    href: `/clients?category=${category.name}`,
  }));

  return (
    <Clients 
      page={pageJson} 
      projectsCount={projectsCount}  
      projects={projects}
      classMenus={classMenus}
      currentPage={currentPage}
      totalPages={totalPages}
      // 移除这个客户端函数，因为它在服务端组件中不能工作
      // onPageChange={(page) => {
      //   const url = new URL(window.location.href);
      //   url.searchParams.set('page', page.toString());
      //   window.location.href = url.toString();
      // }}
    />
  );
}
