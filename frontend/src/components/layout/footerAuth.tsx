'use client'
import { useState } from "react"
import { Select } from "@/components/ui/select"
import { Sun, Moon } from "@geist-ui/icons"

export function FooterAuth() {
  const [theme, setTheme] = useState("light")

  const handleThemeChange = (value: string) => {
    setTheme(value)
    // Add logic to change the theme here
  }

  return (
    <footer className="h-20 border-t flex flex-col items-center justify-center">
      <div className="w-full flex justify-between px-4">
        <div className="flex gap-4">
          <a href="#" className="text-sm text-muted-foreground">Home</a>
          <a href="#" className="text-sm text-muted-foreground">Docs</a>
          <a href="#" className="text-sm text-muted-foreground">Guide</a>
        </div>
        <div className="flex items-center">
          {/* <Select initialValue={theme} onChange={handleThemeChange}>
            <Select.Option value="light">
              <Sun /> Light
            </Select.Option>
            <Select.Option value="dark">
              <Moon /> Dark
            </Select.Option>
          </Select> */}
        </div>
      </div>
      <div className="flex items-center justify-center mt-2">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ERICSS. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
