import { BaseMessage } from '@langchain/core/messages'
import { StreamEvent } from '@langchain/core/types/stream'
import { tools } from '../../tools/index.js'
import { config } from '../../config/index.js'
import { IAgentService } from './interfaces.js'
import { GroqAdapter } from '../../adapters/services/groq.js'
import { LanggraphAdapter } from '../../adapters/langchain/langgraph.js'
import { IAgentFactory } from '../../interfaces/IAgentFactory.js'

export class AgentService implements IAgentService {
  private readonly agentExecutor

  constructor (
    private readonly threadId: string,
    private readonly agentFactory: IAgentFactory
  ) {
    this.threadId = config.threadId
    const model = new GroqAdapter().adapt({
      model: config.modelName,
      temperature: config.temperature,
      apiKey: config.apiKey
    })

    const memory = new LanggraphAdapter().memorySaver()

    this.agentExecutor = this.agentFactory.createReactAgent({
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
