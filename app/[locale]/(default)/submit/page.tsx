/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-03-23 22:13:08
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-23 22:46:01
 */
import type { Metadata, ResolvingMetadata } from 'next'
import SubmitForm from "@/templates/tailspark/landing/components/submit/index";
import pageJson from "@/pagejson/en.json";

export async function generateMetadata(
): Promise<Metadata> {
  
  return {
    title: `${pageJson.submitPage.title} | ${pageJson?.metadata?.title}`,
    description: pageJson.submitPage.subtitle,
    keywords: pageJson?.metadata?.keywords,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/submit`,
    },
  };
}

export default function SubmitPage() {
  return <SubmitForm />;
}