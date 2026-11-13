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

  test('renders the three tiers without any popularity badge', () => {
    render(<Pricing />)

    // Creem compliance: no "most popular" style badges on plan cards.
    expect(screen.queryByText('Most popular')).not.toBeInTheDocument()
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

    expect(
      screen.getByText('One workspace with a single agent')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Autoscaling for agent runs')
    ).toBeInTheDocument()
    expect(screen.getByText('Single sign-on (SSO)')).toBeInTheDocument()
    expect(
      screen.getByText('Prices are in USD, billed monthly.')
    ).toBeInTheDocument()
  })
})
