import { HumanMessage } from '@langchain/core/messages'
import { AgentUseCase } from '../../../domain/use_cases/agent_use_case.js'

export class AgentController {
  constructor(private readonly agentUseCase: AgentUseCase) {}

  public async executeStreamEvents(input: string): Promise<void> {
    if (input.toLowerCase() === 'exit') {
      rl.close()
      return
    }
    try {
      process.stdout.write('Agent: ')
      const stream = await this.agentUseCase.executeStream({ messages: [new HumanMessage(input)] })
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
