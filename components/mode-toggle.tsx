"use client"

import * as React from "react"
import { FaMoon, FaSun } from "react-icons/fa"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function DarkModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm hover:bg-accent/50 size-10 flex items-center justify-center transition-all duration-300 shadow-sm"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <FaSun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 hidden dark:block" />
      <FaMoon className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:rotate-90 block dark:hidden text-foreground/80" />
      <FaMoon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 hidden dark:block text-foreground" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
