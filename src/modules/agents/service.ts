import { BaseMessage } from '@langchain/core/messages'
import { MemorySaver } from '@langchain/langgraph'
import { createReactAgent } from '@langchain/langgraph/prebuilt'
import { StreamEvent } from '@langchain/core/types/stream'
import { tools } from '../../tools/index.js'
import { config } from '../../config/index.js'
import { IAgentService } from './interfaces.js'
import { GroqAdapter } from '../../adapters/services/groq.js'

export class AgentService implements IAgentService {
  private readonly agentExecutor
  private readonly threadId: string

  constructor (threadId: string = config.threadId) {
    this.threadId = threadId
    const model = new GroqAdapter().adapt({
      model: config.modelName,
      temperature: config.temperature,
      apiKey: config.apiKey
    })

    const memory = new MemorySaver()

    this.agentExecutor = createReactAgent({
      llm: model,
      tools,
      checkpointSaver: memory
    })
  }

  async invoke (input: { messages: BaseMessage[] }): Promise<BaseMessage> {
    const result = await this.agentExecutor.invoke(
      input,
      {
        configurable: {
          thread_id: this.threadId
        }
      }
    )
    const messages = result.messages
    return messages[messages.length - 1]
  }

  async streamEvents (input: { messages: BaseMessage[] }): Promise<AsyncIterable<StreamEvent>> {
    const stream = await this.agentExecutor.streamEvents(
      input,
      { version: 'v1', configurable: { thread_id: this.threadId } }
    )
    return stream as AsyncIterable<StreamEvent>
  }
}
