import { Menu, X, Zap } from 'lucide-react'
import { useState } from 'react'

const links = [
  { href: '#servicos', label: 'Especialidades' },
  { href: '#simulador', label: 'Simulador' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#tunador', label: 'Tunador' },
  { href: '#contato', label: 'Contato' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/75 backdrop-blur-2xl">
      <nav aria-label="Navegação principal" className="mx-auto flex h-20 w-[min(92%,1200px)] items-center justify-between">
        <a href="#inicio" className="focus-ring group flex items-center gap-3 rounded-md font-black tracking-[0.18em]" aria-label="Turbo Motors, início">
          <span className="grid size-9 place-items-center rounded-lg bg-fire text-white shadow-lg shadow-fire/30 transition-transform group-hover:rotate-12"><Zap size={19} fill="currentColor" /></span>
          <span>TURBO<span className="text-fire">//</span>MOTORS</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => <a key={link.href} className="focus-ring rounded text-sm font-semibold text-slate-300 transition hover:text-white" href={link.href}>{link.label}</a>)}
          <a className="focus-ring rounded-full bg-white px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-electric" href="#contato">Agendar diagnóstico</a>
        </div>

        <button type="button" className="focus-ring rounded-lg p-2 md:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open ? (
        <div id="menu-mobile" className="border-t border-white/10 bg-panel px-[4%] pb-5 pt-3 md:hidden">
          {links.map((link) => <a key={link.href} onClick={closeMenu} className="focus-ring block rounded px-2 py-3 font-semibold text-slate-200" href={link.href}>{link.label}</a>)}
          <a onClick={closeMenu} className="focus-ring mt-2 block rounded-full bg-fire px-5 py-3 text-center font-bold" href="#contato">Agendar diagnóstico</a>
        </div>
      ) : null}
    </header>
  )
}
