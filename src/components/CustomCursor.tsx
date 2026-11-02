import { useEffect, useRef } from 'react'

const interactiveSelector = 'a, button, input, textarea, select, [role="button"], article'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px) and (pointer: fine)')
    const cursor = cursorRef.current
    if (!cursor || !query.matches) return
    document.body.classList.add('has-custom-cursor')
    let frame = 0
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
        cursor.classList.toggle('cursor-active', Boolean((event.target as Element | null)?.closest(interactiveSelector)))
      })
    }
    const onLeave = () => cursor.classList.add('cursor-hidden')
    const onEnter = () => cursor.classList.remove('cursor-hidden')
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return <div ref={cursorRef} aria-hidden="true" className="custom-cursor cursor-hidden"><span className="custom-cursor__core" /><span className="custom-cursor__ring" /></div>
}
