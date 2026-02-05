import { BaseMessage } from '@langchain/core/messages'
import { StreamEvent } from '@langchain/core/types/stream'

export interface IAgentService {
  invoke: (input: { messages: BaseMessage[] }) => Promise<BaseMessage>
  streamEvents: (input: { messages: BaseMessage[] }) => Promise<AsyncIterable<StreamEvent>>
}
export interface IAgentController {
  execute: (input: { messages: BaseMessage[] }) => Promise<BaseMessage>
  executeStream: (input: { messages: BaseMessage[] }) => Promise<AsyncIterable<StreamEvent>>
}
