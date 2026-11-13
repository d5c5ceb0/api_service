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

import { AupPage, PrivacyPage, TermsPage } from '../static-pages'

vi.mock('@/components/layout', () => ({
  PublicLayout: (props: { children: ReactNode }) => (
    <div>{props.children}</div>
  ),
}))

// Creem review requirement: the owner-supplied placeholders must stay visible
// verbatim on every legal page — they are never to be invented or dropped.
describe('Legal static pages', () => {
  test('renders the terms page with the legal entity and refund placeholders visible', () => {
    render(<TermsPage />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '用户协议'
    )
    expect(
      screen.getByText(/本服务由 \{\{LEGAL_ENTITY\}\} 运营/)
    ).toBeInTheDocument()
    expect(screen.getByText(/已开始的计费周期不予退款/)).toBeInTheDocument()
    expect(screen.getByText(/\{\{REFUND_POLICY\}\}/)).toBeInTheDocument()
    expect(screen.getByText(/\{\{GOVERNING_LAW\}\}/)).toBeInTheDocument()
    expect(screen.getByText(/转售为独立 API 产品/)).toBeInTheDocument()
  })

  test('renders the privacy page with the collected data inventory', () => {
    render(<PrivacyPage />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '隐私政策'
    )
    expect(screen.getByText(/\{\{LEGAL_ENTITY\}\}/)).toBeInTheDocument()
    expect(screen.getByText(/Creem/)).toBeInTheDocument()
  })

  test('renders the acceptable use policy with the resale prohibition', () => {
    render(<AupPage />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '可接受使用政策'
    )
    expect(
      screen.getByText(/禁止将上游模型访问或 ZKP 服务转售为独立 API 产品/)
    ).toBeInTheDocument()
  })
})
