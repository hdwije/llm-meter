export type Provider = 'openai' | 'anthropic' | 'bedrock' | (string & {});

export interface Usage {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens?: number;
  cacheWriteTokens?: number;
}

/** USD per 1 million tokens. */
export interface ModelPricing {
  input: number;
  output: number;
  cacheRead?: number;
  cacheWrite?: number;
}

export interface CallInfo {
  provider: Provider;
  model: string;
  tags?: Record<string, string>;
}

export interface MetaRecord extends CallInfo {
  usage: Usage;
  costUsd: number;
  latencyMs: number;
  ok: boolean;
  error?: string;
  startedAt: string;
}
