"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const predefinedResponses: Record<string, { pt: string; en: string }> = {
  "Quanto tempo de experiência com FastAPI?": {
    pt: "O Sérgio trabalha com FastAPI há cerca de 1 ano de forma intensiva. No Crom.IA (MG3 Inovação), construiu desde o zero o pipeline RAG completo: endpoints de chat, ingestão de PDFs com deduplicação por hash MD5, integração com LangChain e PGVector, e um serviço standalone de análise de imagem com GPT-4o Vision. Também usa FastAPI no projeto pessoal FreelancerOS.",
    en: "Sérgio has been working intensively with FastAPI for about 1 year. At Crom.IA (MG3 Inovação), he built from scratch the complete RAG pipeline: chat endpoints, PDF ingestion with MD5 hash deduplication, LangChain and PGVector integration, and a standalone image analysis service with GPT-4o Vision. He also uses FastAPI in his personal project FreelancerOS."
  },
  "Me fala sobre o projeto Crom.IA": {
    pt: "Crom.IA é uma plataforma de assistente de IA para clientes do setor de cromatografia analítica (HPLC, GC). A arquitetura usa agentes especializados orquestrados em n8n, com um Orquestrador central que roteia para módulos: Troubleshooting (diagnóstico em 4 estágios com escalação por email), Estudo Guiado, Gestão e análise de imagem. Backend em FastAPI + LangChain + PGVector + OpenAI, com Edge Functions Supabase autenticadas, e deploy via Docker no EasyPanel.",
    en: "Crom.IA is an AI assistant platform for analytical chromatography clients (HPLC, GC). The architecture uses specialized agents orchestrated in n8n, with a central Orchestrator routing to modules: Troubleshooting (4-stage diagnosis with email escalation), Guided Study, Management and image analysis. Backend in FastAPI + LangChain + PGVector + OpenAI, with authenticated Supabase Edge Functions, deployed via Docker on EasyPanel."
  },
  "Qual sua stack favorita pra construir RAG?": {
    pt: "FastAPI no backend, LangChain pra orquestração, PostgreSQL com PGVector pra vector store (mais barato e simples que Pinecone), OpenAI ou Anthropic pros LLMs, e Docker pro deploy. Pra ingestão de documentos, usa hash MD5 pra deduplicação e chunking semântico. Tudo isso já foi aplicado em produção no Crom.IA.",
    en: "FastAPI for the backend, LangChain for orchestration, PostgreSQL with PGVector for vector store (cheaper and simpler than Pinecone), OpenAI or Anthropic for LLMs, and Docker for deployment. For document ingestion, uses MD5 hash for deduplication and semantic chunking. All of this has been applied in production at Crom.IA."
  },
  "Você tem experiência com agentes de IA?": {
    pt: "Sim. No Crom.IA construiu uma arquitetura multi-agente em n8n com Orquestrador roteando para agentes especializados, cada um com prompt próprio, ferramentas específicas e fluxos de escalação. No FreelancerOS, agentes interpretam linguagem natural pra criar e atualizar tarefas no ClickUp via FastAPI + n8n.",
    en: "Yes. At Crom.IA he built a multi-agent architecture in n8n with an Orchestrator routing to specialized agents, each with its own prompt, specific tools and escalation flows. At FreelancerOS, agents interpret natural language to create and update tasks in ClickUp via FastAPI + n8n."
  },
  "Quais certificações de IA você tem?": {
    pt: "Em IA: 'LangChain e Python' (Alura, 2026) e 'Python: Inteligência Artificial Aplicada' (Alura, 2026). Também tem formação em análise de dados com Python/SQL, Node.js e Spring Boot. Cursando ADS na UCSal com conclusão prevista pra dezembro/2026.",
    en: "In AI: 'LangChain and Python' (Alura, 2026) and 'Python: Applied Artificial Intelligence' (Alura, 2026). Also has training in data analysis with Python/SQL, Node.js and Spring Boot. Pursuing a degree in Systems Analysis at UCSal with expected completion in December/2026."
  }
}

const defaultResponse = {
  pt: "Boa pergunta! No momento estou em modo demo com respostas pré-definidas. Em breve terei acesso completo ao CV e projetos do Sérgio. Enquanto isso, experimenta as perguntas sugeridas ou entra em contato direto na seção abaixo!",
  en: "Good question! Currently I'm in demo mode with predefined answers. Soon I'll have full access to Sérgio's CV and projects. In the meantime, try the suggested questions or contact him directly in the section below!"
}

const suggestedQuestions = {
  pt: [
    "Quanto tempo de experiência com FastAPI?",
    "Me fala sobre o projeto Crom.IA",
    "Qual sua stack favorita pra construir RAG?",
    "Você tem experiência com agentes de IA?",
    "Quais certificações de IA você tem?"
  ],
  en: [
    "How much experience with FastAPI?",
    "Tell me about the Crom.IA project",
    "What's your favorite stack for building RAG?",
    "Do you have experience with AI agents?",
    "What AI certifications do you have?"
  ]
}

const initialMessage = {
  pt: "Olá! Sou o agente de IA do Sérgio. Posso responder perguntas sobre experiência com IA generativa, projetos como Crom.IA e FreelancerOS, stack técnica, ou qualquer coisa do CV. O que quer saber?",
  en: "Hello! I'm Sérgio's AI agent. I can answer questions about experience with generative AI, projects like Crom.IA and FreelancerOS, tech stack, or anything from the CV. What would you like to know?"
}

export function AskSergio() {
  const { language, t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "assistant",
      content: language === "pt" ? initialMessage.pt : initialMessage.en,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [streamingText, setStreamingText] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingText])

  useEffect(() => {
    setMessages([
      {
        id: "initial",
        role: "assistant",
        content: language === "pt" ? initialMessage.pt : initialMessage.en,
        timestamp: new Date()
      }
    ])
  }, [language])

  const getResponse = (question: string): string => {
    const ptQuestion = Object.keys(predefinedResponses).find(
      (q) => q.toLowerCase() === question.toLowerCase()
    )
    
    if (ptQuestion) {
      return language === "pt" 
        ? predefinedResponses[ptQuestion].pt 
        : predefinedResponses[ptQuestion].en
    }

    const enToPortuguese: Record<string, string> = {
      "how much experience with fastapi?": "Quanto tempo de experiência com FastAPI?",
      "tell me about the crom.ia project": "Me fala sobre o projeto Crom.IA",
      "what's your favorite stack for building rag?": "Qual sua stack favorita pra construir RAG?",
      "do you have experience with ai agents?": "Você tem experiência com agentes de IA?",
      "what ai certifications do you have?": "Quais certificações de IA você tem?"
    }

    const mappedQuestion = enToPortuguese[question.toLowerCase()]
    if (mappedQuestion && predefinedResponses[mappedQuestion]) {
      return language === "pt"
        ? predefinedResponses[mappedQuestion].pt
        : predefinedResponses[mappedQuestion].en
    }

    return language === "pt" ? defaultResponse.pt : defaultResponse.en
  }

  const streamResponse = async (response: string) => {
    setIsStreaming(true)
    setStreamingText("")
    
    for (let i = 0; i <= response.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 15))
      setStreamingText(response.slice(0, i))
    }
    
    setIsStreaming(false)
    setStreamingText("")
    
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
        timestamp: new Date()
      }
    ])
  }

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping || isStreaming) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setShowSuggestions(false)
    setIsTyping(true)

    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsTyping(false)

    const response = getResponse(text.trim())
    await streamResponse(response)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputValue)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === "pt" ? "pt-BR" : "en-US", {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <section id="ask" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-sm font-mono text-primary mb-4">
            {"// "}ASK SÉRGIO
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <p className="text-2xl md:text-3xl font-medium text-foreground text-balance">
              {t(
                "Pergunte qualquer coisa sobre minha experiência",
                "Ask anything about my experience"
              )}
            </p>
            <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/10 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Online
            </span>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t(
              "Chat com um agente de IA que conhece meu currículo, projetos e stack técnica. Mesmo tipo de sistema RAG que construí no Crom.IA — agora aplicado a mim mesmo.",
              "Chat with an AI agent that knows my resume, projects and tech stack. Same type of RAG system I built at Crom.IA — now applied to myself."
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-[720px] mx-auto"
        >
          <div className="rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm shadow-lg overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                SN
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Sérgio AI</p>
                <p className="text-xs font-mono text-muted-foreground">
                  RAG Agent · GPT-4o
                </p>
              </div>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
            </div>

            {/* Messages Area */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                        SN
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] ${
                        message.role === "user"
                          ? "bg-primary/20 rounded-2xl rounded-br-md px-4 py-2"
                          : ""
                      }`}
                    >
                      <p className="text-foreground text-sm leading-relaxed">
                        {message.content}
                      </p>
                      <p className="text-xs font-mono text-muted-foreground mt-1">
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                    SN
                  </div>
                  <div className="flex items-center gap-1 px-4 py-3">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                  </div>
                </motion.div>
              )}

              {/* Streaming Text */}
              {isStreaming && streamingText && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                    SN
                  </div>
                  <div className="max-w-[80%]">
                    <p className="text-foreground text-sm leading-relaxed">
                      {streamingText}
                      <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse" />
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Suggestions */}
              {showSuggestions && messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-2 mt-4"
                >
                  {(language === "pt" ? suggestedQuestions.pt : suggestedQuestions.en).map(
                    (question, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => sendMessage(language === "pt" ? suggestedQuestions.pt[index] : suggestedQuestions.pt[index])}
                        className="px-3 py-1.5 text-xs rounded-full border border-primary/30 text-foreground hover:bg-primary/10 transition-colors"
                      >
                        {question}
                      </motion.button>
                    )
                  )}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value.slice(0, 500))}
                    onKeyDown={handleKeyDown}
                    disabled={isTyping || isStreaming}
                    placeholder={t(
                      "Pergunte algo sobre o Sérgio...",
                      "Ask something about Sérgio..."
                    )}
                    rows={1}
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 text-sm"
                    aria-label={t("Campo de mensagem", "Message field")}
                  />
                  <span className="absolute right-3 bottom-1 text-xs font-mono text-muted-foreground">
                    {inputValue.length}/500
                  </span>
                </div>
                <Button
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping || isStreaming}
                  size="icon"
                  className="h-12 w-12 rounded-xl shrink-0"
                  aria-label={t("Enviar mensagem", "Send message")}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs font-mono text-muted-foreground mt-4">
            Powered by FastAPI · LangChain · PGVector · GPT-4o
          </p>
        </motion.div>
      </div>
    </section>
  )
}
