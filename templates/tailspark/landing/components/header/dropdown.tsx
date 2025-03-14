"use client"

import { useState, useRef, useEffect } from "react"
import { Languages, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation" // 添加路由导入

type Language = {
  code: string
  name: string
  nativeName: string
}

const languages: Language[] = [
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
]

export default function LanguageSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0])
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language)
    setIsOpen(false)

    // 处理路径切换
    let newPath = pathname
    // 移除现有的语言前缀（如果存在）
    const pathWithoutLang = pathname.replace(/^\/(en|zh|ja|ko)/, '')
    
    // 添加新的语言前缀（除了英语）
    if (language.code !== 'en') {
      newPath = `/${language.code}${pathWithoutLang}`
    } else {
      newPath = pathWithoutLang
    }
    
    router.push(newPath)
  }

  // 初始化时根据当前路径设置语言
  useEffect(() => {
    const langPrefix = pathname.match(/^\/(en|zh|ja|ko)/)
    const currentLang = languages.find(lang => langPrefix?.[1] === lang.code) || languages[0]
    setSelectedLanguage(currentLang)
  }, [pathname])

  // Close dropdown when clicking outside
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
          className=" dark:text-white ml-6  rounded bg-gray-50 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-700"
          aria-label="Select language"
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
              "flex items-center  dark:text-[#000] justify-between px-3 py-2 my-1 rounded-lg cursor-pointer transition-colors",
              selectedLanguage.code === language.code ? "bg-primary/10 text-primary" : "hover:bg-muted",
            )}
            onClick={() => handleLanguageChange(language)}
          >
            <div className="flex flex-col">
              <span className="font-medium">{language.name}</span>
              <span className="text-xs opacity-70">{language.nativeName}</span>
            </div>
            {selectedLanguage.code === language.code && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

