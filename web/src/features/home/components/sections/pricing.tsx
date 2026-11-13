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

import { PRICING_TIERS } from '../../constants'
import { PricingTierCard } from '../pricing-tier-card'

export function Pricing() {
  const { t } = useTranslation()

  return (
    <section
      id='pricing'
      className='border-border/40 relative z-10 border-t px-6 py-24 md:py-32'
    >
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-16 max-w-lg'>
          <p className='text-muted-foreground mb-3 text-xs font-medium tracking-widest uppercase'>
            {t('Pricing')}
          </p>
          <h2 className='text-2xl leading-tight font-bold tracking-tight md:text-3xl'>
            {t('Simple pricing that scales with your agents')}
          </h2>
          <p className='text-muted-foreground/80 mt-4 text-sm leading-relaxed md:text-[15px]'>
            {t('Start free. Upgrade when your workload grows.')}
          </p>
        </AnimateInView>

        <div className='grid gap-6 md:grid-cols-3 md:gap-8'>
          {PRICING_TIERS.map((tier, i) => (
            <AnimateInView
              key={tier.id}
              delay={i * 100}
              animation='fade-up'
              className={
                tier.highlighted ? 'md:-translate-y-3 md:scale-[1.02]' : ''
              }
            >
              <PricingTierCard tier={tier} />
            </AnimateInView>
          ))}
        </div>

        <p className='text-muted-foreground/60 mt-10 text-center text-xs'>
          {t(
            'All plans include the full provider catalog. Prices are in USD, billed monthly.'
          )}
        </p>
      </div>
    </section>
  )
}
