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

import { ProviderMarquee } from '../provider-marquee'

interface ProviderShowcaseProps {
  className?: string
}

export function ProviderShowcase(_props: ProviderShowcaseProps) {
  const { t } = useTranslation()

  return (
    <section className='border-border/40 relative z-10 border-y px-6 py-14 md:py-16'>
      <AnimateInView className='mx-auto mb-10 max-w-6xl text-center'>
        <h2 className='text-xl font-bold tracking-tight md:text-2xl'>
          {t('One endpoint. Every major model.')}
        </h2>
        <p className='text-muted-foreground mt-2 text-sm'>
          {t('ZKP routes requests across 40+ providers with a single API key.')}
        </p>
      </AnimateInView>
      <ProviderMarquee />
    </section>
  )
}
