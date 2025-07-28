"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun, BarChart3, Settings, Bell } from "lucide-react"

export function Header() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <div className="mr-6 flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              ADmyBRAND Insights
            </span>
          </div>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a
              href="#overview"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Overview
            </a>
            <a
              href="#analytics"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Analytics
            </a>
            <a
              href="#campaigns"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Campaigns
            </a>
          </nav>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                aria-label="Toggle theme"
              />
              <Moon className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}