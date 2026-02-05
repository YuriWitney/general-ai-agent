import { ChatGroq } from '@langchain/groq'

export class GroqAdapter {
  public adapt (options: { model: string, temperature: number, apiKey?: string }): ChatGroq {
    return new ChatGroq({
      model: options.model,
      temperature: options.temperature,
      apiKey: options.apiKey
    })
  }
}
