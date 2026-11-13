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
import { describe, expect, test, vi } from 'vitest'

import { Pricing } from '../components/sections/pricing'

// The pricing CTA renders through TanStack Router's polymorphic Button render
// prop; jsdom tests only care about the resulting anchor contract.
vi.mock('@tanstack/react-router', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@tanstack/react-router')>()),
  Link: (props: { to: string; children?: ReactNode }) => (
    <a href={props.to}>{props.children}</a>
  ),
}))

describe('Pricing section', () => {
  test('renders the three tiers with USD monthly prices', () => {
    render(<Pricing />)

    expect(
      screen.getByRole('heading', { level: 3, name: 'Free' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Pro' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Scale' })
    ).toBeInTheDocument()
    expect(screen.getByText('$0')).toBeInTheDocument()
    expect(screen.getByText('$29')).toBeInTheDocument()
    expect(screen.getByText('$99')).toBeInTheDocument()
  })

  test('marks exactly one tier as most popular', () => {
    render(<Pricing />)

    expect(screen.getAllByText('Most popular')).toHaveLength(1)
  })

  test('points every tier CTA at the sign-up route', () => {
    render(<Pricing />)

    for (const name of ['Start Free', 'Choose Pro', 'Choose Scale']) {
      expect(screen.getByRole('link', { name })).toHaveAttribute(
        'href',
        '/sign-up'
      )
    }
  })

  test('lists plan features inside each tier card', () => {
    render(<Pricing />)

    expect(screen.getByText('1M tokens per month')).toBeInTheDocument()
    expect(screen.getByText('50M tokens per month')).toBeInTheDocument()
    expect(
      screen.getByText('SSO, audit logs and role-based access')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'All plans include the full provider catalog. Prices are in USD, billed monthly.'
      )
    ).toBeInTheDocument()
  })
})
