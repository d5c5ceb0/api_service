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
 */
export const HOME_I18N_KEYS = [
  // Hero
  'Agent hosting and API aggregation, one platform',
  'Run AI agents on',
  'every major model provider',
  'Deploy your agents once, then route every call across 40+ providers through a single OpenAI-compatible endpoint. ZKP handles scaling, billing and observability.',
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
  // Provider showcase
  'One endpoint. Every major model.',
  'ZKP routes requests across 40+ providers with a single API key.',
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
  // Unified API
  'API Aggregation',
  'One API. Every model.',
  'Point your existing OpenAI SDK at ZKP and reach every provider — chat, tools, vision and embeddings, with streaming that just works.',
  'Chat Completions',
  'Messages API',
  'Responses API',
  'Embeddings',
  'Streaming response',
  // How it works
  'Three steps to your first production agent',
  'Connect providers',
  'Bring your own keys or use managed credits for OpenAI, Anthropic, Google and more.',
  'Deploy your agent',
  'Define instructions, tools and models in one config. Push to deploy — no servers to manage.',
  'Scale and observe',
  'Autoscaling handles traffic spikes while traces, logs and cost dashboards keep you in control.',
  // Pricing
  'Simple pricing that scales with your agents',
  'Start free. Upgrade when your workload grows.',
  'per month',
  'Most popular',
  'For exploring the platform',
  'For growing agent workloads',
  'For teams running agents in production',
  '1M tokens per month',
  'Community model catalog',
  'OpenAI-compatible API',
  'Basic usage analytics',
  'Community support',
  '50M tokens per month',
  'All 40+ model providers',
  'Agent autoscaling & versioning',
  'Full traces, logs and cost analytics',
  'Priority email support',
  'Custom token volume with volume pricing',
  'Dedicated infrastructure options',
  'SLA-backed uptime guarantee',
  'SSO, audit logs and role-based access',
  'Dedicated support engineer',
  'Start Free',
  'Choose Pro',
  'Choose Scale',
  'All plans include the full provider catalog. Prices are in USD, billed monthly.',
  // Stats
  'model providers',
  'uptime target',
  'median gateway overhead',
  'tokens routed monthly',
  // FAQ
  'Frequently Asked Questions',
  'Which model providers does ZKP support?',
  'ZKP aggregates 40+ providers, including OpenAI, Anthropic, Google, DeepSeek, Qwen, Mistral and more, all reachable with a single API key.',
  'Is the ZKP API compatible with OpenAI SDKs?',
  'Yes. Point any OpenAI-compatible SDK or framework at the ZKP base URL with your API key — no other code changes required.',
  'How are my agents hosted?',
  'Agents run on managed infrastructure with autoscaling, versioned deployments and sandboxed tool execution. You ship the agent definition; ZKP operates the rest.',
  'What happens to my data?',
  'Your prompts and results are never used for training. Request logs can be disabled at any time, and data is encrypted in transit and at rest.',
  'What does the Free plan include?',
  'One million tokens per month, the community model catalog and basic usage analytics — no credit card required.',
  'Can I self-host ZKP?',
  'A self-hosted deployment option is available on the Scale plan for teams with strict compliance or data residency requirements.',
  // CTA
  'Ship your first agent today.',
  'Create an account, connect a provider and deploy your first agent in minutes.',
] as const
