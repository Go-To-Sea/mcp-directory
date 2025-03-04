/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-03-05 01:19:54
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-05 01:22:15
 */
"use client"

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function BlogPost() {
  const params = useParams()
  const id = params.id

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
            返回博客列表
          </Link>
        </motion.div>

        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            src="https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F3aabd8804251c0364cbde9d2e4be6dc8e8c2faec-2880x1620.png&w=3840&q=75" 
            alt="Blog Cover" 
            className="w-full aspect-[21/9] object-cover rounded-lg mb-10"
          />
          
          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-8 border-b border-gray-200 dark:border-gray-800 pb-8">
            <span className="flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              2024年11月25日
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              3 min read
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-10 leading-tight">
            Introducing the Model Context Protocol
          </h1>

          <div className="prose dark:prose-invert prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Today, we're open-sourcing the Model Context Protocol (MCP), a new standard for connecting AI assistants to the systems where data lives, including content repositories, business tools, and development environments. Its aim is to help frontier models produce better, more relevant responses.
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              As AI assistants gain mainstream adoption, the industry has invested heavily in model capabilities, achieving rapid advances in reasoning and quality. Yet even the most sophisticated models are constrained by their isolation from data—trapped behind information silos and legacy systems. Every new data source requires its own custom implementation, making truly connected systems difficult to scale.
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              MCP addresses this challenge. It provides a universal, open standard for connecting AI systems with data sources, replacing fragmented integrations with a single protocol. The result is a simpler, more reliable way to give AI systems access to the data they need.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
              Model Context Protocol
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              The Model Context Protocol is an open standard that enables developers to build secure, two-way connections between their data sources and AI-powered tools. The architecture is straightforward: developers can either expose their data through MCP servers or build AI applications (MCP clients) that connect to these servers.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
              Major Components
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Today, we're introducing three major components of the Model Context Protocol for developers:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>The Model Context Protocol specification and SDKs</li>
              <li>Local MCP server support in the Claude Desktop apps</li>
              <li>An open-source repository of MCP servers</li>
            </ul>

            <p className="mt-6 text-gray-700 dark:text-gray-300">
              Claude 3.5 Sonnet is adept at quickly building MCP server implementations, making it easy for organizations and individuals to rapidly connect their most important datasets with a range of AI-powered tools. To help developers start exploring, we're sharing pre-built MCP servers for popular enterprise systems like Google Drive, Slack, GitHub, Git, Postgres, and Puppeteer.
            </p>

            <blockquote className="border-l-4 border-primary pl-4 my-8 italic text-gray-700 dark:text-gray-300">
              "At Block, open source is more than a development model—it's the foundation of our work and a commitment to creating technology that drives meaningful change and serves as a public good for all," said Dhanji R. Prasanna, Chief Technology Officer at Block.
            </blockquote>

            <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
              Getting started
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Developers can start building and testing MCP connectors today. All Claude.ai plans support connecting MCP servers to the Claude Desktop app.
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 my-8">
              <p className="font-semibold mb-4 text-gray-900 dark:text-white">To start building:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Install pre-built MCP servers through the Claude Desktop app</li>
                <li>Follow our quickstart guide to build your first MCP server</li>
                <li>Contribute to our open-source repositories of connectors and implementations</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
              An open community
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We're committed to building MCP as a collaborative, open-source project and ecosystem, and we're eager to hear your feedback. Whether you're an AI tool developer, an enterprise looking to leverage existing data, or an early adopter exploring the frontier, we invite you to build the future of context-aware AI together.
            </p>
          </div>
        </motion.article>
      </div>
    </div>
  )
}