import { LanggraphAdapter } from './adapters/langchain/langgraph.js'
import { config } from './config/index.js'
import { AgentService } from './modules/agents/service.js'

const agentFactory = new LanggraphAdapter()
const agentService = new AgentService(config.threadId, agentFactory)
