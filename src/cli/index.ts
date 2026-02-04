import { HumanMessage } from 'langchain'
import { AIAgent } from '../modules/agents.js'
import * as readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const agent = new AIAgent()

console.log('Welcome to the AI Agent CLI. Type your messages or "exit" to quit.')

async function handleInput (input: string): Promise<void> {
  if (input.toLowerCase() === 'exit') {
    rl.close()
    return
  }
  try {
    process.stdout.write('Agent: ')
    const stream = await agent.stream({ messages: [new HumanMessage(input)] })
    let content
    for await (const chunk of stream) {
      content = typeof chunk.content === 'string' ? chunk.content : JSON.stringify(chunk.content)
      process.stdout.write(content)
    }
    process.stdout.write('\n')
  } catch (error) {
    console.error('Error: Can not invoke Agent', error)
  }
  askQuestion()
}

function askQuestion (): void {
  rl.question('You: ', (input) => {
    void handleInput(input)
  })
}

askQuestion()

rl.on('close', () => {
  console.log('Goodbye!')
  process.exit(0)
})
