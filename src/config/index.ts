import 'dotenv-cli/config'

export const config = {
  apiKey: process.env.API_KEY,
  modelName: process.env.LLM_MODEL_NAME ?? '',
  temperature: parseFloat(process.env.LLM_TEMPERATURE ?? '0'),
  threadId: process.env.AGENT_THREAD_ID ?? ''
}

if (config.apiKey === undefined) {
  console.warn('Warning: API_KEY is not set in environment variables. Maybe the agent will not work properly.')
}
