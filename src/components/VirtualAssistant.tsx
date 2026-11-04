import { AlertTriangle, Bot, ChevronDown, LoaderCircle, MessageCircle, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { AIChatError, isAIConfigured, sendChatMessage, type ChatMessage } from '../lib/aiChat'

const prompts = ['Quero um orçamento', 'Qual stage é ideal?', 'Agendar diagnóstico']
const initialMessage: ChatMessage = { role: 'assistant', content: 'Olá! Sou o assistente Turbo Motors. Posso ajudar com performance, estética ou a rota ideal para o seu projeto.' }

export function VirtualAssistant() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }, [messages, isLoading, error])

  const send = async (value = message) => {
    const content = value.trim()
    if (!content || isLoading || !isAIConfigured) return
    const nextHistory = [...messages, { role: 'user' as const, content }]
    setMessages(nextHistory)
    setMessage('')
    setError('')
    setIsLoading(true)
    try {
      const reply = await sendChatMessage(nextHistory)
      setMessages((current) => [...current, { role: 'assistant', content: reply }])
    } catch (cause) {
      setError(cause instanceof AIChatError ? cause.message : 'Não foi possível gerar uma resposta agora.')
    } finally {
      setIsLoading(false)
    }
  }

  const blocked = !isAIConfigured || isLoading
  return (
    <aside className="fixed bottom-24 right-6 z-50 pointer-events-auto">
      <div id="virtual-assistant" className={`surface mb-3 w-[min(22rem,calc(100vw-2.5rem))] origin-bottom-right overflow-hidden rounded-2xl transition duration-300 ${open ? 'scale-100 opacity-100' : 'pointer-events-none absolute bottom-16 right-0 scale-95 opacity-0'}`} aria-hidden={!open}>
        <div className="flex items-center justify-between border-b border-white/10 p-4"><span className="flex items-center gap-2 font-bold"><Bot size={18} className="text-electric" /> Assistente Turbo</span><button type="button" className="focus-ring rounded p-1 hover:bg-white/10" onClick={() => setOpen(false)} aria-label="Fechar assistente"><ChevronDown size={18} /></button></div>
        <div className="p-4">
          {!isAIConfigured ? <p className="mb-3 flex gap-2 rounded-xl border border-amber-300/25 bg-amber-300/10 p-3 text-xs leading-5 text-amber-100" role="status"><AlertTriangle className="mt-0.5 shrink-0" size={16} /> Configure <code>VITE_AI_API_KEY</code> em <code>.env.local</code> para ativar o assistente de IA.</p> : null}
          <div className="max-h-64 space-y-3 overflow-y-auto pr-1" aria-live="polite">{messages.map((item, index) => <p key={`${item.role}-${index}`} className={`rounded-xl p-3 text-sm leading-6 ${item.role === 'assistant' ? 'bg-white/7 text-slate-200' : 'ml-8 bg-electric/12 text-white'}`}>{item.content}</p>)}{isLoading ? <p className="flex items-center gap-2 rounded-xl bg-white/7 p-3 text-sm text-slate-300"><LoaderCircle className="animate-spin text-electric" size={16} /> Pensando na melhor rota...</p> : null}{error ? <p className="rounded-xl border border-fire/35 bg-fire/10 p-3 text-xs leading-5 text-red-100" role="alert">{error}</p> : null}<div ref={endRef} /></div>
          <div className="mt-3 flex flex-wrap gap-2">{prompts.map((prompt) => <button disabled={blocked} type="button" key={prompt} onClick={() => void send(prompt)} className="focus-ring rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-electric hover:text-white disabled:cursor-not-allowed disabled:opacity-45">{prompt}</button>)}</div>
          <div className="mt-4 flex gap-2"><label className="sr-only" htmlFor="assistant-message">Mensagem para o assistente</label><input id="assistant-message" disabled={blocked} value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') void send() }} placeholder={isAIConfigured ? 'Escreva sua dúvida' : 'Configure a IA para conversar'} className="focus-ring min-w-0 flex-1 rounded-xl border border-white/12 bg-black/20 px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50" /><button type="button" disabled={blocked || !message.trim()} onClick={() => void send()} className="focus-ring grid size-10 place-items-center rounded-xl bg-fire hover:bg-[#ff684c] disabled:cursor-not-allowed disabled:opacity-50" aria-label="Enviar mensagem">{isLoading ? <LoaderCircle className="animate-spin" size={17} /> : <Send size={17} />}</button></div>
        </div>
      </div>
      <button type="button" onClick={() => setOpen((value) => !value)} className="focus-ring flex items-center gap-2 rounded-full border border-white/20 bg-panel px-4 py-3 text-sm font-bold shadow-xl shadow-black/40 transition hover:-translate-y-1 hover:border-electric" aria-expanded={open} aria-controls="virtual-assistant"><MessageCircle size={18} className="text-electric" /> Assistente</button>
    </aside>
  )
}
