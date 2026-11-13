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

const CHAT_CURL = `curl https://api.zkp.ai/v1/chat/completions \\
  -H "Authorization: Bearer zkp-sk-xxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-sonnet-5-5",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello!"}
    ],
    "stream": true
  }'`

const MESSAGES_CURL = `curl https://api.zkp.ai/v1/messages \\
  -H "Authorization: Bearer zkp-sk-xxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-sonnet-5-5",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "Summarize this document..."}
    ]
  }'`

const EMBEDDINGS_CURL = `curl https://api.zkp.ai/v1/embeddings \\
  -H "Authorization: Bearer zkp-sk-xxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "text-embedding-3-large",
    "input": "The quick brown fox"
  }'`

const AGENT_CONFIG = `# agent.yaml — describe your agent in one file
name: support-agent
model: claude-sonnet-5-5
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
  max_steps: 12
  monthly_token_budget: 50000000`

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
        key: 'ZKP is a platform for running AI agents and calling large models through one OpenAI-compatible API.',
      },
      {
        kind: 'p',
        key: 'Two capabilities work together: hosted agents run on managed infrastructure, and the aggregated API routes your raw model calls to 40+ providers.',
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
          'Create an API key in the console — keys start with zkp-sk-.',
          'Send your first request with the key, as shown below.',
        ],
      },
      { kind: 'code', lang: 'bash', code: CHAT_CURL },
      {
        kind: 'p',
        key: 'Set stream to true to receive server-sent events; every streaming-capable model supports it.',
      },
    ],
  },
  {
    id: 'authentication',
    titleKey: 'Authentication',
    blocks: [
      {
        kind: 'p',
        key: 'All API requests authenticate with a Bearer key in the Authorization header. Keys never expire unless you set an expiry when creating them.',
      },
      {
        kind: 'code',
        lang: 'text',
        code: 'Authorization: Bearer zkp-sk-xxxxxxxx',
      },
      {
        kind: 'p',
        key: 'Keep keys server-side. If a key leaks, revoke it in the console and issue a new one; usage is billed to the key that made each request.',
      },
    ],
  },
  {
    id: 'chat-completions',
    titleKey: 'Chat Completions API',
    blocks: [
      {
        kind: 'p',
        key: 'The standard OpenAI-compatible endpoint. Point any OpenAI SDK at the ZKP base URL and existing code keeps working.',
      },
      {
        kind: 'code',
        lang: 'text',
        code: 'base_url: https://api.zkp.ai/v1',
      },
      {
        kind: 'p',
        key: 'The model field accepts any model in the model square. If a model is missing from your available list, enable the corresponding provider in the console.',
      },
    ],
  },
  {
    id: 'messages-api',
    titleKey: 'Messages API',
    blocks: [
      {
        kind: 'p',
        key: 'An Anthropic-compatible endpoint with the same key and billing. Use it when your toolchain already speaks the Messages format.',
      },
      { kind: 'code', lang: 'bash', code: MESSAGES_CURL },
    ],
  },
  {
    id: 'embeddings',
    titleKey: 'Embeddings API',
    blocks: [
      {
        kind: 'p',
        key: 'Generate vector embeddings for search, clustering and RAG pipelines.',
      },
      { kind: 'code', lang: 'bash', code: EMBEDDINGS_CURL },
    ],
  },
  {
    id: 'agent-hosting',
    titleKey: 'Agent Hosting',
    blocks: [
      {
        kind: 'p',
        key: 'Agents are described in a single config file: instructions, tools, model and limits. Version it in git and push — each push creates an immutable agent version.',
      },
      { kind: 'code', lang: 'yaml', code: AGENT_CONFIG },
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
    id: 'observability',
    titleKey: 'Observability',
    blocks: [
      {
        kind: 'p',
        key: 'Every agent run and API call is traced: steps, tool calls, tokens and latency appear in the console dashboards.',
      },
      {
        kind: 'list',
        items: [
          'Traces — the full step-by-step execution of every agent run.',
          'Logs — request and response logs per API key.',
          'Cost — token usage and spend aggregated by model, key and agent.',
        ],
      },
    ],
  },
  {
    id: 'errors',
    titleKey: 'Error Codes',
    blocks: [
      {
        kind: 'table',
        head: ['Code', 'Meaning', 'Action'],
        rows: [
          ['401', 'Invalid or revoked API key', 'Create a new key in the console'],
          ['403', 'Key lacks permission for this model', 'Enable the provider for this key'],
          ['404', 'Unknown model name', 'Check the model square for exact names'],
          ['429', 'Rate limit exceeded', 'Retry with backoff or raise the limit'],
          ['503', 'Upstream provider unavailable', 'Retry, or switch to another model'],
        ],
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
