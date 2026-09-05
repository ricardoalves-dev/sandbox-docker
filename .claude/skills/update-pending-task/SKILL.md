---
name: update-pending-task
description: >
  Verifica se os commits realizados atendem integralmente aos requisitos da próxima etapa pendente do README.md. Se todos os requisitos da etapa estiverem implementados, atualiza o README.md marcando a etapa como concluída. Caso contrário, não altera o checklist e informa exatamente o que está faltando.
---

# Update Pending Task

## Objetivo

Verificar a **próxima etapa pendente de implementação** no `README.md` do projeto Task Manager API e avaliar se os commits/código atuais atendem integralmente aos requisitos definidos para essa etapa.

A skill deve agir como um **validador de progresso**, e não como um implementador.

Ela deve:

1. Identificar a primeira etapa ainda pendente no roadmap do `README.md`.
2. Identificar os requisitos dessa etapa.
3. Inspecionar o estado atual do repositório.
4. Analisar os commits relevantes para determinar o que foi implementado.
5. Verificar cada requisito individualmente.
6. Se **todos** os requisitos da etapa estiverem atendidos:

   * atualizar o `README.md`;
   * marcar os respectivos itens da etapa como concluídos;
   * informar que a etapa foi concluída.
7. Se **qualquer requisito** estiver faltando:

   * não marcar a etapa como concluída;
   * não fazer alterações no `README.md`;
   * informar claramente o que está faltando e, quando possível, como corrigir.

## Regra principal

**Nunca marcar uma etapa como concluída apenas porque parece ter sido implementada.**

Cada checkbox da etapa deve possuir evidência concreta no repositório.

A implementação deve ser considerada concluída somente quando todos os requisitos verificáveis da etapa estiverem satisfeitos.

---

# Fluxo de execução

## 1. Localizar o README

Primeiro, localizar o `README.md` na raiz do projeto.

Ler o roadmap de implementação e identificar a **primeira etapa que ainda contenha itens `[ ]`**.

Exemplo:

```text
### Etapa 1 — Estrutura inicial da aplicação
- [x] Inicializar o projeto Node.js
- [x] Definir estrutura de pastas
- [x] Escolher e configurar framework HTTP

### Etapa 2 — Modelagem de dados
- [ ] Definir schema/tabela tasks
- [ ] Criar migration
- [ ] Configurar conexão
```

Nesse caso, a etapa pendente é:

```text
Etapa 2 — Modelagem de dados
```

A skill deve analisar **somente essa etapa**.

Não deve antecipar ou marcar etapas posteriores.

---

## 2. Inspecionar o estado do Git

Verificar:

* branch atual;
* status do working tree;
* histórico recente de commits;
* commits relacionados à etapa;
* diferenças entre commits quando necessário.

Utilizar comandos como:

```bash
git status --short
git log --oneline --decorate -n 20
git log --stat -n 20
git diff
```

Quando necessário, utilizar:

```bash
git show <commit>
git diff <commit-anterior>..<commit-atual>
```

A análise deve considerar tanto os commits quanto o estado atual dos arquivos.

### Importante

Não assumir que o último commit implementou a etapa inteira.

Uma etapa pode ter sido implementada em vários commits.

Da mesma forma, um commit pode conter alterações relacionadas a mais de uma etapa.

---

# 3. Criar uma matriz de validação

Antes de decidir se a etapa está completa, transformar os requisitos da etapa em uma lista de verificações.

Por exemplo:

```text
Etapa 2 — Modelagem de dados

[ ] Definir schema/tabela tasks
[ ] Criar script/migration
[ ] Configurar conexão com PostgreSQL via variáveis de ambiente
```

Para cada item, procurar evidências concretas no projeto.

Classificar cada requisito como:

* `ATENDIDO`
* `PARCIAL`
* `NÃO ATENDIDO`

Não considerar um requisito `PARCIAL` como concluído.

---

# 4. Verificar evidências no código

Inspecionar os arquivos relevantes.

Não se limitar às mensagens dos commits.

Por exemplo, se o commit diz:

```text
feat: add database
```

isso **não é evidência suficiente** de que todos os requisitos de banco foram atendidos.

É necessário verificar efetivamente:

* arquivos existentes;
* conteúdo dos arquivos;
* scripts;
* configurações;
* dependências;
* variáveis de ambiente;
* migrations;
* Dockerfile;
* compose;
* testes;
* estrutura de diretórios.

Utilizar ferramentas apropriadas, como:

```bash
find .
grep -R "..." .
cat <arquivo>
```

ou ferramentas equivalentes disponíveis no ambiente.

---

# 5. Regras específicas para o roadmap

Use o conteúdo atual do `README.md` como fonte de verdade para os requisitos.

As etapas atualmente descritas são:

## Etapa 1 — Estrutura inicial da aplicação

Verificar:

* `package.json` existe e representa um projeto Node.js;
* `tsconfig.json` existe e está configurado;
* estrutura de diretórios da aplicação foi definida;
* framework HTTP foi escolhido e configurado;
* driver/ORM PostgreSQL foi escolhido e configurado.

Exemplos de evidências:

```text
package.json
tsconfig.json
src/routes/
src/controllers/
src/db/
```

e dependências/configuração de Express, Fastify, `pg`, Prisma ou equivalente.

---

## Etapa 2 — Modelagem de dados

Verificar:

* schema/tabela `tasks`;
* campos necessários:

  * `id`;
  * título;
  * descrição;
  * status;
  * timestamps;
* script ou migration para criação da tabela;
* conexão com PostgreSQL através de variáveis de ambiente.

Não considerar credenciais hardcoded como atendimento ao requisito de configuração por variáveis de ambiente.

---

## Etapa 3 — Endpoints da API

Verificar individualmente:

```text
GET    /health
GET    /tasks
POST   /tasks
PUT    /tasks/:id
DELETE /tasks/:id
```

Também verificar:

* persistência utilizando PostgreSQL;
* validação de entrada;
* tratamento de erros;
* respostas adequadas para casos como `400` e `404`.

---

## Etapa 4 — Dockerfile da aplicação

Verificar:

* multi-stage build;
* estágio separado de build e runtime;
* imagem final `slim` ou `alpine`;
* processo executado por usuário não-root;
* `.dockerignore`;
* exclusão de arquivos desnecessários;
* ordem das instruções favorecendo cache;
* arquivos de dependências copiados antes do código-fonte quando aplicável.

---

## Etapa 5 — Variáveis de ambiente e secrets

Verificar:

* `.env.example` existe;
* variáveis necessárias estão documentadas;
* `.env` está no `.gitignore`;
* não existem credenciais ou secrets versionados;
* valores reais de credenciais não foram adicionados ao repositório.

Não considerar `.env.example` contendo valores reais de produção como uma boa implementação.

---

## Etapa 6 — Docker Compose: banco de dados

Verificar:

* serviço PostgreSQL;
* credenciais/configurações obtidas através do `.env`;
* named volume;
* persistência dos dados;
* healthcheck do PostgreSQL;
* ausência de port binding do PostgreSQL para o host.

---

## Etapa 7 — Docker Compose: aplicação e rede

Verificar:

* serviço da aplicação;
* utilização do Dockerfile;
* `depends_on`;
* `condition: service_healthy`;
* rede customizada;
* aplicação e banco conectados à rede;
* somente a porta necessária da aplicação exposta ao host.

---

## Etapa 8 — Validação end-to-end

Verificar, sempre que possível:

```bash
docker compose up
```

e testar:

* `/health`;
* CRUD de `/tasks`;
* persistência após:

```bash
docker compose down
docker compose up
```

sem utilizar:

```bash
docker compose down -v
```

Também verificar que a aplicação roda como usuário não-root e que PostgreSQL não possui porta publicada para o host.

Quando testes dinâmicos não puderem ser executados, deixar isso explícito no relatório.

**Não afirmar que um requisito dinâmico foi validado se ele não foi realmente executado.**

---

## Etapa 9 — Documentação final

Verificar:

* `README.md` atualizado;
* pré-requisitos documentados;
* configuração do `.env` documentada;
* comando de execução documentado;
* exemplos de chamadas dos endpoints;
* ausência de secrets versionados.

---

# 6. Decisão

Após validar todos os requisitos da etapa:

### Caso todos estejam atendidos

Atualizar o `README.md`.

Somente os checkboxes efetivamente relacionados à etapa validada devem ser alterados de:

```markdown
- [ ]
```

para:

```markdown
- [x]
```

Não alterar requisitos de etapas futuras.

Depois da alteração, revisar o diff:

```bash
git diff -- README.md
```

Garantir que a única alteração seja o checklist da etapa validada, salvo pequenas correções estritamente necessárias para manter a documentação consistente.

### Caso algum requisito não esteja atendido

**Não modificar o `README.md`.**

Produzir um relatório contendo:

```text
Etapa: Etapa X — Nome

Status: INCOMPLETA

Requisitos:
[x] Requisito atendido
[ ] Requisito não atendido
[~] Requisito parcialmente atendido

O que falta:
- ...

Evidências:
- arquivo: ...
- commit: ...

Próximos passos:
- ...
```

Ser específico sobre o que precisa ser implementado.

---

# 7. Não implementar requisitos faltantes

Esta skill possui responsabilidade de **auditoria e atualização do checklist**.

Ela não deve:

* criar arquivos para corrigir problemas;
* implementar endpoints;
* alterar Dockerfile;
* alterar `compose.yml`;
* instalar dependências;
* criar migrations;
* modificar código da aplicação;
* criar testes para fazer a etapa passar.

Se algo estiver faltando, apenas informar.

A única alteração permitida pela skill é atualizar o checklist do `README.md` quando houver evidência de que a etapa está integralmente concluída.

---

# 8. Commits

A skill deve analisar os commits existentes para entender a evolução da implementação.

Porém, **não exigir que exista um único commit por etapa**.

Exemplo válido:

```text
feat: create postgres connection
feat: add tasks migration
feat: configure environment variables
```

Se juntos atenderem integralmente à Etapa 2, a Etapa 2 deve ser considerada concluída.

Também é possível que um commit tenha implementado requisitos de duas etapas. Nesse caso, somente a primeira etapa pendente deve ser avaliada.

---

# 9. Segurança

Nunca expor secrets encontrados durante a análise.

Se houver credenciais reais no código, `.env`, histórico Git ou outros arquivos:

* não reproduzir o valor da credencial no relatório;
* informar apenas que existe uma credencial potencialmente exposta;
* considerar o requisito de segurança como não atendido quando aplicável.

Exemplo:

```text
[ ] Nenhuma credencial ou secret está versionada.

Foi encontrada uma credencial potencialmente exposta em <arquivo>.
O valor não será exibido por segurança.
```

---

# 10. Formato da resposta

Ao finalizar, responder de maneira objetiva.

### Etapa concluída

Usar:

```text
## Etapa validada

Etapa X — Nome

Status: CONCLUÍDA

Todos os requisitos da etapa foram verificados e atendidos.

O README.md foi atualizado marcando a etapa como concluída.

### Evidências

- ...
- ...
- ...

Próxima etapa pendente: Etapa Y — Nome
```

### Etapa incompleta

Usar:

```text
## Etapa validada

Etapa X — Nome

Status: INCOMPLETA

O README.md não foi alterado.

### Requisitos atendidos

- [x] ...

### Requisitos pendentes

- [ ] ...

### O que falta

- ...

### Próximos passos

- ...
```

Sempre diferenciar claramente:

* aquilo que foi comprovado;
* aquilo que foi inferido;
* aquilo que não pôde ser validado.

---

# Princípio fundamental

**O README só deve ser atualizado quando houver evidência suficiente de que 100% dos requisitos da próxima etapa pendente foram implementados.**

Na dúvida, não marcar como concluído.
