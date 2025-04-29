import { GalleryVerticalEnd } from "lucide-react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <div className="min-h-screen flex flex-col">
      <div className="grid flex-1 lg:grid-cols-2">
        <div className="relative flex flex-col gap-4 p-6 md:p-10">
          <div className="absolute top-0 z-[-2] h-full w-full bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              ERICSS
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md">
              {children}
            </div>
          </div>
          <footer className="text-center py-4">
            © All rights reserved. Made by <span className="hover:text-blue-500 transition-colors duration-300 cursor-pointer">ERICSS</span>
          </footer>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <img
            src="/signin-bg.jpg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>      
    </div>    
    </>
  )
}
