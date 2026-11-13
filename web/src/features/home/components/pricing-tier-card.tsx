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
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

import type { PricingTier } from '../constants'

function TierPrice(props: { tier: PricingTier }) {
  const { t } = useTranslation()
  return (
    <div className='mt-4 flex items-baseline gap-1.5'>
      <span className='text-4xl font-bold tracking-tight tabular-nums'>
        ${props.tier.priceMonthly}
      </span>
      <span className='text-muted-foreground text-sm'>
        {t(props.tier.periodKey)}
      </span>
    </div>
  )
}

function TierFeatures(props: { tier: PricingTier }) {
  const { t } = useTranslation()
  return (
    <ul className='mt-6 space-y-2.5'>
      {props.tier.featureKeys.map((featureKey) => (
        <li key={featureKey} className='flex items-start gap-2.5 text-sm'>
          <Check className='mt-0.5 size-4 shrink-0 text-emerald-500' />
          <span className='text-muted-foreground'>{t(featureKey)}</span>
        </li>
      ))}
    </ul>
  )
}

interface PricingTierCardProps {
  tier: PricingTier
  className?: string
}

export function PricingTierCard(props: PricingTierCardProps) {
  const { t } = useTranslation()
  const tier = props.tier

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border p-6 transition-colors md:p-8',
        tier.highlighted
          ? 'border-primary/60 bg-primary/[0.03] shadow-primary/5 shadow-lg'
          : 'border-border/40 bg-background hover:bg-muted/20',
        props.className
      )}
    >
      <div className='flex items-center gap-2'>
        <h3 className='text-sm font-semibold tracking-wide uppercase'>
          {t(tier.nameKey)}
        </h3>
        {tier.highlighted && (
          <Badge className='rounded-full px-2.5 text-[11px]'>
            {t('Most popular')}
          </Badge>
        )}
      </div>

      <TierPrice tier={tier} />
      <p className='text-muted-foreground mt-2 text-sm'>{t(tier.taglineKey)}</p>

      <Separator className='my-6' />
      <TierFeatures tier={tier} />

      <div className='flex-1' />
      <Button
        className='group mt-8 w-full rounded-lg'
        variant={tier.highlighted ? 'default' : 'outline'}
        render={<Link to={tier.ctaTo} />}
      >
        {t(tier.ctaKey)}
      </Button>
    </div>
  )
}
