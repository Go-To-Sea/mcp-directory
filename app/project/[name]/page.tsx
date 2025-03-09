/*
 * @Author: YourName
 * @Date: 2025-03-07 10:00:55
 * @LastEditTime: 2025-03-07 11:22:52
 * @LastEditors: YourName
 * @Description: 
 * @FilePath: \mcp-directory\app\project\[name]\page.tsx
 * 版权声明
 */
import { notFound } from "next/navigation";
import { getProjectByName } from "@/models/project";
import pageJson from "@/pagejson/en.json";
import type { Project } from "@/types/project";
import ProjectContent from "../components/ProjectContent";
import type { Metadata, ResolvingMetadata } from 'next';

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

export default async function ProjectDetail({ params }: Props) {
  const resolvedParams = await params;
  const project = await getProjectByName(resolvedParams.name);
  console.log('project===========',project);
  if (!project) {
    notFound();
  }

  const tags = typeof project.tags === 'string' ? project.tags.split(',') : project.tags;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <ProjectContent project={project} tags={tags || []} />
      </div>
    </div>
  );
}