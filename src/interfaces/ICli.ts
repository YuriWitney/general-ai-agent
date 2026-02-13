export interface ICliClient {
  askQuestion: () => void
  handle: (input: string) => Promise<void>
}
