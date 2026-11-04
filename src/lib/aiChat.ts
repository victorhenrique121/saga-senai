import { GoogleGenAI } from '@google/genai'

export type ChatRole = 'user' | 'assistant'
export interface ChatMessage { role: ChatRole; content: string }

export class AIChatError extends Error {
  constructor(message: string, public readonly code: 'configuration' | 'network' | 'api' | 'timeout') {
    super(message)
    this.name = 'AIChatError'
  }
}

const systemPrompt = `Você é o assistente virtual oficial da Turbo Motors / Saga Senai. Responda em português do Brasil, de forma objetiva, cordial e tecnicamente responsável. Você é especialista em preparação automotiva, reprogramação de centrais, dinâmica de motores, suspensão, freios, restomod e estética de alto desempenho. Não invente ganhos garantidos: explique que números reais dependem de diagnóstico, combustível, componentes e dinamômetro. Direcione pedidos de orçamento para o formulário quando apropriado.`

const apiKey = import.meta.env.VITE_AI_API_KEY?.trim()
export const isAIConfigured = Boolean(apiKey)

// Inicializa o cliente oficial do Google Gen AI
const ai = new GoogleGenAI({ apiKey: apiKey || '' })

export async function sendChatMessage(history: ChatMessage[]): Promise<string> {
  if (!apiKey) {
    throw new AIChatError('A chave do Gemini não foi configurada no arquivo .env.', 'configuration')
  }

  try {
    // O SDK oficial gere a rota, versão e autenticação de forma transparente
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash', // Modelo padrão atual e altamente estável
      contents: history.map((message) => ({
        role: message.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: message.content }],
      })),
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.65,
      },
    })

    const content = response.text?.trim()
    if (!content) {
      throw new AIChatError('O Gemini retornou uma resposta vazia.', 'api')
    }

    return content
  } catch (error: any) {
    console.error('Falha na solicitação ao Gemini:', error)
    if (error instanceof AIChatError) throw error
    
    // Tratamento de erros amigável do SDK ou de rede
    const errorMessage = error?.message || 'Falha ao comunicar com o Gemini.'
    if (errorMessage.includes('aborted') || errorMessage.includes('timeout')) {
      throw new AIChatError('A resposta demorou mais do que o esperado. Tente novamente.', 'timeout')
    }
    
    throw new AIChatError(errorMessage, 'api')
  }
}