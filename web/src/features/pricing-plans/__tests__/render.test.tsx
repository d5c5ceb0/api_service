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

import { PricingPlans } from '../index'

// The tier CTA renders through TanStack Router's polymorphic Button render
// prop; jsdom tests only care about the resulting anchor contract.
vi.mock('@tanstack/react-router', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@tanstack/react-router')>()),
  Link: (props: { to: string; children?: ReactNode }) => (
    <a href={props.to}>{props.children}</a>
  ),
}))

vi.mock('@/components/layout', () => ({
  PublicLayout: (props: { children: ReactNode }) => (
    <div>{props.children}</div>
  ),
}))

// /pricing sells ZKP software plans only — no token quotas, no /1M units.
describe('PricingPlans page', () => {
  test('renders the three software tiers with USD monthly prices', () => {
    render(<PricingPlans />)

    expect(
      screen.getByRole('heading', { level: 2, name: /Simple pricing/ })
    ).toBeInTheDocument()
    expect(screen.getByText('$0')).toBeInTheDocument()
    expect(screen.getByText('$29')).toBeInTheDocument()
    expect(screen.getByText('$99')).toBeInTheDocument()
  })

  test('shows the affiliation disclaimer and monthly-billing note', () => {
    render(<PricingPlans />)

    expect(
      screen.getAllByText(
        'ZKP is an independent product, not affiliated with or endorsed by any model provider. Model names on this page only refer to third-party models you can connect.'
      ).length
    ).toBeGreaterThanOrEqual(1)
    expect(
      screen.getByText('Prices are in USD, billed monthly.')
    ).toBeInTheDocument()
  })

  test('points every tier CTA at the sign-up route', () => {
    render(<PricingPlans />)

    for (const name of ['Start Free', 'Choose Pro', 'Choose Scale']) {
      expect(screen.getByRole('link', { name })).toHaveAttribute(
        'href',
        '/sign-up'
      )
    }
  })

  test('does not render token-quota style marketing', () => {
    render(<PricingPlans />)

    expect(screen.queryByText(/1M tokens per month/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Most popular/)).not.toBeInTheDocument()
  })
})
