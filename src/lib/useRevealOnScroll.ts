import { useEffect } from 'react'

export function useRevealOnScroll() {
  useEffect(() => {
    const selector = '[data-reveal]'

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll<HTMLElement>(selector).forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }),
      { threshold: 0.12 },
    )

    const observeElement = (element: HTMLElement) => {
      element.querySelectorAll<HTMLElement>('.surface, article, [data-stagger-item]').forEach((item, index) => {
        item.classList.add('stagger-item')
        item.style.setProperty('--stagger-delay', `${Math.min(index * 90, 540)}ms`)
      })
      observer.observe(element)
    }
    document.querySelectorAll<HTMLElement>(selector).forEach(observeElement)

    // Seções carregadas por lazy/Suspense entram depois do primeiro scan.
    // Observá-las evita que fiquem transparentes enquanto ainda ocupam espaço.
    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return
        if (node.matches(selector)) observeElement(node)
        node.querySelectorAll<HTMLElement>(selector).forEach(observeElement)
      }))
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])
}
