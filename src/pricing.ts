import type { ModelPricing } from './types';

/** USD per 1M tokens */
export const DEFAULT_PRICING: Record<string, ModelPricing> = {
  'gpt-4o': { input: 2.5, output: 10, cacheRead: 1.25 },
  'gpt-4o-mini': { input: 0.15, output: 0.6, cacheRead: 0.075 },
  'claude-sonnet-4-5': {
    input: 3,
    output: 15,
    cacheRead: 0.3,
    cacheWrite: 3.75,
  },
  'claude-haiku-4-5': { input: 1, output: 5, cacheRead: 0.1, cacheWrite: 1.25 },
};

/** Strips provider prefixes and version suffixes: "anthropic.claude-sonnet-4-5-v1:0" -> "claude-sonnet-4-5". */
export function normalizeModel(model: string): string {
  return model
    .replace(/^(us|eu|apac)\./, '')
    .replace(/^(anthropic|meta|amazon|mistral|cohere)\./, '')
    .replace(/-v\d+:\d+$/, '')
    .replace(/-\d{8}$/, '');
}

export function lookupPricing(
  model: string,
  overrides?: Record<string, ModelPricing>,
): ModelPricing | undefined {
  const table = { ...DEFAULT_PRICING, ...overrides };
  return table[model] ?? table[normalizeModel(model)];
}
