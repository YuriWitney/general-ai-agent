import { tool } from '@langchain/core/tools'
import { MemorySaver } from '@langchain/langgraph'
import { ChatOpenAI } from '@langchain/openai'
import { createReactAgent } from '@langchain/langgraph/prebuilt'
import z from 'zod'
import { BaseMessage, HumanMessage } from '@langchain/core/messages'

const model = new ChatOpenAI({
  modelName: 'gpt-4o',
  temperature: 0
})
const weatherTool = tool(
  async ({ location }) => {
    console.log(`[System] Searching weather for ${location}...`)
    return `The weather in ${location} is sunny with a high of 25°F.`
  },
  {
    name: 'get_weather',
    description: 'Get the current weather for a given location.',
    schema: z.object({
      location: z.string().describe('The city and state to search for weather')
    })
  }
)

const tools = [weatherTool]
const memory = new MemorySaver()
const agent = createReactAgent({
  llm: model,
  tools,
  checkpointSaver: memory
})

async function main (): Promise<void> {
  const config = {
    configurable: {
      thread_id: 'chat-user-123'
    }
  }

  console.log('--- Starting conversation ---')

  const response = await agent.invoke({
    messages: [new HumanMessage('What is the weather like in Fortaleza?')]
  }, config)

  const lastMessage = response.messages[response.messages.length - 1] as BaseMessage
  console.log('Agent: ', lastMessage.content)
}

main().catch(console.error)
