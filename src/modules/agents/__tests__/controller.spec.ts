import { BaseMessage } from '@langchain/core/messages'
import { AgentController } from '../controller'
import { IAgentController, IAgentService } from '../interfaces'
import { describe, it, expect, vi, Mocked } from 'vitest'

const makeAgentServiceStub = (): Mocked<IAgentService> => ({
  invoke: vi.fn().mockResolvedValue(makeBaseMessageStub('agent invoke test').messages[0]),
  streamEvents: vi.fn()
})

const makeBaseMessageStub = (content: string): { messages: BaseMessage[] } => {
  return {
    messages: [
      {
        content
      }] as unknown as BaseMessage[]
  }
}

const makeSut = (): IAgentController => {
  const agentServiceStub = makeAgentServiceStub()
  const sut = new AgentController(agentServiceStub)
  return sut
}

describe(`${AgentController.name} tests`, () => {
  describe(`When ${AgentController.prototype.execute.name} is called`, () => {
    it('Should call AgentController.prototype.execute.name with correct params', async () => {
      const sut = makeSut()
      const fakeInput = makeBaseMessageStub('some input')

      const result = await sut.execute(fakeInput)

      expect(result).toEqual({ content: 'agent invoke test' })
    })
  })
})
