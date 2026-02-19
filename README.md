# General AI Agent

Um agente de IA geral construído com TypeScript, utilizando LangChain e LangGraph para interações inteligentes via linha de comando.

## Descrição

Este projeto implementa um agente de IA conversacional que pode ser executado via CLI. Ele integra serviços de IA como Groq e OpenAI, permitindo interações em tempo real com o usuário. O agente é projetado para ser extensível e modular, com suporte a ferramentas e adaptadores para diferentes provedores de IA.

## Funcionalidades

- **Interface CLI**: Interação simples via terminal com entrada e saída em tempo real.
- **Integração com LangChain**: Utiliza LangGraph para gerenciar fluxos de conversa e agentes.
- **Suporte a Múltiplos Modelos**: Compatível com Groq, OpenAI e outros provedores via LangChain.
- **Configuração Flexível**: Variáveis de ambiente para personalizar API keys, modelos e parâmetros.
- **Testes Automatizados**: Cobertura de testes com Vitest para garantir qualidade.
- **Linting e Formatação**: ESLint configurado para manter código limpo.

## Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos de Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/YuriWitney/general-ai-agent.git
   cd general-ai-agent
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente (veja seção Configuração).

## Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
API_KEY=sua_api_key_aqui
LLM_MODEL_NAME=gemma2-9b-it  # ou outro modelo suportado
LLM_TEMPERATURE=0.7
AGENT_THREAD_ID=thread_123  # opcional, para manter contexto de conversa
```

### Provedores Suportados

- **Groq**: Use modelos como `gemma2-9b-it`, `llama3-8b-8192`, etc.
- **OpenAI**: Modelos como `gpt-4`, `gpt-3.5-turbo`.

Certifique-se de ter uma chave de API válida para o provedor escolhido.

## Uso

### Desenvolvimento

Para executar o agente em modo de desenvolvimento:

```bash
npm run start:dev
```

### Produção

1. Compile o projeto:
   ```bash
   npm run build
   ```

2. Execute:
   ```bash
   npm start
   ```

### Interação

Após iniciar, o agente exibirá:
```
Bem vindo ao Agente de IA! Digite sua mensagem ou "sair" para sair.
Você:
```

Digite sua mensagem e pressione Enter. O agente responderá em tempo real. Digite "sair" para encerrar.

## Estrutura do Projeto

```
src/
├── main.ts                 # Ponto de entrada da aplicação
├── adapters/
│   ├── langchain/
│   │   └── langgraph.ts    # Adaptador para LangGraph
│   ├── services/
│   │   └── groq.ts         # Serviço para integração com Groq
│   └── tools/
│       └── langChainTools.ts # Ferramentas do LangChain
├── infra/
│   ├── cli/
│   │   ├── cliHandler.ts   # Manipulador da interface CLI
│   │   └── readlineClient.ts # Cliente readline para entrada
│   └── config/
│       └── config.ts       # Configurações da aplicação
├── interfaces/             # Definições de interfaces TypeScript
└── modules/
    └── agents/
        ├── controller.ts   # Controlador do agente
        ├── service.ts      # Serviço principal do agente
        └── interfaces.ts   # Interfaces específicas do módulo
```

## Scripts Disponíveis

- `npm start`: Executa a aplicação em produção
- `npm run start:dev`: Executa em modo desenvolvimento com tsx
- `npm test`: Executa testes com Vitest
- `npm run test:coverage`: Executa testes com relatório de cobertura
- `npm run test:watch`: Executa testes em modo watch

## Testes

O projeto utiliza Vitest para testes. Para executar:

```bash
npm test
```

Para cobertura:
```bash
npm run test:coverage
```

Os testes estão localizados em `__tests__/` dentro de cada módulo.

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Desenvolvimento

- Use ESLint para linting: `npx eslint src/`
- Execute testes antes de commitar
- Mantenha cobertura de testes acima de 80%

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Autor

Yuri Witney

## Repositório

[https://github.com/YuriWitney/general-ai-agent](https://github.com/YuriWitney/general-ai-agent)
