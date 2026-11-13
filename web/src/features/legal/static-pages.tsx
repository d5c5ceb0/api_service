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
/**
 * Built-in legal pages for the ZKP site: /terms, /privacy and /aup.
 *
 * Creem compliance requirements:
 * - Legal text stays Chinese regardless of the UI language; keys are the
 *   Chinese literals themselves (identity translation in en.json).
 * - The {{LEGAL_ENTITY}}, {{GOVERNING_LAW}} and {{REFUND_POLICY}}
 *   placeholders are intentional and must stay visible — the owner fills
 *   them in. Never invent a legal entity, jurisdiction or refund rule.
 */
import { useTranslation } from 'react-i18next'

import { PublicLayout } from '@/components/layout'

interface LegalSection {
  headingKey: string
  paragraphs: readonly string[]
}

interface StaticLegalPageProps {
  titleKey: string
  sections: readonly LegalSection[]
}

function StaticLegalPage(props: StaticLegalPageProps) {
  const { t } = useTranslation()

  return (
    <PublicLayout>
      <div className='mx-auto max-w-3xl space-y-8 py-12'>
        <h1 className='text-3xl font-semibold tracking-tight'>
          {t(props.titleKey)}
        </h1>
        {props.sections.map((section) => (
          <section key={section.headingKey}>
            <h2 className='text-muted-foreground mb-3 text-lg font-semibold'>
              {t(section.headingKey)}
            </h2>
            <div className='space-y-3'>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className='text-muted-foreground text-sm leading-relaxed'
                >
                  {t(paragraph)}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PublicLayout>
  )
}

const TERMS_SECTIONS: readonly LegalSection[] = [
  {
    headingKey: '一、运营主体',
    paragraphs: [
      '本服务由 {{LEGAL_ENTITY}} 运营。通过注册或使用本服务，即表示你同意本用户协议。',
    ],
  },
  {
    headingKey: '二、服务内容',
    paragraphs: [
      '客户购买的是 ZKP 托管 Agent 软件的订阅服务。ZKP 负责运行、扩缩容、版本管理和调用记录。',
      '套餐内包含的平台用量是本产品的服务额度，不可提现、不可转让、不可兑换现金，也不能在 ZKP 之外使用。',
    ],
  },
  {
    headingKey: '三、客户内容与责任',
    paragraphs: [
      '客户配置的提示词、工具输入与输出归客户所有，ZKP 不会将其用于训练基础模型。',
      '客户对其配置的工具、凭据与指令负责，并应确保其用途符合可接受使用政策。',
    ],
  },
  {
    headingKey: '四、禁止用途',
    paragraphs: [
      '禁止利用本服务从事违法活动、生成 NSFW 或性暗示内容、传播恶意软件、实施欺诈，或将 ZKP 及上游模型访问转售为独立 API 产品。详见可接受使用政策。',
    ],
  },
  {
    headingKey: '五、取消订阅与退款',
    paragraphs: [
      '你可以随时在产品内的账单页面取消订阅，取消在当前计费周期结束时生效。',
      '除适用法律强制要求外，已开始的计费周期不予退款。{{REFUND_POLICY}}',
    ],
  },
  {
    headingKey: '六、适用法律与联系',
    paragraphs: [
      '本协议适用法律为 {{GOVERNING_LAW}}。',
      '如有问题，请联系 support@zkp.cloud。',
    ],
  },
]

const PRIVACY_SECTIONS: readonly LegalSection[] = [
  {
    headingKey: '一、数据控制者',
    paragraphs: ['本服务的个人数据控制者为 {{LEGAL_ENTITY}}。'],
  },
  {
    headingKey: '二、收集的数据',
    paragraphs: [
      '我们收集以下数据：账户邮箱、支付服务商提供的账单标识、Agent 配置、提示词、工具调用日志和使用指标。',
    ],
  },
  {
    headingKey: '三、数据用途',
    paragraphs: [
      '数据仅用于：提供本服务、计费、防止滥用和客户支持。',
      '你的提示词与输出不用于训练基础模型。数据在传输和静态存储中均加密。',
    ],
  },
  {
    headingKey: '四、支付数据',
    paragraphs: [
      '支付数据由商户记录方（Creem）处理，ZKP 不存储原始银行卡数据。',
    ],
  },
  {
    headingKey: '五、访问与删除',
    paragraphs: [
      '如需访问或删除你的数据，请发送邮件至 support@zkp.cloud。',
    ],
  },
]

const AUP_SECTIONS: readonly LegalSection[] = [
  {
    headingKey: '一、禁止内容',
    paragraphs: [
      '使用 ZKP 时禁止以下行为：生成 NSFW、露骨或性暗示内容；发布违法内容或实施欺诈；开发或传播恶意软件、窃取凭据或攻击其他系统。',
    ],
  },
  {
    headingKey: '二、禁止滥用他人形象',
    paragraphs: ['禁止制作换脸、深伪或未经同意的亲密影像内容。'],
  },
  {
    headingKey: '三、禁止转售',
    paragraphs: [
      '禁止将上游模型访问或 ZKP 服务转售为独立 API 产品，禁止共享第三方 AI 账户。',
    ],
  },
  {
    headingKey: '四、执行',
    paragraphs: [
      '违反本政策的账户可能被暂停或终止。如对某个使用场景有疑问，请联系 support@zkp.cloud。',
    ],
  },
]

export function TermsPage() {
  return <StaticLegalPage titleKey='用户协议' sections={TERMS_SECTIONS} />
}

export function PrivacyPage() {
  return <StaticLegalPage titleKey='隐私政策' sections={PRIVACY_SECTIONS} />
}

export function AupPage() {
  return (
    <StaticLegalPage titleKey='可接受使用政策' sections={AUP_SECTIONS} />
  )
}
