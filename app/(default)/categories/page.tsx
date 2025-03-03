/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-04 01:52:02
 */
import Categories from "@/templates/tailspark/landing/components/categories";
import { getCategories } from "@/models/category";
import { getFeaturedProjects } from "@/models/project";
import pageJson from "@/pagejson/en.json";

export const runtime = "edge";

export async function generateMetadata() {
  return {
    title: `MCP Server Categories | ${pageJson?.metadata?.title}`,
    description: `Find Awesome MCP Server categories for your needs`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/categories`,
    },
  };
}

export default async function () {
  const categories = await getCategories(1, 100);
  const projects = await getFeaturedProjects(1, 60);

  return <Categories categories={categories} showSearch={true} projects={projects} />;
}
