import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CliHandler } from '../cliHandler'
import { rl } from '../readlineClient'
import { makeAgentServiceStub, makeBaseMessageStub } from '../../../modules/agents/__tests__/helpers/test-helper'
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
    vi.spyOn(rl, 'question').mockImplementation((_msg: string, options: any, cb: (answer: string) => void) => {
      const input = 'oi'

      if (typeof options === 'function') options(input)
      if (cb) cb(input)
    })
    const sut = makeSut()

    sut.askQuestion()
    endLoop(sut)
    await new Promise(resolve => setImmediate(resolve))

    expect(writeSpy).toHaveBeenCalledWith('Agente: ')
    expect(writeSpy).toHaveBeenCalledWith('\n')
  })

  it('should throw if stream throws', async () => {
    const agentServiceStub = {
      invoke: vi.fn().mockResolvedValue(makeBaseMessageStub('agent invoke test').messages[0]),
      streamEvents: vi.fn().mockRejectedValue(new Error('fail'))
    }
    vi.spyOn(rl, 'question').mockImplementation((_msg: string, options: any, cb: (answer: string) => void) => {
      const input = 'oi'

      if (typeof options === 'function') options(input)
      if (cb) cb(input)
    })
    vi.spyOn(rl, 'close').mockImplementation(() => {})
    vi.spyOn(process.stdout, 'write').mockImplementation(() => true)
    vi.spyOn(console, 'log').mockImplementation(() => {})
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const sut = new CliHandler(agentServiceStub)

    sut.askQuestion()
    endLoop(sut)
    await new Promise(resolve => setImmediate(resolve))

    expect(errorSpy).toBeCalled()
  })
})
