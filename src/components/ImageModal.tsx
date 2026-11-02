import { X } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

type Props = { open: boolean; src: string; alt: string; caption: string; onClose: () => void }
export function ImageModal({ open, src, alt, caption, onClose }: Props) {
  useEffect(() => { if (!open) return; const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }; document.addEventListener('keydown', onKeyDown); return () => document.removeEventListener('keydown', onKeyDown) }, [open, onClose])
  if (!open) return null
  return createPortal(<div className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4 backdrop-blur-md animate-[fade-in-up_.2s_ease-out]" role="dialog" aria-modal="true" aria-label={caption} onMouseDown={onClose}><div className="relative max-h-full max-w-6xl overflow-hidden rounded-2xl border border-white/20 bg-ink shadow-2xl" onMouseDown={(event) => event.stopPropagation()}><img src={src} alt={alt} className="max-h-[78vh] w-full object-contain" /><div className="flex items-center justify-between gap-4 border-t border-white/10 p-4"><p className="text-sm text-slate-300">{caption}</p><button type="button" onClick={onClose} className="focus-ring grid size-10 place-items-center rounded-full border border-white/15 hover:bg-white/10" aria-label="Fechar visualização"><X size={20} /></button></div></div></div>, document.body)
}
