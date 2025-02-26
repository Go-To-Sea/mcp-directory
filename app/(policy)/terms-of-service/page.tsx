import Markdown from "@/components/markdown";
import { MdOutlineHome } from "react-icons/md";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Terms of Service",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/terms-of-service`,
    },
  };
}

export default function () {
  const content = ` # Terms of Service

## Introduction and Acceptance of Terms

Welcome to **MCP** (mcp.ad), a platform dedicated to providing a marketplace for Model Context Protocol (MCP) servers. Our service enables developers and organizations to discover, share, and manage MCP servers that connect AI assistants with various data sources. By accessing or using our service, you agree to be bound by these Terms of Service.

## Use of the Service

mcp.ad provides a platform where users can:
- Browse and discover MCP server implementations
- Share and publish their own MCP servers
- Access documentation and implementation guides
- Manage MCP server deployments and configurations

You agree to use the service in accordance with all applicable laws and regulations.

## User Accounts and Registration

1. **Account Creation**: To publish or manage MCP servers, you must create an account by providing accurate and complete information.

2. **Account Security**: You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.

3. **Developer Responsibilities**: When publishing MCP servers, you must provide accurate documentation, maintain security standards, and respond to reported issues.

## Content and Intellectual Property Rights

1. **Platform Rights**: The mcp.ad platform, including its interface, features, and functionality, is protected under copyright law. mcp.ad retains all rights to the platform infrastructure.

2. **User Content**: You retain your rights to any MCP servers you publish. By publishing, you grant mcp.ad a license to host and distribute your content through our platform.

3. **Open Source**: We encourage open-source contributions while respecting individual licensing choices.

## Prohibited Activities

You agree not to:
- Publish malicious or harmful MCP servers
- Misrepresent server capabilities or compatibility
- Access other users' accounts without authorization
- Interfere with the platform's security or performance
- Attempt to reverse engineer the platform
- Use the service for any illegal purpose

## Data Collection and Privacy

We collect and process:
- Account information
- MCP server metadata and configurations
- Usage analytics and deployment statistics
- Technical logs
- Payment information (if applicable)

For complete details, see our [Privacy Policy](/privacy-policy).

## Service Availability and Support

- The service is provided "as is" and "as available"
- Support is available via support@mcp.ad
- We maintain a public status page for service availability
- We may modify or discontinue features with notice

## MCP Server Guidelines

Published servers must:
- Follow MCP specification standards
- Include proper documentation
- Maintain security best practices
- Respect data privacy requirements
- Include clear licensing terms

## Termination

We reserve the right to suspend or terminate accounts that:
- Violate these terms
- Publish malicious or harmful servers
- Engage in fraudulent activity
- Have extended periods of inactivity
- Fail to maintain published servers

## Disclaimer of Warranties

THE SERVICE IS PROVIDED "AS IS" WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES. mcp.ad DISCLAIMS ALL WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

## Limitation of Liability

TO THE MAXIMUM EXTENT PERMITTED BY LAW, mcp.ad SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE OR ANY MCP SERVERS PUBLISHED THROUGH THE SERVICE.

## Changes to Terms

We may update these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.

## Governing Law

These terms shall be governed by and construed in accordance with the laws of the jurisdiction where mcp.ad operates, without regard to conflict of law principles.

## Contact Information

For questions about these terms, please contact us at [support@mcp.ad](mailto:support@mcp.ad).

---

By using mcp.ad, you acknowledge that you have read and agree to these Terms of Service.
`;

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
