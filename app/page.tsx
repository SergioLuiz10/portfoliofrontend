"use client"

import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { AskSergio } from "@/components/sections/ask-sergio"
import { Stack } from "@/components/sections/stack"
import { Projects } from "@/components/sections/projects"
import { Experience } from "@/components/sections/experience"
import { Certifications } from "@/components/sections/certifications"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <AskSergio />
        <Stack />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
