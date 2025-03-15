import LandingLayout from "@/templates/tailspark/landing/layout";
import { Metadata } from "next";
import pagejson from "@/pagejson/en.json";

export const metadata: Metadata = {
  title: pagejson?.metadata?.title,
  description: pagejson?.metadata?.description,
  keywords: pagejson?.metadata?.keywords,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/`,
  },
  // 添加 Google AdSense meta 标签
  other: {
    'name="google-adsense-account"': 'ca-pub-9486334752310533',
  },
};

export default function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
    <LandingLayout page={pagejson}>{children}</LandingLayout>;
  </> 
}
