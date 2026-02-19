import { beforeEach, afterEach, describe, it, vi } from 'vitest'

const env = process.env

beforeEach(() => {
  vi.resetModules()
  process.env = { ...env }
})

afterEach(() => {
  process.env = env
  vi.restoreAllMocks()
})

describe('Config tests', () => {
  it('Should load config from environment variables', async () => {
    process.env.API_KEY = 'test-api-key'
    process.env.LLM_MODEL_NAME = 'gpt-test'
    process.env.LLM_TEMPERATURE = '0.7'
    process.env.AGENT_THREAD_ID = 'thread-123'

    const warnSpy = vi.spyOn(console, 'warn')
    const { config } = await import('../config')

    expect(config).toEqual({
      apiKey: 'test-api-key',
      modelName: 'gpt-test',
      temperature: 0.7,
      threadId: 'thread-123'
    })
    expect(warnSpy).not.toHaveBeenCalled()
  })
  it('Should use default values if some env is missing', async () => {
    delete process.env.API_KEY
    delete process.env.LLM_MODEL_NAME
    delete process.env.LLM_TEMPERATURE
    delete process.env.AGENT_THREAD_ID

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const { config } = await import('../config')

    expect(config).toEqual({
      apiKey: undefined,
      modelName: '',
      temperature: 0,
      threadId: ''
    })
    expect(warnSpy).toHaveBeenCalledOnce()
    expect(warnSpy).toHaveBeenCalledWith(
      'Warning: API_KEY is not set in environment variables. Maybe the agent will not work properly.'
    )
  })
})
