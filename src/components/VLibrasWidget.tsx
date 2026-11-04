import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    VLibras?: { Widget: new (source: string) => unknown }
    __turboVlibrasReady?: boolean
  }
}

const scriptId = 'vlibras-plugin-script'

export function VLibrasWidget() {
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const widget = widgetRef.current
    widget?.setAttribute('vw', '')
    widget?.querySelector('[data-vw-access]')?.setAttribute('vw-access-button', '')
    widget?.querySelector('[data-vw-wrapper]')?.setAttribute('vw-plugin-wrapper', '')

    const initialize = () => {
      if (!window.VLibras || window.__turboVlibrasReady) return
      new window.VLibras.Widget('https://vlibras.gov.br/app')
      window.__turboVlibrasReady = true
    }

    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null
    if (existingScript) {
      initialize()
      existingScript.addEventListener('load', initialize)
      return () => existingScript.removeEventListener('load', initialize)
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js'
    script.async = true
    script.onload = initialize
    document.body.appendChild(script)

    return () => script.removeEventListener('load', initialize)
  }, [])

  return <div ref={widgetRef} className="enabled" aria-label="Acessibilidade em Libras"><div data-vw-access className="active" /><div data-vw-wrapper><div className="vw-plugin-top-wrapper" /></div></div>
}
