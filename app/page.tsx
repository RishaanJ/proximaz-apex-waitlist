"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { LineShadowText } from "@/components/ui/line-shadow-text"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import { AuroraText } from "@/components/ui/aurora-text"
import { SparklesText } from "@/components/ui/sparkles-text"
import { DotPattern } from "@/components/ui/dot-pattern"
import { NumberTicker } from "@/components/ui/number-ticker"

import { cn } from "@/lib/utils"


export default function Home() {
  const theme = useTheme()
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black"
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [waitlistCount, setWaitlistCount] = useState(500)

  // Fetch waitlist count on mount
  useEffect(() => {
    fetch("/api/waitlist")
      .then((res) => res.json())
      .then((data) => {
        if (data.count !== undefined) {
          setWaitlistCount(data.count)
        }
      })
      .catch((err) => console.error("Failed to fetch waitlist count:", err))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage({ type: "error", text: data.error || "Something went wrong" })
        return
      }

      setMessage({ type: "success", text: data.message || "Successfully joined the waitlist!" })
      setEmail("")
      // Update count after successful submission
      const countResponse = await fetch("/api/waitlist")
      const countData = await countResponse.json()
      if (countData.count !== undefined) {
        setWaitlistCount(countData.count)
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black px-4 space-y-8 overflow-hidden">
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

        <h2 className="mt-10 text-center font-normal tracking-tight inline-block text-[clamp(1rem,3vw,1.5rem)] max-w-xl">
          Join the{" "}
          <AuroraText className="font-bold tracking-tight">
            {waitlistCount !== null ? (
              <NumberTicker
                value={waitlistCount + 15}
                className="font-bold tracking-tight"
              />
            ) : (
              <span>...</span>
            )}
          </AuroraText>
          {" "}businesses waiting for launch
        </h2>
      </div>


      <div className="w-full max-w-md z-10">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="rishaan@nonprofit.org"
            required
            disabled={isLoading}
            className="flex-1 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm outline-none placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {isLoading ? "Joining..." : "Join"}
          </button>
        </form>
        {message && (
          <div
            className={cn(
              "mt-3 text-sm text-center rounded-full px-4 py-2",
              message.type === "success"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            )}
          >
            {message.text}
          </div>
        )}
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
    <svg role="img" viewBox="0 0 24 24" width={256} height={256} xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Notion</title>
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
    </svg>
  ),
  mailchimp: (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 256 256" width={500} height={500} xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>MailChimp</title>
      <rect width="256" height="256" fill="#F4F2ED" rx="60"/>
      <path fill="#4285F4" d="M41.636 203.039h31.818v-77.273L28 91.676v97.727c0 7.545 6.114 13.636 13.636 13.636"/>
      <path fill="#34A853" d="M182.545 203.039h31.819c7.545 0 13.636-6.114 13.636-13.636V91.675l-45.455 34.091"/>
      <path fill="#FBBC04" d="M182.545 66.675v59.091L228 91.676V73.492c0-16.863-19.25-26.477-32.727-16.363"/>
      <path fill="#EA4335" d="M73.455 125.766v-59.09L128 107.583l54.545-40.909v59.091L128 166.675"/>
      <path fill="#C5221F" d="M28 73.493v18.182l45.454 34.091v-59.09L60.727 57.13C47.227 47.016 28 56.63 28 73.493"/>
    </svg>
  ),
  drive: (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 256 256" width={256} height={256} xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Google Drive</title>
      <path fill="#0066DA" d="m19.354 196.034 11.29 19.5c2.346 4.106 5.718 7.332 9.677 9.678q17.009-21.591 23.68-33.137q6.77-11.717 16.641-36.655q-26.604-3.502-40.32-3.502q-13.165 0-40.322 3.502c0 4.545 1.173 9.09 3.519 13.196z"/>
      <path fill="#EA4335" d="M215.681 225.212c3.96-2.346 7.332-5.572 9.677-9.677l4.692-8.064l22.434-38.855a26.57 26.57 0 0 0 3.518-13.196q-27.315-3.502-40.247-3.502q-13.899 0-40.248 3.502q9.754 25.075 16.422 36.655q6.724 11.683 23.752 33.137"/>
      <path fill="#00832D" d="M128.001 73.311q19.68-23.768 27.125-36.655q5.996-10.377 13.196-33.137C164.363 1.173 159.818 0 155.126 0h-54.25C96.184 0 91.64 1.32 87.68 3.519q9.16 26.103 15.544 37.154q7.056 12.213 24.777 32.638"/>
      <path fill="#2684FC" d="M175.36 155.42H80.642l-40.32 69.792c3.958 2.346 8.503 3.519 13.195 3.519h148.968c4.692 0 9.238-1.32 13.196-3.52z"/>
      <path fill="#00AC47" d="M128.001 73.311L87.681 3.52c-3.96 2.346-7.332 5.571-9.678 9.677L3.519 142.224A26.57 26.57 0 0 0 0 155.42h80.642z"/>
      <path fill="#FFBA00" d="m215.242 77.71-37.243-64.514c-2.345-4.106-5.718-7.331-9.677-9.677l-40.32 69.792 47.358 82.109h80.496c0-4.546-1.173-9.09-3.519-13.196z"/>
    </svg>
  ),

  twitter: (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" width={256} height={256} xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>X</title>
      <path fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="m3 21l7.5-7.5m3-3L21 3M8 3H3l13 18h5Z"/>
    </svg>
  )
}


// built with love by rishaan for proximaz holdings
