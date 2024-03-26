export const Model = [
  { props: { header: 'OpenAI' } },
  {
    title: 'gpt-4',
    value: 'gpt-4',
  },
  {
    title: 'gpt-4-turbo',
    value: 'gpt-4-turbo',
  },

  { props: { divider: true } },
  { props: { header: 'Gemini' } },
  {
    title: 'gemini-pro',
    value: 'gemini-pro',
  },
  {
    title: 'gemini-pro-1.0',
    value: 'gemini-pro-1.0',
  },

  { props: { divider: true } },
  { props: { header: '通义千问' } },
  {
    title: 'qwen-max',
    value: 'qwen-max',
  },
  {
    title: 'qwen-turbo',
    value: 'qwen-turbo',
  }
] as const;
