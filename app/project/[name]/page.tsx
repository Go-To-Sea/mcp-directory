/*
 * @Author: YourName
 * @Date: 2025-03-07 10:00:55
 * @LastEditTime: 2025-03-09 16:53:43
 * @LastEditors: rendc
 * @Description: 
 * @FilePath: \mcp-directory\app\project\[name]\page.tsx
 * 版权声明
 */
import { notFound } from "next/navigation";
import { getProjectByName, getProjects } from "@/models/project";
import pageJson from "@/pagejson/en.json";
import type { Project } from "@/types/project";
import ProjectContent from "../components/ProjectContent";
import type { Metadata, ResolvingMetadata } from 'next';
import Header from "@/templates/tailspark/landing/components/header";

export const runtime = "edge";

interface Props {
  params: Promise<{ name: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProjectByName(resolvedParams.name);
  
  if (!project) return {};
  
  return {
    title: `${project.name} | ${pageJson?.metadata?.title}`,
    description: project.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/servers/${resolvedParams.name}`,
    },
  };
}

// 添加一个新函数来获取相同类型的项目
async function getSimilarProjects(currentProject: Project, limit: number = 10): Promise<Project[]> {
  // 使用现有的getProjects方法，然后在客户端过滤
  const allProjects = await getProjects(1, 50); // 获取更多项目以确保有足够的同类型项目
  
  // 过滤出与当前项目类型相同的项目，并排除当前项目自身
  const similarProjects = allProjects
    .filter(project => 
      project.type === currentProject.type && 
      project.uuid !== currentProject.uuid
    )
    .slice(0, limit); // 只取前10条
    console.log('similarProjects:',allProjects, similarProjects);
  return similarProjects;
}

export default async function ProjectDetail({ params }: Props) {
  const resolvedParams = await params;
  const project = await getProjectByName(resolvedParams.name);
  
  if (!project) {
    notFound();
  }

  // 获取相同类型的项目
  const similarProjects = await getSimilarProjects(project);
  
  const tags = typeof project.tags === 'string' ? project.tags.split(',') : project.tags;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header header={{}}/>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <ProjectContent 
          project={project} 
          tags={tags || []} 
          similarProjects={similarProjects} // 传递相似项目到组件
        />
      </div>
    </div>
  );
}