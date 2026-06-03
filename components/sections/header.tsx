"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Moon, Sun, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

const navItems = [
  { pt: "Ask Sérgio", en: "Ask Sérgio", href: "#ask" },
  { pt: "Sobre", en: "About", href: "#sobre" },
  { pt: "Stack", en: "Stack", href: "#stack" },
  { pt: "Projetos", en: "Projects", href: "#projetos" },
  { pt: "Experiência", en: "Experience", href: "#experiencia" },
  { pt: "Contato", en: "Contact", href: "#contato" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) return null

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <motion.a
          href="#"
          className="font-serif text-xl italic text-foreground tracking-tight"
          whileHover={{ scale: 1.02 }}
        >
          sérgio nunes
        </motion.a>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {t(item.pt, item.en)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
            className="text-muted-foreground hover:text-primary"
          >
            <Globe className="h-5 w-5" />
            <span className="sr-only">Toggle language</span>
          </Button>
          <span className="text-xs font-mono text-muted-foreground uppercase">
            {language}
          </span>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-primary"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </nav>
    </motion.header>
  )
}
