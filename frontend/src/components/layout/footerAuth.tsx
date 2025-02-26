'use client'
import { useState } from "react"
import { ModeToggle } from "../mode-toggle"

export function FooterAuth() {


  return (
    <footer className="h-20 border-t flex flex-col items-center justify-center">
      <div className="w-full flex justify-between px-4">
        <div className="flex gap-4">
          <a href="#" className="text-sm text-muted-foreground">Home</a>
          <a href="#" className="text-sm text-muted-foreground">Docs</a>
          <a href="#" className="text-sm text-muted-foreground">Guide</a>
        </div>
        <div className="flex items-center">
            <ModeToggle />
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
