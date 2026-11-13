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
 * All i18n keys introduced by the ZKP home page rewrite.
 * Serves as the contract for the i18n-coverage test; keys that are passed
 * dynamically (outside t('...') calls) must also appear in
 * src/i18n/static-keys.ts.
 *
 * Creem compliance: no token volumes, provider counts, uptime or latency
 * numbers, and no popularity badges — the site sells hosted-agent software.
 */
export const HOME_I18N_KEYS = [
  // Hero
  'Independent hosted-agent platform',
  'Deploy AI agents to',
  'production',
  'Define your instructions, tools and model in one config — ZKP runs it for you, with autoscaling, versioning and full run traces built in.',
  'ZKP is an independent product, not affiliated with or endorsed by any model provider. Model names on this page only refer to third-party models you can connect.',
  // Agent console demo
  'Support Agent',
  'running',
  'Analyze ticket intent',
  'Search refund policy docs',
  'Create follow-up ticket',
  'Send resolution to customer',
  'tokens',
  'tool calls',
  'elapsed',
  // Agent hosting bento
  'Agent Hosting',
  'From prototype to production, agents run on managed infrastructure',
  'Customer Support Agent',
  'Answers tickets with your docs, escalates edge cases and logs every resolution.',
  'Research Agent',
  'Searches sources, synthesizes findings and cites everything it used.',
  'Coding Agent',
  'Reads your repos, opens pull requests and responds to review feedback.',
  'Data Pipeline Agent',
  'Monitors feeds, normalizes records and reports anomalies as they happen.',
  'Ops & Alerting Agent',
  'Watches metrics, correlates incidents and pages the right on-call engineer.',
  'Autoscaling',
  'From zero to thousands of concurrent runs without configuration.',
  'Versioning',
  'Roll back any agent to a known-good version in one click.',
  'Observability',
  'Every step, tool call and token is traced out of the box.',
  'Sandboxing',
  'Tool execution runs in isolated sandboxes with scoped credentials.',
  // Agent runtime example
  'Agent Runtime',
  'One config. One command. Your agent runs.',
  'Everything on ZKP is an agent: one config describes instructions, tools and the model. Create it, run it, and every run is traced end to end.',
  'Run traced',
  'steps, tool calls and token usage recorded',
  // How it works
  'Three steps to your first production agent',
  'Connect models',
  'Connect your own model keys, or use the platform usage included in your plan — the models available in your console are authoritative.',
  'Deploy your agent',
  'Define instructions, tools and models in one config. Push to deploy — no servers to manage.',
  'View run records',
  'Every run is traced — steps, tool calls and token usage are recorded so you can review exactly what happened.',
  // Pricing
  'Simple pricing that scales with your agents',
  'Start free. Upgrade when your workload grows.',
  'per month',
  'For trying out the platform',
  'For growing agent workloads',
  'For teams running agents in production',
  'One workspace with a single agent',
  'Run your agent and view run history',
  'Connect your own model keys',
  'Community support',
  'More agents per workspace',
  'Autoscaling for agent runs',
  'Version rollback for every agent',
  'Full traces and cost dashboard',
  'Email support',
  'Single sign-on (SSO)',
  'Audit log',
  'Role-based access control',
  'Higher concurrency',
  'Dedicated support',
  'Start Free',
  'Choose Pro',
  'Choose Scale',
  'Prices are in USD, billed monthly.',
  // FAQ
  'Frequently Asked Questions',
  'Which models can my agents use?',
  'Connect your own model keys, or use the platform usage included in your plan — in that case ZKP selects the available models, and the list shown in your console is authoritative.',
  'How are my agents hosted?',
  'Agents run on managed infrastructure with autoscaling, versioned deployments and sandboxed tool execution. You ship the agent definition; ZKP operates the rest.',
  'What happens to my data?',
  'Your prompts and results are never used for training, and data is encrypted in transit and at rest.',
  'What does the Free plan include?',
  'One workspace with a single agent, run history, support for connecting your own model keys and community support — no credit card required.',
  'How do I cancel my subscription?',
  'You can cancel from the billing page at any time. Your plan stays active until the end of the current billing period.',
  // CTA
  'Ship your first agent today.',
  'Create an account, deploy your first agent and see your first trace in minutes.',
] as const
