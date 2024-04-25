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
  {
    title: 'gpt-3.5-turbo',
    value: 'gpt-3.5-turbo',
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
  },

  { props: { divider: true } },
  { props: { header: '智谱清言' } },
  {
    title: 'glm-4',
    value: 'glm-4',
  },
  {
    title: 'glm-3-turbo',
    value: 'glm-3-turbo',
  },
  { props: { divider: true } },
  { props: { header: '360智脑' } },
  {
    title: '360gpt-pro',
    value: '360gpt-pro',
  },
  { props: { divider: true } },
  { props: { header: '讯飞星火' } },
  {
    title: 'Spark-v3.5',
    value: 'Spark-v3.5',
  },
  {
    title: 'Spark-v3.1',
    value: 'Spark-v3.1',
  },{
    title: 'Spark-v2.1',
    value: 'Spark-v2.1',
  },
  { props: { divider: true } },
  { props: { header: 'Moonshot' } },
  {
    title: 'moonshot-v1-8k',
    value: 'moonshot-v1-8k',
  },
  {
    title: 'moonshot-v1-32k',
    value: 'moonshot-v1-32k',
  }
] as const;
