import { MessageCircle } from 'lucide-react'

const message = encodeURIComponent('Olá, Turbo Motors! Gostaria de agendar um diagnóstico de performance.')
const whatsappUrl = `https://wa.me/5511999999999?text=${message}`

export function WhatsAppButton() {
  return (
    <a href={whatsappUrl} target="_blank" rel="noreferrer" className="focus-ring group fixed bottom-6 right-6 z-50 flex size-13 items-center justify-center overflow-hidden rounded-full bg-[#25D366] text-white shadow-[0_12px_35px_-8px_#25D366] transition-all duration-300 hover:w-53 hover:justify-start hover:gap-2 hover:px-4 pointer-events-auto" aria-label="Falar com a Turbo Motors pelo WhatsApp">
      <MessageCircle className="shrink-0" size={25} fill="currentColor" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold opacity-0 transition-all duration-300 group-hover:max-w-34 group-hover:opacity-100">Fale conosco</span>
    </a>
  )
}
