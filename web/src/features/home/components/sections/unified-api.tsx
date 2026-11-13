/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const CHAT_SNIPPET = `from openai import OpenAI

client = OpenAI(
    base_url="https://api.zkp.ai/v1",
    api_key="zkp-sk-...",
)

stream = client.chat.completions.create(
    model="claude-sonnet-4-5",
    messages=[{"role": "user", "content": "hi"}],
    stream=True,
)`

const MESSAGES_SNIPPET = `import anthropic

client = anthropic.Anthropic(
    base_url="https://api.zkp.ai",
    api_key="zkp-sk-...",
)

message = client.messages.create(
    model="gpt-5.1",
    max_tokens=1024,
    messages=[...],
)`

const RESPONSES_SNIPPET = `curl https://api.zkp.ai/v1/responses \\
  -H "Authorization: Bearer zkp-sk-..." \\
  -d '{
    "model": "gemini-3-pro",
    "input": "Draft a launch post"
  }'`

const EMBEDDINGS_SNIPPET = `from openai import OpenAI

client = OpenAI(
    base_url="https://api.zkp.ai/v1",
    api_key="zkp-sk-...",
)

embeddings = client.embeddings.create(
    model="text-embedding-3-large",
    input="Agent hosting, simplified",
)`

interface ApiTab {
  value: string
  labelKey: string
  snippet: string
}

const API_TABS: readonly ApiTab[] = [
  { value: 'chat', labelKey: 'Chat Completions', snippet: CHAT_SNIPPET },
  { value: 'messages', labelKey: 'Messages API', snippet: MESSAGES_SNIPPET },
  {
    value: 'responses',
    labelKey: 'Responses API',
    snippet: RESPONSES_SNIPPET,
  },
  { value: 'embeddings', labelKey: 'Embeddings', snippet: EMBEDDINGS_SNIPPET },
]

function CodePanel(props: { tab: ApiTab }) {
  const { t } = useTranslation()
  return (
    <TabsContent value={props.tab.value}>
      <pre className='border-border/40 bg-muted/30 overflow-x-auto rounded-lg border p-4 font-mono text-xs leading-relaxed'>
        <code>{props.tab.snippet}</code>
      </pre>
      <p className='text-muted-foreground/70 mt-2 text-right font-mono text-[10px]'>
        200 OK · {t('Streaming response')}
      </p>
    </TabsContent>
  )
}

export function UnifiedApi() {
  const { t } = useTranslation()

  return (
    <section className='border-border/40 relative z-10 border-t px-6 py-24 md:py-32'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-16 max-w-lg'>
          <p className='text-muted-foreground mb-3 text-xs font-medium tracking-widest uppercase'>
            {t('API Aggregation')}
          </p>
          <h2 className='text-2xl leading-tight font-bold tracking-tight md:text-3xl'>
            {t('One API. Every model.')}
          </h2>
          <p className='text-muted-foreground/80 mt-4 text-sm leading-relaxed md:text-[15px]'>
            {t(
              'Point your existing OpenAI SDK at ZKP and reach every provider — chat, tools, vision and embeddings, with streaming that just works.'
            )}
          </p>
        </AnimateInView>

        <AnimateInView animation='scale-in' className='mx-auto max-w-3xl'>
          <Tabs defaultValue='chat'>
            <TabsList className='flex-wrap'>
              {API_TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {t(tab.labelKey)}
                </TabsTrigger>
              ))}
            </TabsList>
            {API_TABS.map((tab) => (
              <CodePanel key={tab.value} tab={tab} />
            ))}
          </Tabs>
        </AnimateInView>
      </div>
    </section>
  )
}
