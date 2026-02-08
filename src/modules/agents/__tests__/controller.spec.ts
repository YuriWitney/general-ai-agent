import { AgentController } from '../controller'
import { IAgentController } from '../interfaces'
import { describe, it, expect } from 'vitest'
import { makeAgentServiceStub, makeBaseMessageStub } from './helpers/test-helper'

const makeSut = (): IAgentController => {
  const agentServiceStub = makeAgentServiceStub()
  const sut = new AgentController(agentServiceStub)
  return sut
}

describe(`${AgentController.name} tests`, () => {
  describe(`When ${AgentController.prototype.execute.name} is called`, () => {
    it('Should call AgentController.prototype.execute.name with correct params', async () => {
      const sut = makeSut()
      const fakeInput = makeBaseMessageStub('some input')

      const result = await sut.execute(fakeInput)

      expect(result).toEqual({ content: 'agent invoke test' })
    })
  })
})
