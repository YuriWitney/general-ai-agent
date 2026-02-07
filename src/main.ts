import { LanggraphAdapter } from './adapters/langchain/langgraph.js'
import { CliClient } from './infra/cli/cli.js'
import { config } from './infra/config/config.js'
import { AgentService } from './modules/agents/service.js'

const agentFactory = new LanggraphAdapter()
const agentService = new AgentService(agentFactory, config)
const cliClient = new CliClient(agentService)
console.log('Bem vindo ao Agente de IA! Digite sua mensagem ou "sair" para sair.')

cliClient.askQuestion()
