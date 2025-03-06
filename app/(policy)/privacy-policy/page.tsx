/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-07 00:53:01
 */
import Markdown from "@/components/markdown";
import { MdOutlineHome } from "react-icons/md";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Privacy Policy",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/privacy-policy`,
    },
  };
}

export default function () {
  const content = `# Privacy Policy

## Introduction

Welcome to mcp.ad, a third-party Model Context Protocol (MCP) servers store. We value your privacy and are committed to protecting your personal information. This privacy policy explains how we collect, use, and safeguard your information when you use our MCP server hosting and distribution services.

## Information Collection and Use

We collect and use the following types of information:

1. **MCP Server Information**
   - **What We Collect**: Information necessary to host and distribute MCP servers, including server configurations, technical specifications, and usage metrics.
   - **Purpose**: To provide secure and reliable MCP server hosting and distribution services.

2. **Account Information**
   - **What We Collect**: Basic contact information such as name, email, and developer/organization details.
   - **Purpose**: To manage user accounts and provide support for MCP server deployments.

3. **Technical Data**
   - **What We Collect**: Information about how you interact with our MCP servers and platform.
   - **Purpose**: To improve our services, ensure security, and enhance user experience.

## Data Security

We implement industry-standard security measures to protect your information and MCP server data. All data is treated with strict confidentiality and is only accessed by authorized personnel who need it to maintain our services.

## Information Sharing

We do not sell or share your information with third parties except:
- When required by law
- With your explicit consent
- With service providers who help us operate our services (under confidentiality agreements)

## Your Rights

You have the right to:
- Access your personal information
- Request corrections to your data
- Request deletion of your data
- Opt-out of marketing communications

## Contact Us

If you have questions about this privacy policy or our privacy practices, please contact us at:

**Email**: [support@mcp.ad](mailto:support@mcp.ad)

## Updates to This Policy

We may update this privacy policy periodically. Any changes will be posted on this page with an updated effective date. Your continued use of our services after such modifications constitutes your acknowledgment of the modified policy.

Last updated: March  5, 2025`;
  return (
    <div>
      <a className="text-base-content cursor-pointer" href="/">
        <MdOutlineHome className="text-2xl mx-8 my-8" />
        {/* <img className="w-10 h-10 mx-4 my-4" src="/logo.png" /> */}
      </a>
      <div className="max-w-3xl mx-auto leading-loose pt-4 pb-8 px-8">
        <Markdown content={content} />
      </div>
    </div>
  );
}
