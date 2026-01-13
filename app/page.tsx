"use client"

import { useTheme } from "next-themes"
import { LineShadowText } from "@/components/ui/line-shadow-text"
import { SmoothCursor } from "@/components/ui/smooth-cursor"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import { AuroraText } from "@/components/ui/aurora-text"
import { SparklesText } from "@/components/ui/sparkles-text"
import { DotPattern } from "@/components/ui/dot-pattern"
import { cn } from "@/lib/utils"


export default function Home() {
  const theme = useTheme()
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black"

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black px-4 space-y-8 overflow-hidden">
      <SmoothCursor />
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />

      <OrbitingCircles
        iconSize={40}
        radius={350}       
        speed={1.5}        
      >
        <Icons.notion />
        <Icons.mailchimp />
        <Icons.drive />
        <Icons.twitter />
      </OrbitingCircles>

      <div className="flex flex-col items-center z-10">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-64 w-64 object-contain"
        />

        <h1 className="-mt-16 text-center font-semibold tracking-tight inline-block text-[clamp(2rem,5vw,3.5rem)]">
          The OS for{" "}

            <LineShadowText className="italic" shadowColor={shadowColor}>
              Modern
            </LineShadowText>
            {" "}
          Nonprofits
        </h1>
      </div>

      <div className="w-full max-w-md z-10">
        <form className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="example@nonprofit.org"
            className="flex-1 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm outline-none placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
          <button className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black">
            Join
          </button>
        </form>
      </div>

      <div className="fixed bottom-4 w-full text-center z-50 pointer-events-none">
        <span className="text-xs text-zinc-400 dark:text-zinc-600 opacity-80">
          Built by Proximaz Holdings
        </span>
      </div>
    </div>
  )
}
export const Icons = {
  notion: (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Notion</title>
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
    </svg>
  ),
  mailchimp: (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>MailChimp</title>
      <path d="M11.837 0c6.602 0 11.984 5.381 11.984 11.994-.017 2.99-3.264 4.84-5.844 3.331a3.805 3.805 0 0 1-.06-.035l-.055-.033-.022.055c-2.554 4.63-9.162 4.758-11.894.232-2.732-4.527.46-10.313 5.746-10.416a6.868 6.868 0 0 1 7.002 6.866 1.265 1.265 0 0 0 2.52 0c0-5.18-4.197-9.38-9.377-9.387C4.611 2.594.081 10.41 3.683 16.673c3.238 5.632 11.08 6.351 15.289 1.402l1.997 1.686A11.95 11.95 0 0 1 11.837 24C2.6 23.72-2.87 13.543 1.992 5.684A12.006 12.006 0 0 1 11.837 0Zm0 7.745c-3.276-.163-5.5 3.281-4.003 6.2a4.26 4.26 0 0 0 4.014 2.31c3.276-.171 5.137-3.824 3.35-6.575a4.26 4.26 0 0 0-3.36-1.935Zm0 2.53c1.324 0 2.152 1.433 1.49 2.58a1.72 1.72 0 0 1-1.49.86 1.72 1.72 0 1 1 0-3.44Z"/>
    </svg>
  ),
  drive: (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Google Drive</title>
      <path d="M12.01 1.485c-2.082 0-3.754.02-3.743.047.01.02 1.708 3.001 3.774 6.62l3.76 6.574h3.76c2.081 0 3.753-.02 3.742-.047-.005-.02-1.708-3.001-3.775-6.62l-3.76-6.574zm-4.76 1.73a789.828 789.861 0 0 0-3.63 6.319L0 15.868l1.89 3.298 1.885 3.297 3.62-6.335 3.618-6.33-1.88-3.287C8.1 4.704 7.255 3.22 7.25 3.214zm2.259 12.653-.203.348c-.114.198-.96 1.672-1.88 3.287a423.93 423.948 0 0 1-1.698 2.97c-.01.026 3.24.042 7.222.042h7.244l1.796-3.157c.992-1.734 1.85-3.23 1.906-3.323l.104-.167h-7.249z"/>
    </svg>
  ),
  twitter: (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>X</title>
      <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/>
    </svg>
  )
}


// built with love by rishaan for proximaz holdings
