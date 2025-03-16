import {
  getProjectsByCategory,
  getProjectsCountByCategory,
} from "@/models/project";

import Category from "@/templates/tailspark/landing/components/category";
import { findCategoryByName } from "@/models/category";
import pageJson from "@/pagejson/en.json";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cate: string }>;
}) {
  const { cate } = await params;

  let title = "Awesome MCP Servers";
  let description = "Find Awesome MCP Servers for category";
  let keywords = "MCP Servers, Model Context Protocol, Claude Integration, AI Tools";
  if (cate) {
    const category = await findCategoryByName(cate);
    title = `Awesome MCP Servers for ${category?.title || "-"} | ${
      pageJson?.metadata?.title
    }`;
    description = `Find Awesome MCP Servers for category: ${
      category?.title || "-"
    }`;
    keywords = `${category?.title || ""} MCP Servers, ${category?.title || ""} Integration, Model Context Protocol Tools, Claude ${category?.title || ""} Integration, AI ${category?.title || ""} Solutions`;
  }

  return {
    title,
    keywords,
    description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/category/${cate}`,
    },
  };
}

export default async function ({
  params,
}: {
  params: Promise<{ cate: string }>;
}) {
  const { cate } = await params;

  if (!cate) {
    return <div>invalid params</div>;
  }

  const category = await findCategoryByName(cate);
  if (!category) {
    return <div>Category not found</div>;
  }

  const projects = await getProjectsByCategory(cate, 1, 300);
  category.projects_count = await getProjectsCountByCategory(cate);

  return <Category category={category} projects={projects} />;
}
