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

import { cn } from '@/lib/utils'

interface TraceStep {
  // Mono protocol identifiers — intentionally untranslated
  label: string
  detailKey: string
  delay: number
}

const TRACE_STEPS: readonly TraceStep[] = [
  { label: 'plan', detailKey: 'Analyze ticket intent', delay: 200 },
  {
    label: 'tool: search_docs',
    detailKey: 'Search refund policy docs',
    delay: 400,
  },
  {
    label: 'tool: create_ticket',
    detailKey: 'Create follow-up ticket',
    delay: 600,
  },
  { label: 'respond', detailKey: 'Send resolution to customer', delay: 800 },
]

function TraceRow(props: { step: TraceStep }) {
  const { t } = useTranslation()
  return (
    <div
      className='landing-animate-fade-up flex items-center gap-3 opacity-0'
      style={{ animationDelay: `${props.step.delay}ms` }}
    >
      <span className='text-foreground/70 shrink-0 font-mono text-[11px]'>
        {props.step.label}
      </span>
      <span className='bg-border/50 h-px w-6 shrink-0' />
      <span className='text-muted-foreground truncate text-xs'>
        {t(props.step.detailKey)}
      </span>
      <span className='ml-auto flex items-center gap-1.5'>
        <span className='size-1.5 rounded-full bg-emerald-500' />
        <span className='text-muted-foreground/60 font-mono text-[10px]'>
          ok
        </span>
      </span>
    </div>
  )
}

interface AgentConsoleDemoProps {
  className?: string
}

export function AgentConsoleDemo(props: AgentConsoleDemoProps) {
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        'border-border/50 bg-muted/30 w-full max-w-lg overflow-hidden rounded-xl border shadow-lg backdrop-blur-xs',
        props.className
      )}
    >
      {/* Terminal chrome */}
      <div className='border-border/50 flex items-center gap-2 border-b px-4 py-2.5'>
        <span className='flex gap-1.5'>
          <span className='size-2.5 rounded-full bg-red-400/70' />
          <span className='size-2.5 rounded-full bg-amber-400/70' />
          <span className='size-2.5 rounded-full bg-emerald-400/70' />
        </span>
        <span className='text-muted-foreground ml-2 font-mono text-[11px]'>
          agent: support-bot
        </span>
        <span className='ml-auto flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400'>
          <span className='relative flex size-1.5'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
            <span className='relative inline-flex size-1.5 rounded-full bg-emerald-500' />
          </span>
          {t('running')}
        </span>
      </div>

      {/* Agent trace */}
      <div className='space-y-3 px-4 py-4'>
        {TRACE_STEPS.map((step) => (
          <TraceRow key={step.label} step={step} />
        ))}
      </div>

      {/* Footer stats */}
      <div className='border-border/50 text-muted-foreground flex items-center gap-4 border-t px-4 py-2.5 font-mono text-[11px] tabular-nums'>
        <span>1,204 {t('tokens')}</span>
        <span>2 {t('tool calls')}</span>
        <span className='ml-auto'>1.8s {t('elapsed')}</span>
      </div>
    </div>
  )
}
