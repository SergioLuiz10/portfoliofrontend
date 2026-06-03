"use client"

import { motion } from "framer-motion"
import { Building2, Calendar, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const experiences = [
  {
    company: "MG3 Inovação e Tecnologia",
    rolePt: "Desenvolvedor Autônomo",
    roleEn: "Freelance Developer",
    periodPt: "Atual",
    periodEn: "Current",
    location: "Salvador, BA",
    descriptionPt: "Desenvolvimento de soluções de IA generativa para o setor de cromatografia, incluindo sistemas RAG, agentes inteligentes e automação de processos comerciais.",
    descriptionEn: "Development of generative AI solutions for the chromatography sector, including RAG systems, intelligent agents, and commercial process automation.",
    current: true,
  },
  {
    company: "Hunter Consultoria",
    rolePt: "Estagiário em Desenvolvimento Backend",
    roleEn: "Backend Development Intern",
    periodPt: "Mar/2025 — Jun/2025",
    periodEn: "Mar/2025 — Jun/2025",
    location: "Salvador, BA",
    descriptionPt: "Desenvolvimento de APIs e sistemas backend, integrações com serviços externos e automação de processos internos.",
    descriptionEn: "API and backend systems development, integrations with external services, and internal process automation.",
    current: false,
  },
]

export function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experiencia" className="py-24 md:py-32 bg-secondary/30 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-serif italic text-foreground mb-4">
            {t("Experiência", "Experience")}
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            {t(
              "Onde apliquei minhas habilidades",
              "Where I applied my skills"
            )}
          </p>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-8 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-0 md:left-8 top-2 -translate-x-1/2 w-3 h-3 rounded-full border-2 ${
                    exp.current 
                      ? "bg-primary border-primary" 
                      : "bg-background border-muted-foreground"
                  }`}>
                    {exp.current && (
                      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
                    )}
                  </div>

                  <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {t(exp.rolePt, exp.roleEn)}
                        </h3>
                        <div className="flex items-center gap-2 text-primary">
                          <Building2 className="h-4 w-4" />
                          <span className="font-mono text-sm">{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start md:items-end gap-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span className="font-mono">{t(exp.periodPt, exp.periodEn)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t(exp.descriptionPt, exp.descriptionEn)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
