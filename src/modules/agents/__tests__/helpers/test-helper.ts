import { BaseMessage } from 'langchain'
import { Mocked } from 'vitest'
import { IAgentService } from '../../interfaces'
import { StreamEvent } from '@langchain/core/types/stream'

export const makeAgentServiceStub = (): Mocked<IAgentService> => ({
  invoke: vi.fn().mockResolvedValue(makeBaseMessageStub('agent invoke test').messages[0]),
  streamEvents: vi.fn().mockResolvedValue(makeFakeStreamEvent('agent invoke test'))
})

export const makeBaseMessageStub = (content: string): { messages: BaseMessage[] } => {
  return {
    messages: [
      {
        content
      }] as unknown as BaseMessage[]
  }
}

export const makeFakeStreamEvent = (content: string): StreamEvent => {
  return {
    name: 'test',
    run_id: 'test-run-id',
    metadata: {},
    event: 'on_chain_stream',
    data: {
      chunk: {
        messages: [
          {
            content,
            role: 'agent'
          }
        ]
      }
    }
  }
}
