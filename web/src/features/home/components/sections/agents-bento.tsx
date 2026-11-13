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
import {
  Activity,
  Code2,
  DatabaseZap,
  FlaskConical,
  Headset,
  History,
  Radar,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'

const AGENT_ICON_CLASS = 'size-5'

function AgentIcon(props: { id: string }) {
  switch (props.id) {
    case 'support':
      return <Headset className={AGENT_ICON_CLASS} strokeWidth={1.5} />
    case 'research':
      return <FlaskConical className={AGENT_ICON_CLASS} strokeWidth={1.5} />
    case 'coding':
      return <Code2 className={AGENT_ICON_CLASS} strokeWidth={1.5} />
    case 'data':
      return <DatabaseZap className={AGENT_ICON_CLASS} strokeWidth={1.5} />
    default:
      return <Radar className={AGENT_ICON_CLASS} strokeWidth={1.5} />
  }
}

interface AgentType {
  id: string
  titleKey: string
  descKey: string
  span: string
  tags: readonly string[]
}

const AGENT_TYPES: readonly AgentType[] = [
  {
    id: 'support',
    titleKey: 'Customer Support Agent',
    descKey:
      'Answers tickets with your docs, escalates edge cases and logs every resolution.',
    span: 'md:col-span-2',
    tags: ['docs', 'tickets', 'escalate'],
  },
  {
    id: 'research',
    titleKey: 'Research Agent',
    descKey:
      'Searches sources, synthesizes findings and cites everything it used.',
    span: 'md:col-span-1',
    tags: ['search', 'cite'],
  },
  {
    id: 'coding',
    titleKey: 'Coding Agent',
    descKey:
      'Reads your repos, opens pull requests and responds to review feedback.',
    span: 'md:col-span-1',
    tags: ['repos', 'reviews'],
  },
  {
    id: 'data',
    titleKey: 'Data Pipeline Agent',
    descKey:
      'Monitors feeds, normalizes records and reports anomalies as they happen.',
    span: 'md:col-span-2',
    tags: ['feeds', 'alerts'],
  },
  {
    id: 'ops',
    titleKey: 'Ops & Alerting Agent',
    descKey:
      'Watches metrics, correlates incidents and pages the right on-call engineer.',
    span: 'md:col-span-3',
    tags: ['metrics', 'on-call'],
  },
]

const CAPABILITIES = [
  {
    icon: TrendingUp,
    titleKey: 'Autoscaling',
    descKey: 'From zero to thousands of concurrent runs without configuration.',
  },
  {
    icon: History,
    titleKey: 'Versioning',
    descKey: 'Roll back any agent to a known-good version in one click.',
  },
  {
    icon: Activity,
    titleKey: 'Observability',
    descKey: 'Every step, tool call and token is traced out of the box.',
  },
  {
    icon: ShieldCheck,
    titleKey: 'Sandboxing',
    descKey:
      'Tool execution runs in isolated sandboxes with scoped credentials.',
  },
]

export function AgentsBento() {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 px-6 py-24 md:py-32'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-16 max-w-lg'>
          <p className='text-muted-foreground mb-3 text-xs font-medium tracking-widest uppercase'>
            {t('Agent Hosting')}
          </p>
          <h2 className='text-2xl leading-tight font-bold tracking-tight md:text-3xl'>
            {t(
              'From prototype to production, agents run on managed infrastructure'
            )}
          </h2>
        </AnimateInView>

        {/* Bento grid */}
        <div className='border-border/40 bg-border/40 grid gap-px overflow-hidden rounded-xl border md:grid-cols-3'>
          {AGENT_TYPES.map((agent, i) => (
            <AnimateInView
              key={agent.id}
              delay={i * 100}
              animation='scale-in'
              className={`bg-background group hover:bg-muted/20 p-7 transition-colors duration-300 md:p-8 ${agent.span}`}
            >
              <div className='mb-3 flex items-center gap-3'>
                <span className='border-border/40 bg-muted text-muted-foreground flex size-9 items-center justify-center rounded-md border'>
                  <AgentIcon id={agent.id} />
                </span>
                <h3 className='text-sm font-semibold'>{t(agent.titleKey)}</h3>
              </div>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                {t(agent.descKey)}
              </p>
              <div className='mt-4 flex flex-wrap gap-1.5'>
                {agent.tags.map((tag) => (
                  <span
                    key={tag}
                    className='border-border/30 bg-muted/20 text-muted-foreground/70 rounded-full border px-2.5 py-0.5 font-mono text-[10px]'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </AnimateInView>
          ))}
        </div>

        {/* Platform capabilities row */}
        <div className='mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12'>
          {CAPABILITIES.map((capability, i) => (
            <AnimateInView
              key={capability.titleKey}
              delay={i * 100}
              animation='fade-up'
              className='flex flex-col items-center text-center'
            >
              <div className='text-muted-foreground border-border/50 bg-muted/30 mb-3 flex size-12 items-center justify-center rounded-xl border transition-colors'>
                <capability.icon className='size-5' strokeWidth={1.5} />
              </div>
              <h3 className='mb-1.5 text-sm font-semibold'>
                {t(capability.titleKey)}
              </h3>
              <p className='text-muted-foreground max-w-[200px] text-xs leading-relaxed'>
                {t(capability.descKey)}
              </p>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
