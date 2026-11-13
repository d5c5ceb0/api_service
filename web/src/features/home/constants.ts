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
 * Home page constants
 * Hardcoded data for the ZKP home page sections.
 * User-facing strings are English-literal i18n keys; components render them
 * through t(). Keys passed dynamically (outside t('...') calls) are
 * registered in src/i18n/static-keys.ts and mirrored in i18n-keys.ts.
 *
 * Creem review constraints: ZKP sells its own hosted-agent software as
 * subscriptions. Plans describe product capabilities only — no token
 * volumes, provider counts, uptime percentages or popularity badges.
 */

// Pricing section — tier data is shaped so a future checkout integration
// only needs to add a checkoutUrl / onSubscribe field, no component reshape.
type PricingTierId = 'free' | 'pro' | 'scale'

export interface PricingTier {
  id: PricingTierId
  nameKey: string
  priceMonthly: number
  currency: 'USD'
  periodKey: string
  taglineKey: string
  featureKeys: readonly string[]
  ctaKey: string
  ctaTo: '/sign-up'
}

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    id: 'free',
    nameKey: 'Free',
    priceMonthly: 0,
    currency: 'USD',
    periodKey: 'per month',
    taglineKey: 'For trying out the platform',
    featureKeys: [
      'One workspace with a single agent',
      'Run your agent and view run history',
      'Connect your own model keys',
      'Community support',
    ],
    ctaKey: 'Start Free',
    ctaTo: '/sign-up',
  },
  {
    id: 'pro',
    nameKey: 'Pro',
    priceMonthly: 29,
    currency: 'USD',
    periodKey: 'per month',
    taglineKey: 'For growing agent workloads',
    featureKeys: [
      'More agents per workspace',
      'Autoscaling for agent runs',
      'Version rollback for every agent',
      'Full traces and cost dashboard',
      'Email support',
    ],
    ctaKey: 'Choose Pro',
    ctaTo: '/sign-up',
  },
  {
    id: 'scale',
    nameKey: 'Scale',
    priceMonthly: 99,
    currency: 'USD',
    periodKey: 'per month',
    taglineKey: 'For teams running agents in production',
    featureKeys: [
      'Single sign-on (SSO)',
      'Audit log',
      'Role-based access control',
      'Higher concurrency',
      'Dedicated support',
    ],
    ctaKey: 'Choose Scale',
    ctaTo: '/sign-up',
  },
]
