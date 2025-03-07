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
    getAllProjectTags,  // 添加到现有的导入列表中
} from "@/models/project";

// 删除之前单独的导入语句
// import { getAllProjectTags } from "@/models/project";
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

const projectsCount = await getProjectsCount('server');

// 添加新的导入

export default async function ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q, tag } = await searchParams;
  let projects: Project[] = [];
  
  // 获取所有项目的标签统计
  const allTags = await getAllProjectTags();
  
  // 获取筛选后的项目列表
  if (tag) {
    projects = await getProjectsWithTag(tag as string, 1, 100);
  } else if (q) {
    projects = await getProjectsWithKeyword(q as string, 1, 100);
  } else {
    projects = await getFeaturedProjects(1, 100);
  }

  // 转换为 ClassMenus 组件需要的格式
  const classMenus: ClassMenus[] = Object.entries(allTags)
    .filter(([name]) => name.length > 0)
    .map(([name, count]) => ({
      name,
      count,
      href: `/servers?tag=${encodeURIComponent(name)}`
    }));

  return (
    <Servers 
      page={pageJson} 
      projectsCount={projectsCount}  
      projects={projects}
      classMenus={classMenus}
    />
  );
}
