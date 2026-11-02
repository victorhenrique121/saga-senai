# Turbo Motors

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=061018)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel)](https://vercel.com/)

Landing page SPA de alta performance para a Turbo Motors. O projeto combina uma experiência visual dark premium com configurador dinâmico de performance e controles de acessibilidade nativos.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| React 19 + TypeScript | Interface tipada e componentizada |
| Vite | Desenvolvimento local e build otimizado |
| Tailwind CSS 4 | Design responsivo, tokens e microinterações |
| Lucide React | Iconografia vetorial acessível |
| Recharts | Curvas dinâmicas de potência e torque |
| Web Speech API | Leitura de conteúdo em português |

## Recursos

- Design responsivo com glassmorphism, gradientes e efeitos sutis de movimento.
- Simulador de Stage 1, 2 e 3 com potência e torque estimados em tempo real.
- Ajustes de acessibilidade: fonte entre 90% e 130%, alto contraste, escala de cinza, espaçamento ampliado e leitura por voz.
- Formulário com validação de nome, e-mail e mensagem; retorno visual de sucesso.
- Catálogo local tipado em `src/data/vehicles.ts`, com busca instantânea, preparação estimada e reprodução de áudio do motor.
- Comparador visual de restomod e atalho de atendimento pelo WhatsApp.
- Telemetria por scroll, configurador de pintura e gráfico de dinamômetro carregado sob demanda.
- Assistente virtual flutuante e seção de padrões de engenharia, garantia e diagnóstico OEM.

## Supabase ready

Copie os valores do seu projeto para `.env.local` — um arquivo local de exemplo já foi criado e não é versionado. Somente URL e chave pública/publishable devem ser expostas ao Vite; nunca inclua uma `service_role` no cliente.

```bash
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_sua_chave_publica
```

Ao conectar uma tabela de solicitações, habilite RLS e exponha explicitamente a tabela ao Data API, conforme a política do seu projeto.

Para o Tunador, crie uma tabela `tuner_projects` com `user_id uuid`, `project_data jsonb` e `created_at timestamptz`. A integração só lê/grava quando há usuário autenticado e usa `user_id` como escopo; sem autenticação, ela usa `localStorage`. Configure RLS para permitir acesso somente quando `auth.uid() = user_id` e conceda explicitamente o acesso necessário à Data API.

## Desenvolvimento local

Pré-requisito: Node.js 22 ou superior.

```bash
npm install
npm run dev
```

Abra a URL indicada pelo Vite (normalmente `http://localhost:5173`). Para validar a tipagem e gerar a versão de produção:

```bash
npm run lint
npm run build
npm run preview
```

O build final é produzido em `dist/`.

## Publicação no GitHub

Crie um repositório vazio no GitHub e execute, na raiz deste projeto:

```bash
git init
git add .
git commit -m "feat: turbo motors react experience"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/turbo-motors.git
git push -u origin main
```

## Deploy na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório do GitHub.
2. Confirme o framework **Vite**; o arquivo `vercel.json` já define `npm run build` e a saída `dist`.
3. Clique em **Deploy**. Os próximos `git push` na branch conectada criam novos deploys automaticamente.

Alternativamente, via CLI:

```bash
npm i -g vercel
vercel
```

> Antes da publicação, substitua o número demonstrativo `5511999999999` em `src/components/WhatsAppButton.tsx` pelo número oficial de atendimento, no formato internacional sem `+` ou espaços.

## Estrutura

```text
src/
  components/       # componentes de interface e recursos interativos
  lib/              # hooks e integrações preparadas
  data/vehicles.ts  # catálogo local de veículos e especificações
  App.tsx           # composição e estado global de acessibilidade
  main.tsx          # ponto de entrada React
  index.css         # Tailwind e utilitários visuais
```
