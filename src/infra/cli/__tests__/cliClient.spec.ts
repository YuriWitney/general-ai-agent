import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CliHandler } from '../cliHandler'
import { rl } from '../readlineClient'
import { makeAgentServiceStub } from '../../../modules/agents/__tests__/helpers/test-helper'
import { ICliHandler } from '../../../interfaces'

const makeSut = (): ICliHandler => {
  const agentServiceStub = makeAgentServiceStub()
  return new CliHandler(agentServiceStub)
}

const makeSpy = (inputStb: string, isToCheckWriteSpy?: boolean): void => {
  vi.spyOn(rl, 'question').mockImplementation((_msg: string, options: any, cb: (answer: string) => void) => {
    const input = inputStb

    if (typeof options === 'function') options(input)
    if (cb) cb(input)
  })
  vi.spyOn(rl, 'close').mockImplementation(() => {})
  if (!isToCheckWriteSpy) vi.spyOn(process.stdout, 'write').mockImplementation(() => true)
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
}

const endLoop = (cliHandler: ICliHandler): void => {
  vi.spyOn(cliHandler, 'askQuestion').mockImplementation(() => {})
}
describe('CliHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
    vi.restoreAllMocks()
  })

  it('Should exit if sair is typed', () => {
    const sut = makeSut()
    makeSpy('sair')

    sut.askQuestion()
    endLoop(sut)

    expect(console.log).toHaveBeenCalledWith('Até mais!')
    expect(rl.close).toHaveBeenCalled()
  })

  it('should call handle method', async () => {
    const writeSpy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true)
    const sut = makeSut()
    makeSpy('oi', true)

    sut.askQuestion()
    endLoop(sut)

    expect(writeSpy).toBeCalledWith('Agente: ')
    expect(writeSpy).toBeCalledWith('Agente: ')
    expect(writeSpy).toBeCalledTimes(1)
  })
})
