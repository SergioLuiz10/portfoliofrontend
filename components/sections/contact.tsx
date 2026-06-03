"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, Linkedin, Github, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

const EMAIL = "sergioluizteixeira12345@gmail.com"

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+55 71 98132-5228",
    href: "https://wa.me/5571981325228",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "/in/sérgio-nunes",
    href: "https://linkedin.com/in/sérgio-nunes-02a314287",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "/SergioLuiz10",
    href: "https://github.com/SergioLuiz10",
  },
]

export function Contact() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contato" className="py-24 md:py-32 bg-secondary/30 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif italic text-foreground mb-4">
            {t("Contato", "Contact")}
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            {t(
              "Disponível para oportunidades em AI/ML Engineering",
              "Available for opportunities in AI/ML Engineering"
            )}
          </p>

          {/* Copy email button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Button
              onClick={handleCopyEmail}
              variant="outline"
              size="lg"
              className="font-mono text-sm border-primary/50 hover:bg-primary/10 hover:border-primary group"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  {t("Copiado!", "Copied!")}
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  {EMAIL}
                </>
              )}
            </Button>
          </motion.div>

          {/* Contact links grid */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all group"
              >
                <div className="shrink-0 p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <link.icon className="h-5 w-5" />
                </div>
                <div className="text-left min-w-0 overflow-hidden">
                  <p className="text-xs font-mono text-muted-foreground mb-0.5">
                    {link.label}
                  </p>
                  <p className="text-sm text-foreground group-hover:text-primary transition-colors truncate">
                    {link.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
