import { findProjectByName, getRandomProjects } from "@/models/project";

import Single from "@/templates/tailspark/landing/pages/single";
import { findCategoryByName } from "@/models/category";
import pagejson from "@/pagejson/en.json";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const project = await findProjectByName(name);

  return {
    title: `${project?.name || "-"} | ${pagejson?.metadata?.title}`,  // 使用 name 替代 title
    description: `Find Awesome MCP Server ${project?.name || "-"}: ${
      project?.description || "-"
    }`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/server/${name}`,
    },
  };
}

export default async function ({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const project = await findProjectByName(name);
  if (!project || !project.uuid) {
    return <div>Project not found</div>;
  }

  const category = await findCategoryByName(project.category || "");

  const more_projects = await getRandomProjects(1, 50);

  return (
    <Single
      project={project}
      more_projects={more_projects}
      category={category}
    />
  );
}
