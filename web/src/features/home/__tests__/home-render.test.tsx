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
import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { Home } from '../index'

const { mockState } = vi.hoisted(() => ({
  mockState: {
    content: '',
    isLoaded: true,
    isUrl: false,
    authUser: null as unknown,
  },
}))

vi.mock('../hooks', () => ({
  useHomePageContent: () => ({
    content: mockState.content,
    isLoaded: mockState.isLoaded,
    isUrl: mockState.isUrl,
  }),
}))

vi.mock('@/hooks/use-status', () => ({
  useStatus: () => ({ status: {} }),
}))

vi.mock('@/stores/auth-store', () => ({
  useAuthStore: () => ({ auth: { user: mockState.authUser } }),
}))

// The default home branch renders inside PublicLayout alongside Footer; both
// are integration surfaces far beyond this suite's scope, so they are stubbed
// to pass children through.
vi.mock('@/components/layout', () => ({
  PublicLayout: (props: { children: ReactNode }) => <div>{props.children}</div>,
}))
vi.mock('@/components/layout/components/footer', () => ({
  Footer: () => <div data-testid='footer-stub' />,
}))

vi.mock('@tanstack/react-router', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@tanstack/react-router')>()),
  Link: (props: { to: string; children?: ReactNode }) => (
    <a href={props.to}>{props.children}</a>
  ),
}))

afterEach(() => {
  mockState.authUser = null
})

describe('Home default branch', () => {
  test('renders the ZKP marketing sections for anonymous visitors', () => {
    render(<Home />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Run AI agents on'
    )
    // Both the hero and the closing CTA offer Get Started; every instance
    // must point at the sign-up route.
    for (const link of screen.getAllByRole('link', { name: 'Get Started' })) {
      expect(link).toHaveAttribute('href', '/sign-up')
    }
    expect(screen.getByText('$99')).toBeInTheDocument()
    expect(screen.getByText('Ship your first agent today.')).toBeInTheDocument()
    expect(screen.getByTestId('footer-stub')).toBeInTheDocument()
  })

  test('suppresses the closing CTA for authenticated users', () => {
    mockState.authUser = { id: 1 }
    render(<Home />)

    expect(
      screen.getByRole('link', { name: 'Go to Dashboard' })
    ).toHaveAttribute('href', '/dashboard')
    expect(
      screen.queryByText('Ship your first agent today.')
    ).not.toBeInTheDocument()
    expect(screen.getByTestId('footer-stub')).toBeInTheDocument()
  })
})
