import { BaseMessage } from '@langchain/core/messages'
import { StreamEvent } from '@langchain/core/types/stream'
import { IAgentController, IAgentService } from './interfaces.js'

export class AgentController implements IAgentController {
  constructor (private readonly agentService: IAgentService) {}

  async execute (input: { messages: BaseMessage[] }): Promise<BaseMessage> {
    return await this.agentService.invoke(input)
  }

  async executeStream (input: { messages: BaseMessage[] }): Promise<AsyncIterable<StreamEvent>> {
    return await this.agentService.streamEvents(input)
  }
}
