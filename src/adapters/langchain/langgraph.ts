import { ServerTool, ClientTool } from '@langchain/core/tools'
import { ChatGroq } from '@langchain/groq'
import { MemorySaver } from '@langchain/langgraph'
import { createReactAgent, ToolNode } from '@langchain/langgraph/prebuilt'
import { IAgentFactory } from '../../interfaces/IAgentFactory.js'

export class LanggraphAdapter implements IAgentFactory {
  public memorySaver (): MemorySaver {
    return new MemorySaver()
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public createReactAgent (payload: {
    llm: ChatGroq
    tools: ToolNode<any> | Array<ServerTool | ClientTool>
    checkpointSaver: MemorySaver
  }) {
    return createReactAgent({
      llm: payload.llm,
      tools: payload.tools,
      checkpointSaver: payload.checkpointSaver
    })
  }
}
