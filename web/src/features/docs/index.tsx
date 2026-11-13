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
import { PublicLayout } from '@/components/layout'

import { DOC_SECTIONS, type DocBlock, type DocSection } from './content'

function CodeBlock(props: { code: string; lang: string }) {
  return (
    <pre className='bg-muted/40 border-border/50 max-w-full overflow-x-auto rounded-lg border p-4 font-mono text-xs leading-relaxed'>
      <code>{props.code}</code>
      <span className='sr-only'>({props.lang})</span>
    </pre>
  )
}

function DocBlockView(props: { block: DocBlock }) {
  const { t } = useTranslation()
  const block = props.block
  switch (block.kind) {
    case 'p':
      return (
        <p className='text-muted-foreground text-sm leading-relaxed'>
          {t(block.key)}
        </p>
      )
    case 'code':
      return <CodeBlock code={block.code} lang={block.lang} />
    case 'list':
      return (
        <ul className='space-y-2'>
          {block.items.map((item) => (
            <li
              key={item}
              className='text-muted-foreground flex gap-2.5 text-sm leading-relaxed'
            >
              <span className='text-foreground/60 mt-1 shrink-0'>·</span>
              {t(item)}
            </li>
          ))}
        </ul>
      )
    case 'table':
      return (
        <div className='border-border/50 overflow-x-auto rounded-lg border'>
          <table className='w-full text-left text-sm'>
            <thead>
              <tr className='bg-muted/40 border-border/50 border-b'>
                {block.head.map((cell) => (
                  <th
                    key={cell}
                    className='text-foreground px-4 py-2.5 font-medium'
                  >
                    {t(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr
                  key={row[0]}
                  className='border-border/40 border-b last:border-b-0'
                >
                  {row.map((cell) => (
                    <td
                      key={cell}
                      className='text-muted-foreground px-4 py-2.5'
                    >
                      {t(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

function DocSectionView(props: { section: DocSection }) {
  const { t } = useTranslation()
  return (
    <section
      id={props.section.id}
      className='border-border/30 pb-10 last:border-b-0'
    >
      <h2 className='mb-5 text-xl font-semibold tracking-tight'>
        {t(props.section.titleKey)}
      </h2>
      <div className='space-y-4'>
        {props.section.blocks.map((block) => (
          <DocBlockView key={block.id} block={block} />
        ))}
      </div>
    </section>
  )
}

export function DocsPage() {
  const { t } = useTranslation()

  return (
    <PublicLayout>
      <main className='relative px-6 pt-24 pb-24 md:pt-32'>
        <div className='mx-auto max-w-6xl'>
          <AnimateInView className='mb-12 max-w-2xl'>
            <p className='text-muted-foreground mb-3 text-xs font-medium tracking-widest uppercase'>
              {t('Documentation')}
            </p>
            <h1 className='text-3xl leading-tight font-bold tracking-tight md:text-4xl'>
              {t('ZKP Documentation')}
            </h1>
            <p className='text-muted-foreground mt-4 text-base leading-relaxed'>
              {t('Everything you need to call the API and run hosted agents.')}
            </p>
          </AnimateInView>

          <div className='flex flex-col gap-12 lg:flex-row lg:gap-16'>
            {/* Sticky TOC sidebar */}
            <nav
              aria-label='Documentation navigation'
              className='lg:sticky lg:top-24 lg:h-fit lg:w-56 lg:shrink-0'
            >
              <ul className='space-y-1'>
                {DOC_SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className='text-muted-foreground hover:text-foreground block rounded-md px-3 py-1.5 text-sm transition-colors'
                    >
                      {t(section.titleKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Content */}
            <div className='min-w-0 flex-1 space-y-10'>
              {DOC_SECTIONS.map((section) => (
                <DocSectionView key={section.id} section={section} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </PublicLayout>
  )
}
