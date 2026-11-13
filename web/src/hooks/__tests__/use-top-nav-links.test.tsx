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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cleanup, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useTopNavLinks } from '../use-top-nav-links'

function StatusWrapper({ client, children }: {
  client: QueryClient
  children: ReactNode
}) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

function renderLinksWithStatus(status: Record<string, unknown>) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  client.setQueryData(['status'], status)
  return renderHook(() => useTopNavLinks(), {
    wrapper: ({ children }) => (
      <StatusWrapper client={client}>{children}</StatusWrapper>
    ),
  }).result.current
}

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('useTopNavLinks', () => {
  it('hides console, docs and about when the backend configures none of them', () => {
    const links = renderLinksWithStatus({})

    expect(links.map((link) => link.href)).toEqual([
      '/',
      '/pricing',
      '/rankings',
    ])
  })

  it('shows console, docs and about only when the backend enables them', () => {
    const links = renderLinksWithStatus({
      HeaderNavModules: JSON.stringify({
        console: true,
        docs: true,
        about: true,
      }),
    })

    expect(links.map((link) => link.href)).toEqual([
      '/',
      '/dashboard',
      '/pricing',
      '/rankings',
      '/docs',
      '/about',
    ])
  })

  it('uses the backend docs_link as an external docs entry when docs is enabled', () => {
    const links = renderLinksWithStatus({
      docs_link: 'https://docs.example.com',
      HeaderNavModules: JSON.stringify({ docs: true }),
    })

    const docsLink = links.find((link) => link.href === 'https://docs.example.com')
    expect(docsLink).toMatchObject({ title: 'Docs', external: true })
  })
})
