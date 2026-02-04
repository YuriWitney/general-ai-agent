import { tool } from '@langchain/core/tools'
import z from 'zod'

const weatherTool = tool(
  async ({ location }) => {
    console.log(`[System] Searching weather for ${location}...`)
    if (location.toLowerCase().includes('são paulo')) {
      return `The weather in ${location} is sunny with a high of 25°C.`
    }
  },
  {
    name: 'get_weather',
    description: 'Get the current weather for a given location.',
    schema: z.object({
      location: z.string().describe('The city and state to search for weather')
    })
  }
)

export const tools = [weatherTool]
