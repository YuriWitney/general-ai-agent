import { BaseMessage } from '@langchain/core/messages'
import { StreamEvent } from '@langchain/core/types/stream'
import { IAgentService } from './interfaces.js'
import { GroqAdapter } from '../../adapters/services/groq.js'
import { LanggraphAdapter } from '../../adapters/langchain/langgraph.js'
import { IAgentFactory } from '../../interfaces/IAgentFactory.js'
import { IConfig } from '../../interfaces/IConfig.js'
import { tools } from '../../adapters/tools/langChainTools.js'

export class AgentService implements IAgentService {
  private readonly agentExecutor

  constructor (
    private readonly agentFactory: IAgentFactory,
    private readonly config: IConfig
  ) {
    const model = new GroqAdapter().adapt({
      model: this.config.modelName,
      temperature: this.config.temperature,
      apiKey: this.config.apiKey
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
          thread_id: this.config.threadId
        }
      }
    )
    const messages = result.messages
    return messages[messages.length - 1]
  }

  async streamEvents (input: { messages: BaseMessage[] }): Promise<AsyncIterable<StreamEvent>> {
    const stream = await this.agentExecutor.streamEvents(
      input,
      { version: 'v1', configurable: { thread_id: this.config.threadId } }
    )
    return stream
  }
}
