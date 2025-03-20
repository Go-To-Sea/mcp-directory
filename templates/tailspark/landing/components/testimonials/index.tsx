"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const testimonials = [
  {
    content: "The server integration solution provided by MCP.ad has made our AI applications more powerful. Through the Model Context Protocol, we can easily access various data sources, which greatly improves our work efficiency.",
    author: "Alex Chen",
    title: "AI Solution Architect",
    rating: 5,
    time: "March 2, 2025"
  },
  {
    content: "As a Claude integration developer, MCP.ad's resource navigation helped me find the most suitable MCP server. The documentation is clear, examples are rich, it's an excellent platform.",
    author: "Sarah Miller",
    title: "Full Stack Engineer",
    rating: 5,
    time: "February 28, 2025"
  },
  {
    content: "The plug-and-play feature of MCP servers is impressive. Through MCP.ad, we quickly found and deployed suitable servers, significantly enhancing the practicality of AI assistants.",
    author: "Michael Zhang",
    title: "Technical Director",
    rating: 5,
    time: "February 25, 2025"
  },
  {
    content: "MCP.ad has revolutionized how we integrate AI into our workflow. The comprehensive server options and seamless integration capabilities have made it our go-to platform.",
    author: "Emma Wilson",
    title: "DevOps Engineer",
    rating: 5,
    time: "February 20, 2025"
  },
  {
    content: "The Model Context Protocol implementation through MCP.ad has significantly improved our data processing capabilities. It's a game-changer for AI development.",
    author: "David Park",
    title: "Senior Software Engineer",
    rating: 5,
    time: "February 15, 2025"
  },
  {
    content: "Finding the right MCP server used to be challenging until we discovered MCP.ad. The platform's curation and documentation are outstanding.",
    author: "Lisa Johnson",
    title: "AI Research Lead",
    rating: 5,
    time: "February 10, 2025"
  }
]

export default function Testimonials() {
  return (
    <div className="py-16 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500">
            What Our Users Are Saying
          </h2>
        </div>
        
        <div className="mt-12">
        <span className="tags"></span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                      {testimonial.author[0]}
                    </span>
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </h3>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {testimonial.title}
                      </p>
                      <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {testimonial.time}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}