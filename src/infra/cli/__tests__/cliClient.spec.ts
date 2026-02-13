import { ICliClient } from '../../../interfaces'
import { makeAgentServiceStub } from '../../../modules/agents/__tests__/helpers/test-helper'
import { CliClient } from '../cliClient'
import { describe, it, vi } from 'vitest'

const makeSut = (): ICliClient => {
  const agentServiceStub = makeAgentServiceStub()
  return new CliClient(agentServiceStub)
}

describe('CliClient tests', () => {
  describe(`${CliClient.prototype.handle.name} tests`, () => {
    it('Should call method handle', async () => {
      const sut = makeSut()
      const stdoutspy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true)
      const askQuestionSpy = vi.spyOn(sut, 'askQuestion').mockImplementationOnce(() => {})

      await sut.handle('oi')

      expect(stdoutspy).toHaveBeenCalledWith('\n')
      expect(stdoutspy).toHaveBeenCalledWith('\n')
      expect(askQuestionSpy).toHaveBeenCalled()
    })
  })
})
