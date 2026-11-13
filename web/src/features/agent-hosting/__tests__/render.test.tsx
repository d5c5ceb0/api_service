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

import { AgentHosting } from '../index'

vi.mock('@/components/layout', () => ({
  PublicLayout: (props: { children: ReactNode }) => (
    <div>{props.children}</div>
  ),
}))

vi.mock('@tanstack/react-router', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@tanstack/react-router')>()),
  Link: (props: { to: string; children?: ReactNode }) => (
    <a href={props.to}>{props.children}</a>
  ),
}))

describe('AgentHosting page', () => {
  test('renders the hero, all agent blueprints and the docs CTA', () => {
    render(<AgentHosting />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Hosted agents, from prototype to production'
    )
    for (const title of [
      'Customer Support Agent',
      'Research Agent',
      'Coding Agent',
      'Data Pipeline Agent',
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    }
    expect(screen.getByText('How hosting works')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View Docs' })).toHaveAttribute(
      'href',
      '/docs'
    )
  })
})
