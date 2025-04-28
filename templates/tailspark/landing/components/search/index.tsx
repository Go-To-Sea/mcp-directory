/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-07 00:55:07
 */
"use client"

import type React from "react"

import { type ChangeEvent, useEffect, useRef, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl";

interface Props {
  query?: string
}

export default function Search({ query }: Props) {
  const router = useRouter()
  const locale = useLocale();
  const [content, setContent] = useState("")
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    async (question: string) => {
      try {
        // 移除 trim 检查，允许空字符串搜索
        const url = question.trim() 
          ? `/${locale}?q=${encodeURIComponent(question.trim())}` 
          : `/${locale}${window.location.pathname}`; // 空字符串时返回基础路径
        console.log("query url", url);
        await router.push(url);
      } catch (e) {
        console.error("search failed: ", e);
      }
    },
    [router, locale],
  )

  const handleInputKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(content); // 直接传入 content，不需要额外检查
      }
    },
    [content, handleSubmit],
  )

  useEffect(() => {
    if (query) {
      setContent(query)
    }
  }, [query])

  return (
    <section className="relative mt-4 md:mt-8 mb-6">
      <div className="mx-auto w-full max-w-2xl px-6 text-center">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(content)
          }}
          className="flex items-center relative"
        >
          <input
            type="text"
            className="text-sm rounded-[0.5rem] dark:bg-[#1c1817] md:text-md flex-1 px-4 py-3 border-2 border-primary focus:border-primary focus:ring-primary hover:border-primary-focus"
            placeholder="search with keywords"
            ref={inputRef}
            value={content}
            onChange={handleInputChange}
            onKeyDown={handleInputKeydown}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute right-4 cursor-pointer"
            onClick={() => {
              if (content) {
                handleSubmit(content)
              }
            }}
          >
            <polyline points="9 10 4 15 9 20"></polyline>
            <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
          </svg>
        </form>
      </div>
    </section>
  )
}

