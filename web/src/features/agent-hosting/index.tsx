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
  BrainCircuit,
  DatabaseZap,
  FileCode2,
  GitBranch,
  Headset,
  MessageSquareDot,
  Radar,
  RotateCcw,
  ScanSearch,
  TicketCheck,
  Workflow,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'
import { PublicLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

interface WorkflowStep {
  icon: typeof ScanSearch
  labelKey: string
}

interface AgentProfile {
  id: string
  icon: typeof Headset
  titleKey: string
  descKey: string
  steps: readonly WorkflowStep[]
  metricKey: string
}

const AGENT_PROFILES: readonly AgentProfile[] = [
  {
    id: 'support',
    icon: Headset,
    titleKey: 'Customer Support Agent',
    descKey:
      'Grounded in your documentation, it resolves tickets end to end and knows when to hand off to a human.',
    steps: [
      { icon: ScanSearch, labelKey: 'Retrieves answers from your docs' },
      { icon: MessageSquareDot, labelKey: 'Drafts a grounded reply' },
      { icon: TicketCheck, labelKey: 'Resolves or escalates the ticket' },
    ],
    metricKey: 'Deflection rate, CSAT and first-response time out of the box',
  },
  {
    id: 'research',
    icon: BrainCircuit,
    titleKey: 'Research Agent',
    descKey:
      'Turns open questions into structured briefs with citations you can verify.',
    steps: [
      { icon: ScanSearch, labelKey: 'Searches and reads your sources' },
      { icon: Workflow, labelKey: 'Synthesizes findings across documents' },
      { icon: FileCode2, labelKey: 'Delivers a cited brief' },
    ],
    metricKey: 'Every claim traceable to its source passage',
  },
  {
    id: 'coding',
    icon: GitBranch,
    titleKey: 'Coding Agent',
    descKey:
      'Works from your repositories: opens pull requests, fixes failing tests and answers review comments.',
    steps: [
      { icon: ScanSearch, labelKey: 'Reads the repository and issue' },
      { icon: FileCode2, labelKey: 'Writes the patch and tests' },
      { icon: GitBranch, labelKey: 'Opens the pull request' },
    ],
    metricKey: 'Sandboxed checkouts with scoped credentials per run',
  },
  {
    id: 'data',
    icon: DatabaseZap,
    titleKey: 'Data Pipeline Agent',
    descKey:
      'Watches your feeds around the clock and reacts to anomalies the moment they appear.',
    steps: [
      { icon: ScanSearch, labelKey: 'Monitors feeds and records' },
      { icon: Workflow, labelKey: 'Normalizes and validates records' },
      { icon: Radar, labelKey: 'Alerts on anomalies in real time' },
    ],
    metricKey: 'Scheduled and event-triggered runs with retries',
  },
]

const HOSTING_STEPS = [
  {
    titleKey: 'Describe your agent',
    descKey:
      'One config defines the instructions, tools, model and limits. Version it in git like any other artifact.',
  },
  {
    titleKey: 'Push to deploy',
    descKey:
      'Every push creates a new immutable version. Roll forward and back without touching a server.',
  },
  {
    titleKey: 'Run on managed infrastructure',
    descKey:
      'Autoscaling, sandboxing and secret management are handled for you. You only see traces and bills.',
  },
]

export function AgentHosting() {
  const { t } = useTranslation()

  return (
    <PublicLayout>
      <main className='relative'>
        {/* Page header */}
        <section className='relative overflow-hidden px-6 pt-24 pb-16 md:pt-32'>
          <div className='mx-auto max-w-3xl'>
            <AnimateInView>
              <p className='text-muted-foreground mb-3 text-xs font-medium tracking-widest uppercase'>
                {t('Agent Hosting')}
              </p>
              <h1 className='text-3xl leading-tight font-bold tracking-tight md:text-5xl'>
                {t('Hosted agents, from prototype to production')}
              </h1>
              <p className='text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed md:text-lg'>
                {t(
                  'Deploy purpose-built agents on managed infrastructure. Pick a blueprint, wire in your tools and data, and ship — we handle the runtime.'
                )}
              </p>
            </AnimateInView>
          </div>
        </section>

        {/* Agent blueprints */}
        <section className='px-6 pb-20'>
          <div className='mx-auto max-w-6xl space-y-10'>
            {AGENT_PROFILES.map((agent, index) => (
              <AnimateInView
                key={agent.id}
                delay={index * 80}
                animation='fade-up'
              >
                <article className='border-border/50 bg-background hover:border-border rounded-2xl border p-7 transition-colors duration-300 md:p-9'>
                  <div className='flex flex-col gap-7 md:flex-row md:items-start md:gap-10'>
                    <div className='md:max-w-sm'>
                      <div className='flex items-center gap-3'>
                        <span className='border-border/50 bg-muted/40 text-foreground flex size-11 items-center justify-center rounded-xl border'>
                          <agent.icon className='size-5' strokeWidth={1.5} />
                        </span>
                        <h2 className='text-lg font-semibold'>
                          {t(agent.titleKey)}
                        </h2>
                      </div>
                      <p className='text-muted-foreground mt-4 text-sm leading-relaxed'>
                        {t(agent.descKey)}
                      </p>
                    </div>
                    <div className='flex-1 space-y-3'>
                      {agent.steps.map((step, stepIndex) => (
                        <div
                          key={step.labelKey}
                          className='border-border/40 bg-muted/20 flex items-center gap-3 rounded-lg border px-4 py-3'
                        >
                          <step.icon
                            className='text-muted-foreground size-4 shrink-0'
                            strokeWidth={1.5}
                          />
                          <span className='text-sm'>{t(step.labelKey)}</span>
                          <span className='text-muted-foreground/60 ml-auto font-mono text-[10px]'>
                            {String(stepIndex + 1).padStart(2, '0')}
                          </span>
                        </div>
                      ))}
                      <p className='text-muted-foreground/70 flex items-center gap-2 pt-1 text-xs'>
                        <RotateCcw className='size-3.5' strokeWidth={1.5} />
                        {t(agent.metricKey)}
                      </p>
                    </div>
                  </div>
                </article>
              </AnimateInView>
            ))}
          </div>
        </section>

        {/* How hosting works */}
        <section className='border-border/40 border-t px-6 py-20'>
          <div className='mx-auto max-w-6xl'>
            <AnimateInView className='mb-14 max-w-lg'>
              <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>
                {t('How hosting works')}
              </h2>
            </AnimateInView>
            <div className='grid gap-10 md:grid-cols-3'>
              {HOSTING_STEPS.map((step, index) => (
                <AnimateInView
                  key={step.titleKey}
                  delay={index * 100}
                  animation='fade-up'
                >
                  <div className='text-muted-foreground/40 mb-4 font-mono text-sm'>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className='mb-3 text-base font-semibold'>
                    {t(step.titleKey)}
                  </h3>
                  <p className='text-muted-foreground text-sm leading-relaxed'>
                    {t(step.descKey)}
                  </p>
                </AnimateInView>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className='px-6 pb-24'>
          <div className='mx-auto max-w-3xl rounded-2xl border p-10 text-center'>
            <h2 className='text-xl font-semibold tracking-tight md:text-2xl'>
              {t('Read the docs and deploy your first agent')}
            </h2>
            <p className='text-muted-foreground mt-3 text-sm'>
              {t(
                'The documentation walks through agent configuration and the API end to end.'
              )}
            </p>
            <Button className='mt-7' render={<Link to='/docs' />}>
              {t('View Docs')}
            </Button>
          </div>
        </section>
      </main>
    </PublicLayout>
  )
}
