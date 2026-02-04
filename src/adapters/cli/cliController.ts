import { AgentService } from '../../modules/agents/service.js'

export class CliController {
  constructor (
    private readonly agentService: AgentService
  ) {}

  async handle (input: string): Promise<void> {
    return await this.agentService.executeStreamEvents(input)
  }
}
