"use client"

import { motion } from "framer-motion"
import { MapPin, GraduationCap, Languages } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function About() {
  const { t } = useLanguage()

  return (
    <section id="sobre" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-serif italic text-foreground mb-8">
            {t("Sobre", "About")}
          </h2>
          
          <div className="grid md:grid-cols-[2fr_1fr] gap-12">
            {/* Bio */}
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-foreground/90 leading-relaxed"
              >
                {t(
                  "Sou desenvolvedor backend com foco em IA generativa e automação de processos. Minha paixão é transformar ideias complexas em sistemas inteligentes que realmente fazem a diferença — seja um assistente RAG que responde perguntas técnicas sobre cromatografia, ou um bot que automatiza fluxos comerciais inteiros.",
                  "I'm a backend developer focused on generative AI and process automation. My passion is transforming complex ideas into intelligent systems that actually make a difference — whether it's a RAG assistant that answers technical questions about chromatography, or a bot that automates entire commercial workflows."
                )}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-foreground/90 leading-relaxed"
              >
                {t(
                  "Atualmente trabalho de forma autônoma na MG3 Inovação e Tecnologia, onde desenvolvo soluções de IA para o setor de cromatografia. Estou sempre explorando novas tecnologias e buscando formas criativas de aplicar IA para resolver problemas do mundo real.",
                  "I currently work as a freelancer at MG3 Innovation and Technology, where I develop AI solutions for the chromatography sector. I'm always exploring new technologies and seeking creative ways to apply AI to solve real-world problems."
                )}
              </motion.p>
            </div>

            {/* Info cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="p-4 rounded-lg bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-mono text-muted-foreground">
                    {t("Localização", "Location")}
                  </span>
                </div>
                <p className="text-foreground font-medium">Salvador, BA</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="p-4 rounded-lg bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-mono text-muted-foreground">
                    {t("Formação", "Education")}
                  </span>
                </div>
                <p className="text-foreground font-medium">
                  {t("ADS — UCSal", "IT — UCSal")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("Conclusão: Dez/2026", "Graduation: Dec/2026")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="p-4 rounded-lg bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Languages className="h-4 w-4 text-primary" />
                  <span className="text-sm font-mono text-muted-foreground">
                    {t("Idiomas", "Languages")}
                  </span>
                </div>
                <p className="text-foreground font-medium">
                  {t("Português", "Portuguese")} <span className="text-muted-foreground text-sm">{t("(nativo)", "(native)")}</span>
                </p>
                <p className="text-foreground font-medium">
                  {t("Inglês", "English")} <span className="text-muted-foreground text-sm">{t("(avançado — Cambridge)", "(advanced — Cambridge)")}</span>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
