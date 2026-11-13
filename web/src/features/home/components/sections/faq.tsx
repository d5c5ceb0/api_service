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
import { Accordion } from '@/components/ui/accordion'

import { FaqItem } from '../faq-item'

interface FaqEntry {
  value: string
  question: string
  answer: string
}

export function Faq() {
  const { t } = useTranslation()

  const faqs: FaqEntry[] = [
    {
      value: 'models',
      question: t('Which models can my agents use?'),
      answer: t(
        'Connect your own model keys, or use the platform usage included in your plan — in that case ZKP selects the available models, and the list shown in your console is authoritative.'
      ),
    },
    {
      value: 'hosting',
      question: t('How are my agents hosted?'),
      answer: t(
        'Agents run on managed infrastructure with autoscaling, versioned deployments and sandboxed tool execution. You ship the agent definition; ZKP operates the rest.'
      ),
    },
    {
      value: 'data',
      question: t('What happens to my data?'),
      answer: t(
        'Your prompts and results are never used for training, and data is encrypted in transit and at rest.'
      ),
    },
    {
      value: 'free-plan',
      question: t('What does the Free plan include?'),
      answer: t(
        'One workspace with a single agent, run history, support for connecting your own model keys and community support — no credit card required.'
      ),
    },
    {
      value: 'cancel',
      question: t('How do I cancel my subscription?'),
      answer: t(
        'You can cancel from the billing page at any time. Your plan stays active until the end of the current billing period.'
      ),
    },
  ]

  return (
    <section className='border-border/40 relative z-10 border-t px-6 py-24 md:py-32'>
      <div className='mx-auto max-w-3xl'>
        <AnimateInView className='mb-16 text-center'>
          <p className='text-muted-foreground mb-3 text-xs font-medium tracking-widest uppercase'>
            {t('FAQ')}
          </p>
          <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>
            {t('Frequently Asked Questions')}
          </h2>
        </AnimateInView>

        <AnimateInView animation='fade-up'>
          <Accordion>
            {faqs.map((faq) => (
              <FaqItem
                key={faq.value}
                value={faq.value}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </Accordion>
        </AnimateInView>
      </div>
    </section>
  )
}
