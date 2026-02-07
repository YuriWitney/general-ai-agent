import { HumanMessage } from '@langchain/core/messages'
import { AgentService } from '../../modules/agents/service.js'
import { rl } from './readlineClient.js'

export class CliClient {
  constructor (
    private readonly agentService: AgentService
  ) {
  }

  private async handleInput (input: string): Promise<void> {
    if (input.toLowerCase() === 'sair') {
      console.log('Até mais!')
      rl.close()
      return
    }

    try {
      process.stdout.write('Agente: ')
      const stream = await this.agentService.streamEvents({ messages: [new HumanMessage(input)] })
      for await (const event of stream) {
        if (event.event === 'on_chain_stream') {
          const chunk = event.data?.chunk?.agent?.messages[0].content
          if (typeof chunk === 'string') process.stdout.write(chunk)
        }
      }process.stdout.write('\n')
    } catch (error) {
      console.error('Erro: Não foi possivel executar o Agente', error)
    }
    this.askQuestion()
  }

  public askQuestion (): void {
    rl.question('Você: ', (input) => {
      void this.handleInput(input)
    })
  }
}
