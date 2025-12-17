export interface OpenGraphData {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  favicon?: string;
  url?: string;
  type?: string;
}

export interface OEmbedData {
  title?: string;
  author_name?: string;
  html?: string;
  description?: string;
  [key: string]: unknown;
}

export interface Provider {
  provider_name: string;
  provider_url: string;
  endpoints: Array<{
    schemes?: string[];
    url: string;
    discovery?: boolean;
    formats?: string[];
  }>;
}

export interface TagResponse {
  url: string;
  title: string;
  image?: string;
  favicon?: string;
  tldr: string;
  tags: string[];
}

export interface AgentResponse {
  title?: string;
  tldr: string;
  tags: string[];
}
