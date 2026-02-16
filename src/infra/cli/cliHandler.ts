import { rl } from './readlineClient'
import { ICliHandler } from '../../interfaces/ICli'
import { IAgentService } from '../../modules/agents/interfaces'
import { HumanMessage } from '@langchain/core/messages'

export class CliHandler implements ICliHandler {
  constructor (
    private readonly agentService: IAgentService
  ) {
  }

  public askQuestion (): void {
    rl.question('Você: ', (input) => {
      if (input.toLowerCase() === 'sair') {
        console.log('Até mais!')
        rl.close()
        return
      }
      void this.handle(input)
    })
  }

  private async handle (input: string): Promise<void> {
    try {
      process.stdout.write('Agente: ')
      const stream = await this.agentService.streamEvents({ messages: [new HumanMessage(input)] })
      for await (const event of stream) {
        if (event.event === 'on_chain_stream') {
          const chunk = event.data?.chunk?.agent?.messages[0].content
          if (typeof chunk === 'string') process.stdout.write(chunk)
        }
      }

      process.stdout.write('\n')
    } catch (error) {
      console.error('Erro: Não foi possivel executar o Agente', error)
    }
    this.askQuestion()
  }
}
