import { HumanMessage } from 'langchain'
import { Agent } from '../modules/agents/controller.js'
import * as readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const agent = new Agent()

console.log('Bem vindo ao Agente de IA! Digite sua mensagem ou "sair" para sair.')

async function handleInput (input: string): Promise<void> {
  if (input.toLowerCase() === 'exit') {
    rl.close()
    return
  }
  try {
    process.stdout.write('Agent: ')
    const stream = await agent.streamEvents({ messages: [new HumanMessage(input)] })
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

function askQuestion (): void {
  rl.question('Você: ', (input) => {
    void handleInput(input)
  })
}

askQuestion()

rl.on('sair', () => {
  console.log('Até mais!')
  process.exit(0)
})
