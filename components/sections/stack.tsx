"use client"

import { motion } from "framer-motion"
import { 
  Brain, 
  Server, 
  Workflow, 
  Database, 
  Cloud, 
  Layout
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const stackCategories = [
  {
    icon: Brain,
    titlePt: "AI / Generative AI",
    titleEn: "AI / Generative AI",
    items: ["RAG", "LangChain", "OpenAI / GPT-4o", "PGVector", "Prompt Engineering"],
  },
  {
    icon: Server,
    titlePt: "Backend",
    titleEn: "Backend",
    items: ["Python (FastAPI)", "Node.js (Express)", "Java (Spring Boot)", "REST APIs"],
  },
  {
    icon: Workflow,
    titlePt: "Automação",
    titleEn: "Automation",
    items: ["n8n", "Power Automate", "Webhooks", "Microsoft Graph API"],
  },
  {
    icon: Database,
    titlePt: "Banco de Dados",
    titleEn: "Database",
    items: ["PostgreSQL", "MySQL", "PGVector", "Prisma"],
  },
  {
    icon: Cloud,
    titlePt: "Infra / DevOps",
    titleEn: "Infra / DevOps",
    items: ["Docker", "Git", "CI/CD", "VPS", "NGINX", "Linux"],
  },
  {
    icon: Layout,
    titlePt: "Frontend",
    titleEn: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
]

export function Stack() {
  const { t } = useLanguage()

  return (
    <section id="stack" className="py-24 md:py-32 bg-secondary/30 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-serif italic text-foreground mb-4">
            {t("Stack Técnica", "Tech Stack")}
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            {t(
              "Tecnologias que uso para construir sistemas inteligentes",
              "Technologies I use to build intelligent systems"
            )}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stackCategories.map((category, index) => (
              <motion.div
                key={category.titlePt}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <category.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-mono text-sm font-semibold text-foreground">
                    {t(category.titlePt, category.titleEn)}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 text-xs font-mono bg-secondary text-muted-foreground rounded border border-border hover:text-primary hover:border-primary/50 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
