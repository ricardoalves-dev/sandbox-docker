# 📦 Projeto: Task Manager API

## Visão Geral

Uma API REST simples de gerenciamento de tarefas, totalmente containerizada com Docker. O foco **não é a complexidade da aplicação em si**, mas sim a **qualidade da configuração Docker** ao redor dela.

---

## Requisitos Funcionais da Aplicação

A API deve expor os seguintes endpoints:

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/tasks` | Lista todas as tarefas |
| `POST` | `/tasks` | Cria uma nova tarefa |
| `PUT` | `/tasks/:id` | Atualiza uma tarefa |
| `DELETE` | `/tasks/:id` | Remove uma tarefa |
| `GET` | `/health` | Healthcheck da aplicação |

As tarefas devem ser persistidas em um banco de dados relacional (PostgreSQL).

---

## Requisitos Docker

### 1. Dockerfile da aplicação
- Utilizar **multi-stage build** (separar build do runtime)
- Imagem final baseada em uma imagem **slim ou alpine**
- **Não rodar o processo como root** dentro do container
- Usar **`.dockerignore`** adequado para não copiar arquivos desnecessários
- As instruções devem estar ordenadas para **aproveitar ao máximo o cache de layers**

### 2. Docker Compose
- Orquestrar os serviços: **aplicação + banco de dados**
- Usar **variáveis de ambiente via arquivo `.env`** (sem hardcode de credenciais no `compose.yml`)
- Configurar **healthcheck** no serviço do banco de dados
- O serviço da aplicação deve aguardar o banco estar saudável antes de subir (`depends_on` com `condition`)
- Expor apenas as portas **estritamente necessárias** ao host

### 3. Volumes
- O banco de dados deve usar um **named volume** para persistir os dados
- Dados não devem ser perdidos ao executar `docker compose down` (sem a flag `-v`)

### 4. Networks
- Criar uma **rede customizada** (não usar a rede default do Compose)
- O banco de dados **não deve ser acessível diretamente** pelo host (sem port binding exposto para o PostgreSQL)

### 5. Boas práticas gerais
- O projeto deve subir completamente com um **único comando**: `docker compose up`
- O repositório deve conter um **`README.md`** com instruções claras de como executar o projeto
- Nenhuma credencial ou secret deve estar versionada no repositório

---

## Roadmap de Implementação

Checklist para implementar o projeto de forma incremental, uma etapa por vez, até cobrir todos os requisitos acima.

### Etapa 1 — Estrutura inicial da aplicação
- [ ] Inicializar o projeto Node.js (`package.json`, `tsconfig.json`)
- [ ] Definir estrutura de pastas (ex.: `src/routes`, `src/controllers`, `src/db`)
- [ ] Escolher e configurar framework HTTP (ex.: Express) e driver/ORM do PostgreSQL (ex.: `pg` ou Prisma)

### Etapa 2 — Modelagem de dados
- [ ] Definir schema/tabela `tasks` (id, título, descrição, status, timestamps)
- [ ] Criar script/migration de criação da tabela
- [ ] Configurar conexão com PostgreSQL via variáveis de ambiente

### Etapa 3 — Endpoints da API
- [ ] Implementar `GET /health` (healthcheck da aplicação)
- [ ] Implementar `GET /tasks` (listar tarefas)
- [ ] Implementar `POST /tasks` (criar tarefa)
- [ ] Implementar `PUT /tasks/:id` (atualizar tarefa)
- [ ] Implementar `DELETE /tasks/:id` (remover tarefa)
- [ ] Validar entradas e tratar erros (404, 400, etc.)

### Etapa 4 — Dockerfile da aplicação
- [ ] Criar `Dockerfile` com **multi-stage build** (estágio de build separado do runtime)
- [ ] Usar imagem final **slim/alpine**
- [ ] Configurar **usuário não-root** para rodar o processo
- [ ] Criar `.dockerignore` (node_modules, .git, .env, etc.)
- [ ] Ordenar instruções do Dockerfile para **maximizar cache de layers** (copiar `package.json` antes do código-fonte)

### Etapa 5 — Variáveis de ambiente e secrets
- [ ] Criar arquivo `.env.example` documentando as variáveis necessárias
- [ ] Garantir que `.env` está no `.gitignore` (nenhuma credencial versionada)

### Etapa 6 — Docker Compose: banco de dados
- [ ] Adicionar serviço PostgreSQL usando variáveis do `.env`
- [ ] Configurar **named volume** para persistência dos dados
- [ ] Configurar **healthcheck** do banco de dados
- [ ] Garantir que o PostgreSQL **não** exponha porta para o host

### Etapa 7 — Docker Compose: aplicação e rede
- [ ] Adicionar serviço da aplicação usando o Dockerfile criado
- [ ] Configurar `depends_on` com `condition: service_healthy` apontando para o banco
- [ ] Criar **rede customizada** e conectar os serviços a ela
- [ ] Expor apenas a porta estritamente necessária da aplicação para o host

### Etapa 8 — Validação end-to-end
- [ ] Subir o projeto com `docker compose up` (comando único)
- [ ] Testar todos os endpoints (`/health`, `/tasks` CRUD) contra o container
- [ ] Confirmar que dados persistem após `docker compose down` (sem `-v`)
- [ ] Confirmar que o processo da aplicação não roda como root (`docker exec ... whoami`)
- [ ] Confirmar que o PostgreSQL não é acessível diretamente pelo host

### Etapa 9 — Documentação final
- [ ] Atualizar `README.md` com instruções claras de execução (pré-requisitos, `.env`, comando de subida, exemplos de chamadas aos endpoints)
- [ ] Revisar o repositório para garantir ausência de secrets versionados

---

## Skills disponíveis no repositório

Este repositório inclui skills do Claude Code em `.claude/skills/` para apoiar o fluxo de trabalho durante a implementação do projeto.

### `update-pending-task`

**Para que serve:** atua como um validador de progresso. Ela verifica a **próxima etapa pendente** do roadmap acima, confere se os commits e o estado atual do repositório atendem **integralmente** aos requisitos daquela etapa e, somente nesse caso, atualiza o checklist deste `README.md` marcando os itens como concluídos (`- [x]`). Caso algum requisito esteja incompleto, ela não altera o checklist e retorna um relatório detalhado do que falta.

Ela não implementa código, não corrige Dockerfile/compose, não cria migrations nem instala dependências — sua única responsabilidade é auditar e, quando aplicável, atualizar o checklist.

**Como usar:** invoque a skill pelo nome no Claude Code, por exemplo:

```text
/update-pending-task
```

ou peça em linguagem natural, como "verifica se a etapa atual está concluída".

---

Quando terminar, compartilhe o link do repositório que farei a revisão ponto a ponto, indicando o que foi bem aplicado e o que pode melhorar.

Bom desenvolvimento! 🚀
