import { HumanMessage } from '@langchain/core/messages'
import { Agent } from './agent.js'

export class AgentService {
  constructor (
    private readonly agent: Agent,
    private readonly llm: any
  ) {}

  public async executeStreamEvents (input: string): Promise<void> {
    if (input.toLowerCase() === 'exit') {
      rl.close()
      return
    }
    try {
      process.stdout.write('Agent: ')
      const stream = await this.agent.streamEvents({ messages: [new HumanMessage(input)] })
      for await (const event of stream) {
        if (event.event === 'on_chain_stream') {
          const chunk = event.data?.chunk?.agent?.messages[0].content
          if (typeof chunk === 'string') {
            process.stdout.write(chunk)
          }
        }
      }
      process.stdout.write('\n')
    } catch (error) {
      console.error('Erro: Não foi possivel executar o Agente', error)
    }
    askQuestion()
  }
}
