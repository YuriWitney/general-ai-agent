import { Mocked, expect, describe, it } from 'vitest'
import { AgentService } from '../service'
import { IAgentFactory } from '../../../interfaces/IAgentFactory'
import { IConfig } from '../../../interfaces/IConfig'
import { makeBaseMessageStub, makeFakeStreamEvent } from './helpers/test-helper'
import { IAgentService } from '../interfaces'

const makeAgentFactoryStub = (): Mocked<IAgentFactory> => ({
  createReactAgent: vi.fn().mockReturnValue({
    invoke: vi.fn().mockResolvedValue(makeBaseMessageStub('agent invoke test')),
    streamEvents: vi.fn().mockResolvedValue(makeFakeStreamEvent('agent stream events test'))
  })
})

const makeFakeConfig = (): IConfig => ({
  apiKey: 'some_api_key',
  modelName: 'some_model',
  temperature: 0,
  threadId: '123'
})

const makeSut = (): IAgentService => {
  const agentFactoryStub = makeAgentFactoryStub()
  const configStub = makeFakeConfig()
  return new AgentService(agentFactoryStub, configStub)
}

describe(`${AgentService.name} tests`, () => {
  describe(`When ${AgentService.prototype.invoke.name} method is called`, () => {
    it(`Should call ${AgentService.prototype.invoke.name} with correct params`, async () => {
      const sut = makeSut()
      const fakeInput = makeBaseMessageStub('some_input')

      const result = await sut.invoke(fakeInput)

      expect(result).toEqual(makeBaseMessageStub('agent invoke test').messages[0])
    })
  })

  describe(`When ${AgentService.prototype.streamEvents.name} method is called`, () => {
    it(`Should call ${AgentService.prototype.streamEvents.name} with correct params`, async () => {
      const sut = makeSut()
      const fakeInput = makeBaseMessageStub('some_input')

      const result = await sut.streamEvents(fakeInput)

      expect(result).toEqual([{
        name: 'test',
        run_id: 'test-run-id',
        metadata: {},
        event: 'on_chain_start',
        data: {
          chunk: {
            agent: {
              messages: [
                {
                  content: 'agent stream events test',
                  role: 'agent'
                }
              ]
            }
          }
        }
      }, {
        name: 'test',
        run_id: 'test-run-id',
        metadata: {},
        event: 'on_chain_stream',
        data: {
          chunk: {
            agent: {
              messages: [
                {
                  content: 'agent stream events test',
                  role: 'agent'
                }
              ]
            }
          }
        }
      }])
    })
  })
})
