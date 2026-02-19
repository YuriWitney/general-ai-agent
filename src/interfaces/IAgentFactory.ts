import { ServerTool, ClientTool } from '@langchain/core/tools'
import { StreamEvent } from '@langchain/core/types/stream'
import { ChatGroq } from '@langchain/groq'
import { MemorySaver } from '@langchain/langgraph'
import { ToolNode } from '@langchain/langgraph/prebuilt'
import { BaseMessage } from 'langchain'

export interface IAgentFactory {
  createReactAgent: (payload: {
    llm: ChatGroq
    tools: ToolNode<any> | Array<ServerTool | ClientTool>
    checkpointSaver: MemorySaver
  }) => {
    invoke: (
      input: { messages: BaseMessage[] },
      config: {
        configurable: {
          [key: string]: string
        }
      }
    ) => Promise<{ messages: BaseMessage[] }>
    streamEvents: (input: { messages: BaseMessage[] }, config: {
      version: 'v1' | 'v2'
      configurable: {
        [key: string]: string
      }
    }) => AsyncIterable<StreamEvent>
  }
}
