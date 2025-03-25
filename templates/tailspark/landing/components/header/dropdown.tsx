/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-23 14:40:31
 */
"use client"

import { useState, useRef, useEffect } from "react"
import { Languages, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

const languages = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
  }
] as const

export default function LanguageSelector() {
  // 移除 useTranslations 的使用，避免找不到 Common 命名空间的错误
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLanguageChange = (languageCode: string) => {
    setIsOpen(false)
    // 构建新的URL路径
    const newPath = pathname.replace(new RegExp(`^/(${languages.map(l => l.code).join('|')})`), `/${languageCode}`)
    router.push(newPath)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className="dark:text-white ml-6 rounded bg-gray-50 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-700"
          aria-label="选择语言" // 直接使用静态文本，不依赖翻译
        >
          <Languages className="h-4 w-4 text-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        ref={dropdownRef}
        align="end"
        className="w-48 p-1 rounded-xl bg-gray-50 shadow-lg animate-in fade-in-80 zoom-in-95"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className={cn(
              "flex items-center dark:text-[#000] justify-between px-3 py-2 my-1 rounded-lg cursor-pointer transition-colors",
              locale === language.code ? "bg-primary/10 text-primary" : "hover:bg-muted",
            )}
            onClick={() => handleLanguageChange(language.code)}
          >
            <div className="flex flex-col">
              <span className="font-medium">{language.name}</span>
              <span className="text-xs opacity-70">{language.nativeName}</span>
            </div>
            {locale === language.code && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

