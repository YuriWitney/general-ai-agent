import { LanggraphAdapter } from './adapters/langchain/langgraph.js'
import { CliHandler } from './infra/cli/cliHandler.js'
import { config } from './infra/config/config.js'
import { AgentService } from './modules/agents/service.js'

const agentFactory = new LanggraphAdapter()
const agentService = new AgentService(agentFactory, config)
const cliHandler = new CliHandler(agentService)
console.log('Bem vindo ao Agente de IA! Digite sua mensagem ou "sair" para sair.')

cliHandler.askQuestion()
