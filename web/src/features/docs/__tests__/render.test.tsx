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

import { DocsPage } from '../index'

vi.mock('@/components/layout', () => ({
  PublicLayout: (props: { children: ReactNode }) => (
    <div>{props.children}</div>
  ),
}))

describe('DocsPage', () => {
  test('renders all documentation sections with the TOC navigation', () => {
    render(<DocsPage />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'ZKP Documentation'
    )
    const toc = screen.getByRole('navigation', {
      name: 'Documentation navigation',
    })
    expect(toc.querySelectorAll('a').length).toBeGreaterThanOrEqual(8)

    for (const title of [
      'Introduction',
      'Quick Start',
      'Agent Configuration',
      'API Keys',
      'Running Agents',
      'Traces and Run History',
      'Plans and Billing',
      'Support',
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { name: title }).closest('section')
      ).toHaveAttribute('id')
    }
  })

  test('shows the agent run example and the support contact, without raw-API resale sections', () => {
    render(<DocsPage />)

    expect(
      screen.getByText(/api\.zkp\.ai\/v1\/agents\/support-agent\/runs/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Questions, incidents or data deletion requests: email support@zkp.cloud.'
      )
    ).toBeInTheDocument()
    // Creem compliance: the docs must not market raw-API endpoints.
    expect(screen.queryByText(/v1\/chat\/completions/)).not.toBeInTheDocument()
    expect(screen.queryByText('Embeddings API')).not.toBeInTheDocument()
  })
})
