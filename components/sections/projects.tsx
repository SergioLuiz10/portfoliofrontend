"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Building2, User } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const projects = [
  {
    titlePt: "Crom.IA",
    titleEn: "Crom.AI",
    company: "MG3 Inovação e Tecnologia",
    descriptionPt: "Plataforma de assistente de IA para clientes do setor de cromatografia (HPLC/GC). Arquitetura de agentes especializados em n8n, pipeline RAG em FastAPI com LangChain + PGVector + OpenAI, ingestão de PDFs com deduplicação por hash, análise de imagem com GPT-4o Vision, e Edge Functions Supabase autenticadas.",
    descriptionEn: "AI assistant platform for chromatography sector clients (HPLC/GC). Specialized agent architecture in n8n, RAG pipeline in FastAPI with LangChain + PGVector + OpenAI, PDF ingestion with hash deduplication, image analysis with GPT-4o Vision, and authenticated Supabase Edge Functions.",
    tags: ["FastAPI", "LangChain", "n8n", "PGVector", "GPT-4o", "Supabase", "Docker"],
    type: "work",
  },
  {
    titlePt: "FreelancerOS",
    titleEn: "FreelancerOS",
    company: "Open Source",
    descriptionPt: "Assistente conversacional em linguagem natural que ajuda freelancers a organizar tarefas, prazos e clientes. Backend em FastAPI orquestrando agentes via n8n, com integração ao ClickUp e persistência em PostgreSQL.",
    descriptionEn: "Natural language conversational assistant that helps freelancers organize tasks, deadlines and clients. FastAPI backend orchestrating agents via n8n, with ClickUp integration and PostgreSQL persistence.",
    tags: ["FastAPI", "n8n", "Docker", "PostgreSQL", "OpenAI API", "ClickUp"],
    type: "personal",
    github: "https://github.com/SergioLuiz10/freelanceros",
  },
  {
    titlePt: "Automação Comercial MG3",
    titleEn: "MG3 Commercial Automation",
    company: "MG3 Inovação e Tecnologia",
    descriptionPt: "Automação end-to-end de propostas comerciais integrando Microsoft Forms, Power Automate, Planner, Outlook e API do Omie.",
    descriptionEn: "End-to-end commercial proposal automation integrating Microsoft Forms, Power Automate, Planner, Outlook and Omie API.",
    tags: ["Power Automate", "Microsoft Graph", "n8n", "Omie API"],
    type: "work",
  },
  {
    titlePt: "Bots WhatsApp",
    titleEn: "WhatsApp Bots",
    company: "MG3 Inovação e Tecnologia",
    descriptionPt: "Bots e fluxos automatizados de mensageria para atendimento, com roteamento de conversas e integração a sistemas internos.",
    descriptionEn: "Automated messaging bots and flows for customer service, with conversation routing and integration to internal systems.",
    tags: ["Java", "Spring Boot", "n8n", "EvolutionAPI", "Chatwoot"],
    type: "work",
  },
]

export function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projetos" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-serif italic text-foreground mb-4">
            {t("Projetos", "Projects")}
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            {t(
              "Sistemas que construí para resolver problemas reais",
              "Systems I built to solve real problems"
            )}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.article
                key={project.titlePt}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all relative overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {t(project.titlePt, project.titleEn)}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {project.type === "work" ? (
                          <Building2 className="h-3 w-3 text-muted-foreground" />
                        ) : (
                          <User className="h-3 w-3 text-muted-foreground" />
                        )}
                        <span className="text-sm text-muted-foreground font-mono">
                          {project.company}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                          aria-label="Ver no GitHub"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {t(project.descriptionPt, project.descriptionEn)}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary rounded border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
