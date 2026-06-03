"use client"

import { motion } from "framer-motion"
import { Award, ExternalLink } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const certifications = [
  {
    institution: "Alura",
    count: 5,
    certs: [
      "Python para Data Science",
      "APIs com FastAPI",
      "LangChain",
      "PostgreSQL",
      "Docker",
    ],
  },
  {
    institution: "Udemy",
    count: 1,
    certs: ["n8n Automation Masterclass"],
  },
  {
    institution: "UCSal",
    count: 1,
    certs: ["Fundamentos de Programação"],
  },
  {
    institution: "Cambridge",
    count: 1,
    certs: ["ESOL Certificate"],
  },
]

export function Certifications() {
  const { t } = useLanguage()

  const totalCerts = certifications.reduce((acc, curr) => acc + curr.count, 0)

  return (
    <section className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-serif italic text-foreground mb-4">
            {t("Certificações", "Certifications")}
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            {totalCerts}+ {t("certificados em tecnologias relevantes", "certificates in relevant technologies")}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.institution}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Award className="h-4 w-4" />
                  </div>
                  <span className="text-2xl font-bold text-primary font-mono">
                    {cert.count}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {cert.institution}
                </h3>
                <ul className="space-y-1">
                  {cert.certs.slice(0, 3).map((c) => (
                    <li
                      key={c}
                      className="text-xs text-muted-foreground truncate"
                    >
                      {c}
                    </li>
                  ))}
                  {cert.certs.length > 3 && (
                    <li className="text-xs text-primary font-mono">
                      +{cert.certs.length - 3} {t("mais", "more")}
                    </li>
                  )}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
