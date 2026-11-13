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

// Owner decision (option B, following other indie Creem merchants): no
// legal-entity or governing-law clauses on public pages, and a concrete
// refund rule. The pages must therefore never show template placeholders.
describe('Legal static pages', () => {
  test('renders the terms page with the concrete refund rule and no placeholders', () => {
    render(<TermsPage />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '用户协议'
    )
    expect(
      screen.getByText(
        '订阅可随时取消；取消后，当前计费周期的剩余时间不予退款。除适用法律强制要求外，已开始的计费周期均不予退款。'
      )
    ).toBeInTheDocument()
    expect(screen.getByText(/转售为独立 API 产品/)).toBeInTheDocument()
    expect(
      screen.getByText('如有问题，请联系 support@zkp.cloud。')
    ).toBeInTheDocument()
    expect(
      screen.queryByText(/\{\{(LEGAL_ENTITY|GOVERNING_LAW|REFUND_POLICY)\}\}/)
    ).not.toBeInTheDocument()
  })

  test('renders the privacy page with the collected data inventory', () => {
    render(<PrivacyPage />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '隐私政策'
    )
    expect(screen.getByText(/Creem/)).toBeInTheDocument()
    expect(
      screen.queryByText(/\{\{LEGAL_ENTITY\}\}/)
    ).not.toBeInTheDocument()
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
