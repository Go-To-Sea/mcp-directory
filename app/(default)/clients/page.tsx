import Clients from "@/templates/tailspark/landing/components/clients";
import { getCategories } from "@/models/category";
import pageJson from "@/pagejson/en.json";
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

const projectsCount = await getProjectsCount();

export default async function () {
  const categories = await getCategories(1, 100);
  const projects = await getFeaturedProjects(1, 60);

  return <Clients page={pageJson} projectsCount={projectsCount}  projects={projects}/>;
}
