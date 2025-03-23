import type { Metadata } from 'next'
import UserCases from "@/templates/tailspark/landing/components/usercases";
import pageJson from "@/pagejson/en.json";

// 移除自定义的Props类型
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${pageJson.usercases.title} | ${pageJson?.metadata?.title}`,
    description: pageJson.usercases.subtitle,
    keywords: pageJson?.metadata?.keywords,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/usercases`,
    },
  };
}

export default function UserCasesPage() {
  return <UserCases />;
}