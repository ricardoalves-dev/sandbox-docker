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

Quando terminar, compartilhe o link do repositório que farei a revisão ponto a ponto, indicando o que foi bem aplicado e o que pode melhorar.

Bom desenvolvimento! 🚀
