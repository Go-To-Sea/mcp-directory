/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-03-03 23:28:13
 * @LastEditors: YourName
 * @LastEditTime: 2025-03-07 09:03:22
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
} from "@/models/project";

export const runtime = "edge";

export async function generateMetadata() {
  return {
    title: `MCP Server Categories | ${pageJson?.metadata?.title}`,
    description: `Find Awesome MCP Server categories for your needs`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/servers`,
    },
  };
}

// 移除顶层 await
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q, tag } = await searchParams;
  let projects: Project[] = [];
  
  // 将 projectsCount 移到组件内部
  const projectsCount = await getProjectsCount('server');
  
  // 获取所有项目的标签统计
  const allTags = await getAllProjectTags('server');
  console.log('allTags raw data:', allTags);
  
  // 获取筛选后的项目列表
  if (tag) {
    projects = await getProjectsWithTag(tag as string, 1, 500,'server');
  } else if (q) {
    projects = await getProjectsWithKeyword(q as string, 1, 500);
  } else {
    projects = await getFeaturedProjects(1, 500);
  }
  // 确保 allTags 存在且是一个对象
  const classMenus: ClassMenus[] = allTags ? 
    Object.entries(allTags)
      .filter(([_, tagData]) => {
        console.log('filtering tagData:', tagData); // 添加调试日志
        return tagData && tagData.type === 'server' && tagData.name;
      })
      .map(([_, tagData]) => ({
        name: tagData.name,
        count: tagData.count,
        href: `/servers?tag=${encodeURIComponent(tagData.name)}`
      }))
    : [];
  console.log('final classMenus:', classMenus); // 添加调试日志
  return (
    <Servers 
      page={pageJson} 
      projectsCount={projectsCount}  
      projects={projects}
      classMenus={classMenus}
    />
  );
}
