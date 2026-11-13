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
 * Documentation content for the /docs page.
 *
 * Creem compliance: this guide is agent-centric only — create an agent,
 * run it, read traces, manage the subscription. No raw multi-provider API
 * sections and no third-party model ids; the product is hosted-agent
 * software, not model access resale.
 *
 * All prose is expressed as i18n keys (English literals) translated at render
 * time through t(); code samples are language-neutral and rendered verbatim.
 * Table/list cell strings are translated as individual keys as well.
 */

export type DocBlock =
  | { kind: 'p'; key: string }
  | { kind: 'code'; lang: string; code: string }
  | { kind: 'list'; items: readonly string[] }
  | {
      kind: 'table'
      head: readonly string[]
      rows: readonly (readonly string[])[]
    }

/** A block with a stable render key derived from its section, not array order in JSX. */
export type DocBlockWithId = DocBlock & { id: string }

export interface DocSection {
  id: string
  titleKey: string
  blocks: readonly DocBlockWithId[]
}

const AGENT_CONFIG = `# agent.yaml — describe your agent in one file
name: support-agent
model: your-connected-model
instructions: |
  Answer customer questions using the linked knowledge base.
  Escalate billing disputes to a human.
tools:
  - type: knowledge-base
    source: https://docs.example.com
  - type: http
    name: create_ticket
    url: https://api.example.com/tickets
limits:
  max_steps: 12`

const RUN_CURL = `curl https://api.zkp.ai/v1/agents/support-agent/runs \\
  -H "Authorization: Bearer zkp-sk-xxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{"input": "Where is my order #1234?"}'`

type RawDocSection = {
  id: string
  titleKey: string
  blocks: readonly DocBlock[]
}

const RAW_DOC_SECTIONS: readonly RawDocSection[] = [
  {
    id: 'introduction',
    titleKey: 'Introduction',
    blocks: [
      {
        kind: 'p',
        key: 'ZKP is a hosted-agent platform: you describe an agent in one config — instructions, tools and a model — and ZKP runs it, scales it and records every run.',
      },
      {
        kind: 'p',
        key: 'This guide covers the full lifecycle: create an agent, run it, read its traces and manage your subscription.',
      },
    ],
  },
  {
    id: 'quickstart',
    titleKey: 'Quick Start',
    blocks: [
      {
        kind: 'list',
        items: [
          'Create an account and sign in to the console.',
          'Create a workspace — the Free plan includes one workspace with a single agent.',
          'Create your first agent from the support-bot template or from a config file.',
          'Run it once and open the trace to see each step.',
        ],
      },
      { kind: 'code', lang: 'yaml', code: AGENT_CONFIG },
    ],
  },
  {
    id: 'agent-configuration',
    titleKey: 'Agent Configuration',
    blocks: [
      {
        kind: 'p',
        key: 'Agents are described in a single config file: instructions, tools, model and limits. Version it in git and push — each push creates an immutable agent version.',
      },
      {
        kind: 'list',
        items: [
          'Deployed runs autoscale with traffic; you never manage servers.',
          'Tool execution runs in sandboxes with scoped, revocable credentials.',
          'Change the config and push to roll forward; one click rolls back to any prior version.',
        ],
      },
    ],
  },
  {
    id: 'api-keys',
    titleKey: 'API Keys',
    blocks: [
      {
        kind: 'p',
        key: 'Runs can be triggered from the console or through the API. API requests authenticate with a Bearer key in the Authorization header.',
      },
      {
        kind: 'code',
        lang: 'text',
        code: 'Authorization: Bearer zkp-sk-xxxxxxxx',
      },
      {
        kind: 'p',
        key: 'Keep keys server-side. If a key leaks, revoke it in the console and issue a new one.',
      },
    ],
  },
  {
    id: 'running-agents',
    titleKey: 'Running Agents',
    blocks: [
      {
        kind: 'p',
        key: 'Trigger a run from the console, or by calling the run endpoint of your agent.',
      },
      { kind: 'code', lang: 'bash', code: RUN_CURL },
      {
        kind: 'p',
        key: 'Every run appears in the run history of the agent.',
      },
    ],
  },
  {
    id: 'traces',
    titleKey: 'Traces and Run History',
    blocks: [
      {
        kind: 'p',
        key: 'Every run is traced end to end: steps, tool calls, token usage and the final response are recorded and visible in the console.',
      },
      {
        kind: 'list',
        items: [
          'Traces — the full step-by-step execution of every agent run.',
          'Run history — every run of every agent, per workspace.',
          'Cost — token usage aggregated by agent.',
        ],
      },
    ],
  },
  {
    id: 'plans-and-billing',
    titleKey: 'Plans and Billing',
    blocks: [
      {
        kind: 'p',
        key: 'ZKP is sold as three software plans. Plan features describe the product capabilities included in each tier.',
      },
      {
        kind: 'list',
        items: [
          'Free — one workspace with a single agent, run history and community support.',
          'Pro — more agents, autoscaling, version rollback, full traces and cost dashboard, email support.',
          'Scale — single sign-on, audit log, role-based access control, higher concurrency and dedicated support.',
        ],
      },
      {
        kind: 'p',
        key: 'You can cancel a subscription at any time from the billing page in the console; the plan stays active until the end of the current billing period.',
      },
    ],
  },
  {
    id: 'support',
    titleKey: 'Support',
    blocks: [
      {
        kind: 'p',
        key: 'Questions, incidents or data deletion requests: email support@zkp.cloud.',
      },
    ],
  },
]

export const DOC_SECTIONS: readonly DocSection[] = RAW_DOC_SECTIONS.map(
  (section) => ({
    ...section,
    blocks: section.blocks.map((block, index) => ({
      ...block,
      id: `${section.id}-${index}`,
    })),
  })
)
