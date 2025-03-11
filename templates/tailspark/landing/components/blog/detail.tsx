/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-03-05 01:19:54
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-11 23:26:50
 */
"use client"

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// 博客数据 - 第一篇文章
const blogPosts = [
  {
    id: "1",
    title: "Introducing the Model Context Protocol",
    date: "November 25, 2024",
    readTime: "3 min read",
    coverImage: "https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F3aabd8804251c0364cbde9d2e4be6dc8e8c2faec-2880x1620.png&w=3840&q=75",
    content: `
      <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        Today, we're open-sourcing the Model Context Protocol (MCP), a new standard for connecting AI assistants to the systems where data lives, including content repositories, business tools, and development environments. Its aim is to help frontier models produce better, more relevant responses.
      </p>

      <p class="text-gray-700 dark:text-gray-300">
        As AI assistants gain mainstream adoption, the industry has invested heavily in model capabilities, achieving rapid advances in reasoning and quality. Yet even the most sophisticated models are constrained by their isolation from data—trapped behind information silos and legacy systems. Every new data source requires its own custom implementation, making truly connected systems difficult to scale.
      </p>

      <p class="text-gray-700 dark:text-gray-300">
        MCP addresses this challenge. It provides a universal, open standard for connecting AI systems with data sources, replacing fragmented integrations with a single protocol. The result is a simpler, more reliable way to give AI systems access to the data they need.
      </p>

      <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Model Context Protocol
      </h2>
      <p class="text-gray-700 dark:text-gray-300">
        The Model Context Protocol is an open standard that enables developers to build secure, two-way connections between their data sources and AI-powered tools. The architecture is straightforward: developers can either expose their data through MCP servers or build AI applications (MCP clients) that connect to these servers.
      </p>

      <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Major Components
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        Today, we're introducing three major components of the Model Context Protocol for developers:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>The Model Context Protocol specification and SDKs</li>
        <li>Local MCP server support in the Claude Desktop apps</li>
        <li>An open-source repository of MCP servers</li>
      </ul>

      <p class="mt-6 text-gray-700 dark:text-gray-300">
        Claude 3.5 Sonnet is adept at quickly building MCP server implementations, making it easy for organizations and individuals to rapidly connect their most important datasets with a range of AI-powered tools. To help developers start exploring, we're sharing pre-built MCP servers for popular enterprise systems like Google Drive, Slack, GitHub, Git, Postgres, and Puppeteer.
      </p>

      <blockquote class="border-l-4 border-primary pl-4 my-8 italic text-gray-700 dark:text-gray-300">
        "At Block, open source is more than a development model—it's the foundation of our work and a commitment to creating technology that drives meaningful change and serves as a public good for all," said Dhanji R. Prasanna, Chief Technology Officer at Block.
      </blockquote>

      <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Getting started
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        Developers can start building and testing MCP connectors today. All Claude.ai plans support connecting MCP servers to the Claude Desktop app.
      </p>

      <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 my-8">
        <p class="font-semibold mb-4 text-gray-900 dark:text-white">To start building:</p>
        <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Install pre-built MCP servers through the Claude Desktop app</li>
          <li>Follow our quickstart guide to build your first MCP server</li>
          <li>Contribute to our open-source repositories of connectors and implementations</li>
        </ul>
      </div>

      <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        An open community
      </h2>
      <p class="text-gray-700 dark:text-gray-300">
        We're committed to building MCP as a collaborative, open-source project and ecosystem, and we're eager to hear your feedback. Whether you're an AI tool developer, an enterprise looking to leverage existing data, or an early adopter exploring the frontier, we invite you to build the future of context-aware AI together.
      </p>
    `
  },
  {
    id: "2",
    title: "How to Get Started Using MCP",
    date: "December 10, 2024",
    readTime: "5 min read",
    coverImage: "https://storage.googleapis.com/pulse_public/posts/ai-is-making-websites-obsolete-with-mcp/post-thumbnail.png",
    content: `
      <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        The Model Context Protocol (MCP) is revolutionizing how AI assistants access and interact with your data. This comprehensive guide will walk you through the basics of setting up your first MCP server and connecting it to your favorite AI tools.
      </p>

      <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        What is MCP?
      </h2>
      <p class="text-gray-700 dark:text-gray-300">
        MCP (Model Context Protocol) is an open standard that enables AI assistants to securely access and interact with your data sources. It creates a bridge between AI models and your information, allowing for more contextual, accurate, and helpful responses.
      </p>

      <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Why Use MCP?
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        Using MCP offers several advantages:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>Enhanced AI responses with access to your specific data</li>
        <li>Secure, controlled data sharing with AI systems</li>
        <li>Unified protocol for connecting multiple data sources</li>
        <li>Reduced need for custom integrations</li>
        <li>Open-source flexibility and community support</li>
      </ul>

      <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Getting Started with MCP
      </h2>
      <p class="text-gray-700 dark:text-gray-300">
        Setting up your first MCP server is straightforward. Here's a step-by-step guide to get you started:
      </p>

      <h3 class="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
        Step 1: Install the MCP CLI
      </h3>
      <p class="text-gray-700 dark:text-gray-300">
        The MCP Command Line Interface (CLI) is the easiest way to get started. Install it using npm:
      </p>
      <div class="bg-gray-800 text-gray-100 p-4 rounded-md my-4 overflow-x-auto font-mono">
        <code>npm install -g @anthropic/mcp-cli</code>
      </div>

      <h3 class="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
        Step 2: Initialize Your MCP Server
      </h3>
      <p class="text-gray-700 dark:text-gray-300">
        Create a new directory for your MCP server and initialize it:
      </p>
      <div class="bg-gray-800 text-gray-100 p-4 rounded-md my-4 overflow-x-auto font-mono">
        <code>mkdir my-mcp-server<br>cd my-mcp-server<br>mcp init</code>
      </div>

      <h3 class="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
        Step 3: Configure Your Data Source
      </h3>
      <p class="text-gray-700 dark:text-gray-300">
        Edit the generated config.json file to specify your data source. MCP supports various data sources including files, databases, APIs, and more.
      </p>

      <h3 class="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
        Step 4: Start Your MCP Server
      </h3>
      <p class="text-gray-700 dark:text-gray-300">
        Launch your MCP server with:
      </p>
      <div class="bg-gray-800 text-gray-100 p-4 rounded-md my-4 overflow-x-auto font-mono">
        <code>mcp start</code>
      </div>

      <h3 class="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
        Step 5: Connect to an AI Assistant
      </h3>
      <p class="text-gray-700 dark:text-gray-300">
        Connect your MCP server to Claude or other compatible AI assistants. In Claude Desktop, go to Settings > MCP Servers and add your server URL.
      </p>

      <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Advanced MCP Usage
      </h2>
      <p class="text-gray-700 dark:text-gray-300">
        Once you're comfortable with the basics, you can explore more advanced features:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>Custom authentication methods</li>
        <li>Multiple data source integration</li>
        <li>Implementing search capabilities</li>
        <li>Adding write operations</li>
        <li>Deploying to cloud environments</li>
      </ul>

      <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Community Resources
      </h2>
      <p class="text-gray-700 dark:text-gray-300">
        Join the growing MCP community to get help, share your implementations, and contribute to the protocol's development:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>GitHub repository: github.com/anthropics/mcp</li>
        <li>Discord community: discord.gg/mcp-community</li>
        <li>Documentation: docs.mcp.ai</li>
      </ul>

      <p class="mt-8 text-gray-700 dark:text-gray-300">
        With MCP, you're not just using AI—you're enhancing it with your own data and context. Start building your MCP server today and experience the difference contextual AI can make for your projects.
      </p>
    `
  },
  {
    id: "3",
    title: "AI is Making Websites Obsolete with MCP",
    date: "January 15, 2025",
    readTime: "4 min read",
    coverImage: "https://storage.googleapis.com/pulse_public/posts/ai-is-making-websites-obsolete-with-mcp/post-thumbnail.png",
    content: `
      <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        Traditional websites are facing a paradigm shift as AI-powered interfaces using the Model Context Protocol (MCP) offer more intuitive, personalized, and efficient ways to access information and services. This transformation is reshaping digital experiences in ways we couldn't have imagined just a few years ago.
      </p>
  
      <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        The Limitations of Traditional Websites
      </h2>
      <p class="text-gray-700 dark:text-gray-300">
        For decades, websites have been our primary gateway to digital information. However, they come with inherent limitations:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>Static, one-size-fits-all interfaces</li>
        <li>Complex navigation requiring users to learn each site's structure</li>
        <li>Information fragmentation across multiple pages</li>
        <li>Limited personalization capabilities</li>
        <li>Search functions that often return irrelevant results</li>
      </ul>
  
      <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        How MCP is Changing the Game
      </h2>
      <p class="text-gray-700 dark:text-gray-300">
        The Model Context Protocol (MCP) enables AI systems to directly access and interact with data sources in real-time, creating a fundamentally different approach to information retrieval and service delivery:
      </p>
  
      <h3 class="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
        1. Conversational Interfaces Replace Navigation
      </h3>
      <p class="text-gray-700 dark:text-gray-300">
        Instead of clicking through menus and pages, users simply ask for what they need in natural language. The AI, powered by MCP connections to relevant data sources, delivers precise answers and performs actions directly.
      </p>
  
      <h3 class="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
        2. Personalized Information Delivery
      </h3>
      <p class="text-gray-700 dark:text-gray-300">
        MCP-enabled AI systems can tailor information based on user preferences, history, and context, delivering highly relevant content without requiring users to filter through irrelevant information.
      </p>
  
      <h3 class="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
        3. Real-time Data Integration
      </h3>
      <p class="text-gray-700 dark:text-gray-300">
        Unlike static websites that require manual updates, MCP allows AI interfaces to access the most current information from multiple sources simultaneously, ensuring users always receive up-to-date content.
      </p>
  
      <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Real-World Applications
      </h2>
      <p class="text-gray-700 dark:text-gray-300">
        Early adopters are already implementing MCP-powered AI interfaces across various domains:
      </p>
  
      <h3 class="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
        Enterprise Knowledge Management
      </h3>
      <p class="text-gray-700 dark:text-gray-300">
        Companies are replacing complex intranets and knowledge bases with AI assistants that can instantly retrieve and synthesize information from across the organization. Employees simply ask questions in natural language and receive comprehensive answers that would otherwise require navigating multiple systems.
      </p>
  
      <h3 class="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
        E-commerce and Customer Service
      </h3>
      <p class="text-gray-700 dark:text-gray-300">
        Online retailers are supplementing or replacing traditional product catalogs with AI shopping assistants that understand customer preferences, provide personalized recommendations, and complete transactions—all through natural conversation.
      </p>
  
      <h3 class="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
        Documentation and Technical Support
      </h3>
      <p class="text-gray-700 dark:text-gray-300">
        Software companies are transforming sprawling documentation websites into AI assistants that can answer specific questions, provide code examples, and troubleshoot issues by accessing documentation, code repositories, and issue trackers through MCP.
      </p>
  
      <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        The Future of Digital Interfaces
      </h2>
      <p class="text-gray-700 dark:text-gray-300">
        As MCP adoption grows, we're likely to see a fundamental shift in how digital information is accessed and consumed:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>AI-first interfaces becoming the primary point of interaction for many services</li>
        <li>Traditional websites evolving into data sources for AI systems rather than direct user interfaces</li>
        <li>Increased focus on structured data and API development to support AI consumption</li>
        <li>New design paradigms centered around conversation and natural language interaction</li>
      </ul>
  
      <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Getting Started with MCP
      </h2>
      <p class="text-gray-700 dark:text-gray-300">
        For developers and organizations looking to prepare for this shift, now is the time to start exploring MCP:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>Evaluate your current digital properties as potential MCP data sources</li>
        <li>Experiment with building MCP servers for your key information repositories</li>
        <li>Consider how AI interfaces might complement or replace traditional web interfaces</li>
        <li>Join the MCP community to stay informed about best practices and new developments</li>
      </ul>
  
      <p class="mt-8 text-gray-700 dark:text-gray-300">
        While traditional websites won't disappear overnight, the rise of MCP and AI-powered interfaces represents a significant evolution in how we interact with digital information. Organizations that embrace this shift early will be well-positioned to deliver more intuitive, efficient, and personalized digital experiences.
      </p>
    `
  }
]
export default function BlogPost() {
  const params = useParams()
  const id = params.id
  
  // 根据ID查找对应的博客文章
  const blogPost = blogPosts.find(post => post.id === id) || blogPosts[0]

  // 添加自定义样式，强制 code 标签内的文字为白色
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .blog-content code {
        color: white !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/blog" 
            className="inline-flex items-center text-primary hover:text-primary/80 mb-12 group"
          >
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </motion.div>

        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-full mb-10 overflow-hidden rounded-lg flex items-center justify-center">
            <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              src={blogPost.coverImage}
              alt={blogPost.title} 
              className="w-auto max-w-full h-auto max-h-[500px] rounded-lg"
            />
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-8 border-b border-gray-200 dark:border-gray-800 pb-8">
            <span className="flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              {blogPost.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              {blogPost.readTime}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-10 leading-tight">
            {blogPost.title}
          </h1>

          <div 
            className="prose dark:prose-invert prose-lg max-w-none blog-content"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
        </motion.article>
      </div>
    </div>
  )
}