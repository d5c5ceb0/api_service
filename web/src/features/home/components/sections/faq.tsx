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
      value: 'providers',
      question: t('Which model providers does ZKP support?'),
      answer: t(
        'ZKP aggregates 40+ providers, including OpenAI, Anthropic, Google, DeepSeek, Qwen, Mistral and more, all reachable with a single API key.'
      ),
    },
    {
      value: 'openai-compat',
      question: t('Is the ZKP API compatible with OpenAI SDKs?'),
      answer: t(
        'Yes. Point any OpenAI-compatible SDK or framework at the ZKP base URL with your API key — no other code changes required.'
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
        'Your prompts and results are never used for training. Request logs can be disabled at any time, and data is encrypted in transit and at rest.'
      ),
    },
    {
      value: 'free-plan',
      question: t('What does the Free plan include?'),
      answer: t(
        'One million tokens per month, the community model catalog and basic usage analytics — no credit card required.'
      ),
    },
    {
      value: 'self-host',
      question: t('Can I self-host ZKP?'),
      answer: t(
        'A self-hosted deployment option is available on the Scale plan for teams with strict compliance or data residency requirements.'
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
