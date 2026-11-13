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
import { Link } from '@tanstack/react-router'
import { ArrowRight, BookOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { ZkpLogo } from '@/assets/zkp-logo'
import { Button } from '@/components/ui/button'
import { useStatus } from '@/hooks/use-status'

import { AgentConsoleDemo } from '../agent-console-demo'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

function DocsButton(props: { docsUrl: string }) {
  const { t } = useTranslation()
  const isExternal = props.docsUrl.startsWith('http')
  return (
    <Button
      variant='outline'
      className='group border-border/50 hover:border-border hover:bg-muted/50 inline-flex h-11 items-center gap-1.5 rounded-lg px-5 text-sm font-medium'
      render={
        isExternal ? (
          <a href={props.docsUrl} target='_blank' rel='noopener noreferrer' />
        ) : (
          <Link to={props.docsUrl} />
        )
      }
    >
      <BookOpen className='text-muted-foreground/80 group-hover:text-foreground size-4 transition-colors duration-200' />
      <span>{t('Docs')}</span>
    </Button>
  )
}

function BrandPill() {
  const { t } = useTranslation()
  return (
    <div
      className='landing-animate-fade-up border-primary/20 bg-primary/5 text-primary mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-medium opacity-0 shadow-xs'
      style={{ animationDelay: '0ms' }}
    >
      <ZkpLogo className='size-4' />
      <span className='font-semibold tracking-wide'>ZKP</span>
      <span className='bg-primary/30 h-3 w-px' />
      <span>{t('Agent hosting and API aggregation, one platform')}</span>
    </div>
  )
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const { status } = useStatus()
  // Prefer a backend-configured external docs link; fall back to the built-in
  // /docs page so the button always shows.
  const docsUrl =
    (status?.docs_link as string | undefined) || '/docs'

  return (
    <section className='relative z-10 overflow-hidden px-6 pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28'>
      {/* Radial gradient background */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10 opacity-25 dark:opacity-[0.12]'
        style={{
          background: [
            'radial-gradient(ellipse 60% 50% at 20% 20%, oklch(0.72 0.18 250 / 80%) 0%, transparent 70%)',
            'radial-gradient(ellipse 50% 40% at 80% 15%, oklch(0.65 0.15 200 / 60%) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 35% at 40% 80%, oklch(0.70 0.12 280 / 40%) 0%, transparent 70%)',
          ].join(', '),
        }}
      />
      {/* Grid pattern */}
      <div
        aria-hidden
        className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black_20%,transparent_100%)] bg-[size:4rem_4rem] opacity-[0.08]'
      />

      <div className='mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10'>
        {/* Left column: brand, headline, actions */}
        <div className='flex flex-col items-start text-left lg:col-span-6'>
          <BrandPill />

          <h1
            className='landing-animate-fade-up text-[clamp(2.25rem,4.5vw,3.25rem)] leading-[1.15] font-bold tracking-tight'
            style={{ animationDelay: '60ms' }}
          >
            {t('Run AI agents on')}
            <br />
            <span className='bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500 bg-clip-text text-transparent'>
              {t('every major model provider')}
            </span>
          </h1>
          <p
            className='landing-animate-fade-up text-muted-foreground/80 mt-5 max-w-xl text-base leading-relaxed opacity-0 md:text-[15px]'
            style={{ animationDelay: '120ms' }}
          >
            {t(
              'Deploy your agents once, then route every call across 40+ providers through a single OpenAI-compatible endpoint. ZKP handles scaling, billing and observability.'
            )}
          </p>

          <div
            className='landing-animate-fade-up mt-8 flex flex-wrap items-center gap-3 opacity-0'
            style={{ animationDelay: '180ms' }}
          >
            {props.isAuthenticated ? (
              <>
                <Button
                  className='group h-11 rounded-lg px-5 text-sm font-medium'
                  render={<Link to='/dashboard' />}
                >
                  {t('Go to Dashboard')}
                  <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
                </Button>
                {docsUrl && <DocsButton docsUrl={docsUrl} />}
              </>
            ) : (
              <>
                <Button
                  className='group h-11 rounded-lg px-5 text-sm font-medium'
                  render={<Link to='/sign-up' />}
                >
                  {t('Get Started')}
                  <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
                </Button>
                <Button
                  variant='outline'
                  className='border-border/50 hover:border-border hover:bg-muted/50 h-11 rounded-lg px-5 text-sm font-medium'
                  render={<Link to='/pricing' />}
                >
                  {t('View Pricing')}
                </Button>
                {docsUrl && <DocsButton docsUrl={docsUrl} />}
              </>
            )}
          </div>
        </div>

        {/* Right column: agent trace console */}
        <div
          className='landing-animate-fade-up flex w-full justify-center opacity-0 lg:col-span-6'
          style={{ animationDelay: '320ms' }}
        >
          <AgentConsoleDemo className='mt-8 lg:mt-0' />
        </div>
      </div>
    </section>
  )
}
