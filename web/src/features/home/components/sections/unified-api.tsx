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

// Creem compliance: a single agent-run example. No raw chat/messages/
// embeddings router snippets and no third-party model ids here — ZKP sells
// hosted agents, not upstream model access.
const AGENT_SNIPPET = `# Create an agent from one config
curl https://api.zkp.ai/v1/agents \\
  -H "Authorization: Bearer zkp-sk-..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "support-agent",
    "instructions": "Answer customer questions using the linked knowledge base.",
    "tools": [
      {"type": "http", "name": "create_ticket", "url": "https://api.example.com/tickets"}
    ],
    "model": "your-connected-model"
  }'

# Run it — every run is traced
curl https://api.zkp.ai/v1/agents/support-agent/runs \\
  -H "Authorization: Bearer zkp-sk-..." \\
  -d '{"input": "Where is my order #1234?"}'`

export function UnifiedApi() {
  const { t } = useTranslation()

  return (
    <section className='border-border/40 relative z-10 border-t px-6 py-24 md:py-32'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-16 max-w-lg'>
          <p className='text-muted-foreground mb-3 text-xs font-medium tracking-widest uppercase'>
            {t('Agent Runtime')}
          </p>
          <h2 className='text-2xl leading-tight font-bold tracking-tight md:text-3xl'>
            {t('One config. One command. Your agent runs.')}
          </h2>
          <p className='text-muted-foreground/80 mt-4 text-sm leading-relaxed md:text-[15px]'>
            {t(
              'Everything on ZKP is an agent: one config describes instructions, tools and the model. Create it, run it, and every run is traced end to end.'
            )}
          </p>
        </AnimateInView>

        <AnimateInView animation='scale-in' className='mx-auto max-w-3xl'>
          <pre className='border-border/40 bg-muted/30 overflow-x-auto rounded-lg border p-4 font-mono text-xs leading-relaxed'>
            <code>{AGENT_SNIPPET}</code>
          </pre>
          <p className='text-muted-foreground/70 mt-2 text-right font-mono text-[10px]'>
            {t('Run traced')} ·{' '}
            {t('steps, tool calls and token usage recorded')}
          </p>
        </AnimateInView>
      </div>
    </section>
  )
}
