import { BaseMessage } from 'langchain'
import { Mocked } from 'vitest'
import { IAgentService } from '../../interfaces'

export const makeAgentServiceStub = (): Mocked<IAgentService> => ({
  invoke: vi.fn().mockResolvedValue(makeBaseMessageStub('agent invoke test').messages[0]),
  streamEvents: vi.fn()
})

export const makeBaseMessageStub = (content: string): { messages: BaseMessage[] } => {
  return {
    messages: [
      {
        content
      }] as unknown as BaseMessage[]
  }
}
