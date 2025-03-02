/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-03-02 23:18:11
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-02 23:18:20
 */
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
